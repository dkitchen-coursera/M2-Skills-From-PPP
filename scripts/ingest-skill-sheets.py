#!/usr/bin/env python3
"""Regenerate src/lib/data/da-mastery-groups.ts and da-lex-xp-map.ts from local JSON dumps.

Usage:
    # After fetching fresh data from the MCP sheets tool, save the JSON dumps
    # and pass their paths as env vars:
    DA_SHEET1=/path/to/sheet1.json DA_SHEET2=/path/to/sheet2.json         python3 scripts/ingest-skill-sheets.py

Sheet 1: Data Skill Expressions for Skill Mastery Levels by CB
  https://docs.google.com/spreadsheets/d/15jjb98EcmWr99vDcJnB4jaZ8qgeiMNpB9gw_II01uiY
Sheet 2: Skill Expressions for Share the Art of Storytelling through Data Visualization
  https://docs.google.com/spreadsheets/d/17hWt7SUlg1I4X-GMotEYClUeyuFOvoJkC1rC3Yq0JLA
"""
import json
import os
import re
import sys
from pathlib import Path

_HERE = Path(__file__).resolve().parent
_REPO = _HERE.parent

SHEET1 = Path(os.environ.get("DA_SHEET1", "/tmp/da-sheet1.json"))
SHEET2 = Path(os.environ.get("DA_SHEET2", "/tmp/da-sheet2.json"))

OUT_GROUPS = _REPO / "src/lib/data/da-mastery-groups.ts"
OUT_XPMAP = _REPO / "src/lib/data/da-lex-xp-map.ts"


# ── Small overrides / normalization helpers ────────────────────────────

# Skill display name overrides where titlecase-from-slug produces something awkward.
SKILL_NAME_OVERRIDES = {
    "a/b-testing": "A/B Testing",
    "data-import/export": "Data Import/Export",
    "extract--transform--load": "Extract, Transform, Load",
}

LEVEL_ORDER = ["Foundational", "Beginner", "Intermediate", "Advanced"]
VALID_LEVELS = set(LEVEL_ORDER)

def skill_name_from_slug(slug: str) -> str:
    if slug in SKILL_NAME_OVERRIDES:
        return SKILL_NAME_OVERRIDES[slug]
    # Replace double-dash, then split on - and titlecase
    parts = slug.replace("--", " ").split("-")
    return " ".join(p.capitalize() if p else p for p in parts).strip()

def norm_expression_name(s: str) -> str:
    """Normalize an expression name for matching across sheets."""
    return s.strip().rstrip(".").lower()

def expression_slug(name: str) -> str:
    """Generate a stable, URL-safe slug from an expression name."""
    s = name.lower().strip().rstrip(".")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    # Truncate ridiculously long slugs
    if len(s) > 80:
        # Keep start + hash suffix to disambiguate
        import hashlib
        suffix = hashlib.sha1(name.encode()).hexdigest()[:6]
        s = s[:72] + "-" + suffix
    return s

def group_key(skill_slug: str, level: str) -> str:
    return f"{skill_slug}::{level.lower()}"

def ts_string(s: str) -> str:
    """Emit a TypeScript string literal."""
    return json.dumps(s, ensure_ascii=False)

# ── Sheet 1: mastery groups ─────────────────────────────────────────────

with SHEET1.open() as f:
    s1 = json.load(f)

# Collect rows as (band, name, level, skill_id, description)
s1_rows = []
for row in s1["data"][1:]:
    # Pad short rows to 5 cells
    while len(row) < 5:
        row.append({})
    band = row[0].get("value")
    name = row[1].get("value")
    level = row[2].get("value")
    skill_id = row[3].get("value")
    desc = row[4].get("value", "") if len(row) > 4 else ""
    # Filter footer "Total rows" and rows without a skill
    if not band or not skill_id or not name or not level:
        continue
    if str(band).startswith("Total"):
        continue
    if level not in VALID_LEVELS:
        continue
    band_num = int(band)
    s1_rows.append({
        "band": band_num,
        "name": name.strip(),
        "level": level,
        "skill_slug": skill_id,
        "description": (desc or "").strip(),
    })

