# PPP Prototype — Personalized Progressive Pathways

A conversational AI prototype where Coursera Plus learners explore career goals, share their background and constraints, and receive a personalized learning plan.

## Adding a New Prompt Variant

The prototype supports multiple prompt variants that can be selected via URL parameter. For example, `/?prompt=experimental` uses the experimental prompt. This guide explains how to add a new one using the GitHub website — no local development setup required.

### Step 1: Copy an existing prompt file

1. Go to the repo on GitHub: **webedx-spark/ppp-prototype**
2. Navigate to **`src/lib/prompts/`**
3. Open an existing prompt file (e.g., `experimental.ts`) and click the **copy raw contents** button to copy its contents
4. Go back to **`src/lib/prompts/`**, click **"Add file"** > **"Create new file"**
5. Name the file whatever you want your URL parameter to be, with `.ts` at the end
   - Example: if you want `?prompt=concise`, name the file **`concise.ts`**
6. Paste the copied contents and edit the prompt text to your liking
7. Update the function name to match your file (e.g., `buildSystemPromptConcise`)
8. Scroll down, select **"Create a new branch"**, and click **"Propose new file"**

### Step 2: Register the file

You also need to tell the app about your new file. This is one small edit:

1. In the same branch, navigate to **`src/lib/prompts/get-system-prompt.ts`**
2. Click the **pencil icon** to edit
3. Add an import line at the top with the others:

   ```ts
   import { buildSystemPromptConcise as buildConcise } from "./concise";
   ```

4. Add a line inside the `promptRegistry` object:

   ```ts
   concise: () => buildConcise(),
   ```

5. Commit the change to the same branch

### Step 3: Merge and deploy

1. Open a Pull Request from your branch into `main`
2. Once merged, the app will automatically redeploy on AWS Amplify (~5 minutes)

### Step 4: Test your prompt

Once the deploy finishes, open the prototype with your file name as the `prompt` parameter:

```
https://main.dcpllor2muuz3.amplifyapp.com/?prompt=concise
```

You should see a red banner at the top saying **"Prompt variant: concise"** confirming it's active.

### Quick reference

| File name          | URL to use it          |
| ------------------ | ---------------------- |
| `default.ts`       | `https://main.dcpllor2muuz3.amplifyapp.com/` (no param needed)  |
| `experimental.ts`  | `https://main.dcpllor2muuz3.amplifyapp.com/?prompt=experimental` |
| `onboarded.ts`     | `https://main.dcpllor2muuz3.amplifyapp.com/?prompt=onboarded`   |

If the URL param doesn't match any registered file, it silently falls back to the default prompt.