# Build mastery groups. Key = skill_slug::level. Each group may span ONE band.
# If the same skill+level appears in both bands, we keep the lower band (Band 1 wins).
groups = {}
for r in s1_rows:
    key = group_key(r["skill_slug"], r["level"])
    if key not in groups:
        groups[key] = {
            "key": key,
            "skill_slug": r["skill_slug"],
            "skill_name": skill_name_from_slug(r["skill_slug"]),
            "level": r["level"],
            "display_name": f'{r["level"]} {skill_name_from_slug(r["skill_slug"])}',
            "career_band": r["band"],
            "expressions": [],
            "expression_ids_seen": set(),
        }
    else:
        # If another band tries to claim this key, keep the lower band
        if r["band"] < groups[key]["career_band"]:
            groups[key]["career_band"] = r["band"]
    expr_slug = expression_slug(r["name"])
    # Deduplicate expressions within a group (defensive)
    if expr_slug in groups[key]["expression_ids_seen"]:
        continue
    groups[key]["expression_ids_seen"].add(expr_slug)
    groups[key]["expressions"].append({
        "id": expr_slug,
        "name": r["name"],
        "description": r["description"],
    })

# Sort groups: band asc, level order, name asc
def sort_key(g):
    return (g["career_band"], LEVEL_ORDER.index(g["level"]), g["skill_name"])

sorted_groups = sorted(groups.values(), key=sort_key)

# Build name->expression_id lookup (normalized) for the XP map
name_to_expr_id = {}
# name → group_key (also normalized)
name_to_group_key = {}
for g in sorted_groups:
    for e in g["expressions"]:
        norm = norm_expression_name(e["name"])
        name_to_expr_id[norm] = e["id"]
        name_to_group_key[norm] = g["key"]

# ── Sheet 2: LEX item → expression XP ────────────────────────────────────

with SHEET2.open() as f:
    s2 = json.load(f)

# Rows: [item_id, item_name, item_type, expr_id_hash, expr_name, xp, effectiveness, category, bloom, interaction]
# We key by item title (normalized) since the LEX item IDs in the codebase are
# synthesized from course + module + group + index, not Coursera item-ids.
def norm_title(s: str) -> str:
    return s.strip().lower()

# itemTitle -> { expressionId: xp }
xp_map = {}
orphan_expressions = []  # expression names in sheet 2 with no match in sheet 1
for row in s2["data"][1:]:
    if not row[0].get("value"):
        continue
    item_title = row[1].get("value", "").strip()
    expr_name = row[4].get("value", "").strip()
    xp_val = row[5].get("value")
    if not item_title or not expr_name or xp_val is None:
        continue
    # Sheet has fractional XP values (e.g. "0.9", "3", "16.2"). Store as a
    # rounded integer — the XP model otherwise is integer-based. We round at
    # ingest time so the fixture stays integer-clean; a minimum of 1 XP is
    # awarded for any mapped item so fractional-but-non-zero rows contribute
    # at least a little progress.
    try:
        xp_float = float(xp_val)
    except (TypeError, ValueError):
        continue
    if xp_float <= 0:
        continue
    xp = max(1, round(xp_float))

    norm_expr = norm_expression_name(expr_name)
    expr_id = name_to_expr_id.get(norm_expr)
    if expr_id is None:
        orphan_expressions.append(expr_name)
        continue  # skip: no mastery group owns this expression

    title_key = norm_title(item_title)
    bucket = xp_map.setdefault(title_key, {"displayTitle": item_title, "awards": {}})
    # Sum awards if the same (item, expression) appears twice
    bucket["awards"][expr_id] = bucket["awards"].get(expr_id, 0) + xp

# Sort xp map keys alphabetically for stable output
xp_items = sorted(xp_map.items(), key=lambda kv: kv[1]["displayTitle"].lower())

# ── Emit TS fixtures ─────────────────────────────────────────────────────

def emit_groups_ts() -> str:
    lines = []
    lines.append("/**")
    lines.append(" * GENERATED FIXTURE — mastery groups for the Data Analyst role.")
    lines.append(" * Source: Google Sheet 15jjb98EcmWr99vDcJnB4jaZ8qgeiMNpB9gw_II01uiY")
    lines.append(" * Do not edit by hand. Regenerate via scripts/ingest-skill-sheets.py.")
    lines.append(" *")
    lines.append(" * Each group is the unit of mastery = {skill × mastery-level}. Expressions")
    lines.append(" * within a group are earned independently (0-300 XP each); a group is")
    lines.append(" * 'Mastered' when every expression reaches its xpMax.")
    lines.append(" */")
    lines.append("")
    lines.append('export type MasteryLevel = "Foundational" | "Beginner" | "Intermediate" | "Advanced";')
    lines.append("")
    lines.append("export interface MasteryGroupExpression {")
    lines.append("  id: string;")
    lines.append("  name: string;")
    lines.append("  description: string;")
    lines.append("}")
    lines.append("")
    lines.append("export interface MasteryGroupDef {")
    lines.append("  key: string;")
    lines.append("  skillSlug: string;")
    lines.append("  skillName: string;")
    lines.append("  level: MasteryLevel;")
    lines.append("  displayName: string;")
    lines.append("  careerBand: 1 | 2;")
    lines.append("  expressions: MasteryGroupExpression[];")
    lines.append("}")
    lines.append("")
    lines.append("export const EXPRESSION_XP_MAX = 300;")
    lines.append("")
    lines.append("export const DATA_ANALYST_MASTERY_GROUPS: MasteryGroupDef[] = [")
    for g in sorted_groups:
        lines.append("  {")
        lines.append(f"    key: {ts_string(g['key'])},")
        lines.append(f"    skillSlug: {ts_string(g['skill_slug'])},")
        lines.append(f"    skillName: {ts_string(g['skill_name'])},")
        lines.append(f"    level: {ts_string(g['level'])},")
        lines.append(f"    displayName: {ts_string(g['display_name'])},")
        lines.append(f"    careerBand: {g['career_band']},")
        lines.append("    expressions: [")
        for e in g["expressions"]:
            lines.append("      {")
            lines.append(f"        id: {ts_string(e['id'])},")
            lines.append(f"        name: {ts_string(e['name'])},")
            # Only emit description if non-empty
            if e["description"]:
                lines.append(f"        description: {ts_string(e['description'])},")
            else:
                lines.append('        description: "",')
            lines.append("      },")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const REQUIRED_GROUP_KEYS: string[] =")
    lines.append("  DATA_ANALYST_MASTERY_GROUPS.filter((g) => g.careerBand === 1).map((g) => g.key);")
    lines.append("")
    lines.append("export const OTHER_GROUP_KEYS: string[] =")
    lines.append("  DATA_ANALYST_MASTERY_GROUPS.filter((g) => g.careerBand === 2).map((g) => g.key);")
    lines.append("")
    return "\n".join(lines)

def emit_xpmap_ts() -> str:
    lines = []
    lines.append("/**")
    lines.append(" * GENERATED FIXTURE — LEX course-item → skill-expression XP awards.")
    lines.append(" * Source: Google Sheet 17hWt7SUlg1I4X-GMotEYClUeyuFOvoJkC1rC3Yq0JLA")
    lines.append(" * (Course: 'Share the Art of Storytelling through Data Visualization')")
    lines.append(" * Do not edit by hand. Regenerate via scripts/ingest-skill-sheets.py.")
    lines.append(" *")
    lines.append(" * Items NOT listed here award 0 XP. Keys are normalized item titles")
    lines.append(" * (trimmed, lowercased) so matching is resilient to minor LEX re-casing.")
    lines.append(" */")
    lines.append("")
    lines.append('import type { MasteryGroupDef } from "./da-mastery-groups";')
    lines.append("")
    lines.append("export interface ItemXpEntry {")
    lines.append("  displayTitle: string;")
    lines.append("  awards: Record<string, number>; // expressionId → XP")
    lines.append("}")
    lines.append("")
    lines.append("/** Keys are normalized (`title.trim().toLowerCase()`). */")
    lines.append("export const DA_LEX_ITEM_XP: Record<string, ItemXpEntry> = {")
    for title_key, bucket in xp_items:
        lines.append(f"  {ts_string(title_key)}: {{")
        lines.append(f"    displayTitle: {ts_string(bucket['displayTitle'])},")
        lines.append("    awards: {")
        for expr_id, xp in sorted(bucket["awards"].items()):
            lines.append(f"      {ts_string(expr_id)}: {xp},")
        lines.append("    },")
        lines.append("  },")
    lines.append("};")
    lines.append("")
    lines.append("/** Normalize a LEX item title the same way the fixture keys are normalized. */")
    lines.append("export function normalizeItemTitle(title: string): string {")
    lines.append("  return title.trim().toLowerCase();")
    lines.append("}")
    lines.append("")
    lines.append("/** Look up XP awards for a LEX item by title. Returns {} when unlisted. */")
    lines.append("export function lookupItemXp(title: string): Record<string, number> {")
    lines.append("  const entry = DA_LEX_ITEM_XP[normalizeItemTitle(title)];")
    lines.append("  return entry ? entry.awards : {};")
    lines.append("}")
    lines.append("")
    lines.append("/**")
    lines.append(" * Map an expression-level XP award payload onto group keys.")
    lines.append(" * An expression can belong to multiple groups, so XP contributes to every")
    lines.append(" * group that owns the expression.")
    lines.append(" */")
    lines.append("export function expressionXpToGroupXp(")
    lines.append("  awards: Record<string, number>,")
    lines.append("  groupsIndex: Record<string, MasteryGroupDef>,")
    lines.append("): Record<string, number> {")
    lines.append("  const result: Record<string, number> = {};")
    lines.append("  for (const [expressionId, xp] of Object.entries(awards)) {")
    lines.append("    for (const group of Object.values(groupsIndex)) {")
    lines.append("      if (group.expressions.some((e) => e.id === expressionId)) {")
    lines.append("        result[group.key] = (result[group.key] ?? 0) + xp;")
    lines.append("      }")
    lines.append("    }")
    lines.append("  }")
    lines.append("  return result;")
    lines.append("}")
    lines.append("")
    return "\n".join(lines)

OUT_GROUPS.write_text(emit_groups_ts())
OUT_XPMAP.write_text(emit_xpmap_ts())

# ── Coverage report ─────────────────────────────────────────────────────
band1_groups = [g for g in sorted_groups if g["career_band"] == 1]
band2_groups = [g for g in sorted_groups if g["career_band"] == 2]
print(f"Wrote {OUT_GROUPS}")
print(f"  {len(sorted_groups)} mastery groups ({len(band1_groups)} Band 1 / {len(band2_groups)} Band 2)")
total_expr = sum(len(g['expressions']) for g in sorted_groups)
print(f"  {total_expr} expressions total")
print(f"Wrote {OUT_XPMAP}")
print(f"  {len(xp_map)} LEX items mapped")
if orphan_expressions:
    uniq_orphans = sorted(set(orphan_expressions))
    print(f"\n⚠ {len(uniq_orphans)} expression(s) from sheet 2 had no match in sheet 1 and were dropped:")
    for o in uniq_orphans:
        print(f"    - {o!r}")
