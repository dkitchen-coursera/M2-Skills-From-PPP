/**
 * GENERATED FIXTURE — mastery groups for the Data Analyst role.
 * Source: Google Sheet 15jjb98EcmWr99vDcJnB4jaZ8qgeiMNpB9gw_II01uiY
 * Do not edit by hand. Regenerate via scripts/ingest-skill-sheets.py.
 *
 * Each group is the unit of mastery = {skill × mastery-level}. Expressions
 * within a group are earned independently (0-300 XP each); a group is
 * 'Mastered' when every expression reaches its xpMax.
 */

export type MasteryLevel = "Foundational" | "Beginner" | "Intermediate" | "Advanced";

export interface MasteryGroupExpression {
  id: string;
  name: string;
  description: string;
}

export interface MasteryGroupDef {
  key: string;
  skillSlug: string;
  skillName: string;
  level: MasteryLevel;
  displayName: string;
  careerBand: 1 | 2;
  expressions: MasteryGroupExpression[];
}

export const EXPRESSION_XP_MAX = 300;

export const DATA_ANALYST_MASTERY_GROUPS: MasteryGroupDef[] = [
  {
    key: "audit::foundational",
    skillSlug: "audit",
    skillName: "Audit",
    level: "Foundational",
    displayName: "Foundational Audit",
    careerBand: 1,
    expressions: [
      {
        id: "identify-common-data-quality-issues-in-a-dataset",
        name: "Identify common data quality issues in a dataset.",
        description: "this skill expression represents the ability to perform a preliminary data audit to spot fundamental errors. It involves systematically scanning data to find inconsistencies. For an early career professional, this means looking for a defined list of core data quality issues, which includes: 1. Missing Values (nulls, empty cells, NaN), 2. Duplicate Records (identical or near-identical rows), 3. Structural Errors (inconsistent capitalization, leading/trailing spaces, incorrect delimiters), 4. Data Type Mismatches (numbers stored as text, dates stored as strings), and 5. Outliers (obvious, extreme, or impossible values, like an age of 200).",
      },
    ],
  },
  {
    key: "data-cleansing::foundational",
    skillSlug: "data-cleansing",
    skillName: "Data Cleansing",
    level: "Foundational",
    displayName: "Foundational Data Cleansing",
    careerBand: 1,
    expressions: [
      {
        id: "identify-common-data-quality-issues-in-a-dataset",
        name: "Identify common data quality issues in a dataset.",
        description: "this skill expression represents the ability to perform a preliminary data audit to spot fundamental errors. It involves systematically scanning data to find inconsistencies. For an early career professional, this means looking for a defined list of core data quality issues, which includes: 1. Missing Values (nulls, empty cells, NaN), 2. Duplicate Records (identical or near-identical rows), 3. Structural Errors (inconsistent capitalization, leading/trailing spaces, incorrect delimiters), 4. Data Type Mismatches (numbers stored as text, dates stored as strings), and 5. Outliers (obvious, extreme, or impossible values, like an age of 200).",
      },
    ],
  },
  {
    key: "data-import/export::foundational",
    skillSlug: "data-import/export",
    skillName: "Data Import/Export",
    level: "Foundational",
    displayName: "Foundational Data Import/Export",
    careerBand: 1,
    expressions: [
      {
        id: "identify-common-data-file-formats",
        name: "Identify common data file formats.",
        description: "This skill represents the foundational ability to recognize the structure of common data files. A professional with this skill can visually distinguish between and describe the basic characteristics of a defined list of core formats, which includes: 1. CSV (Comma-Separated Values), 2. Excel (XLSX), 3. JSON (JavaScript Object Notation), 4. Parquet, 5. Delta, 6. XML. This is a prerequisite for selecting the correct import method.",
      },
    ],
  },
  {
    key: "data-quality::foundational",
    skillSlug: "data-quality",
    skillName: "Data Quality",
    level: "Foundational",
    displayName: "Foundational Data Quality",
    careerBand: 1,
    expressions: [
      {
        id: "identify-common-data-quality-issues-in-a-dataset",
        name: "Identify common data quality issues in a dataset.",
        description: "this skill expression represents the ability to perform a preliminary data audit to spot fundamental errors. It involves systematically scanning data to find inconsistencies. For an early career professional, this means looking for a defined list of core data quality issues, which includes: 1. Missing Values (nulls, empty cells, NaN), 2. Duplicate Records (identical or near-identical rows), 3. Structural Errors (inconsistent capitalization, leading/trailing spaces, incorrect delimiters), 4. Data Type Mismatches (numbers stored as text, dates stored as strings), and 5. Outliers (obvious, extreme, or impossible values, like an age of 200).",
      },
    ],
  },
  {
    key: "data-validation::foundational",
    skillSlug: "data-validation",
    skillName: "Data Validation",
    level: "Foundational",
    displayName: "Foundational Data Validation",
    careerBand: 1,
    expressions: [
      {
        id: "identify-common-data-quality-issues-in-a-dataset",
        name: "Identify common data quality issues in a dataset.",
        description: "this skill expression represents the ability to perform a preliminary data audit to spot fundamental errors. It involves systematically scanning data to find inconsistencies. For an early career professional, this means looking for a defined list of core data quality issues, which includes: 1. Missing Values (nulls, empty cells, NaN), 2. Duplicate Records (identical or near-identical rows), 3. Structural Errors (inconsistent capitalization, leading/trailing spaces, incorrect delimiters), 4. Data Type Mismatches (numbers stored as text, dates stored as strings), and 5. Outliers (obvious, extreme, or impossible values, like an age of 200).",
      },
    ],
  },
  {
    key: "probability-and-statistics::foundational",
    skillSlug: "probability-and-statistics",
    skillName: "Probability And Statistics",
    level: "Foundational",
    displayName: "Foundational Probability And Statistics",
    careerBand: 1,
    expressions: [
      {
        id: "describe-the-components-of-a-bayesian-analysis",
        name: "Describe the components of a Bayesian analysis",
        description: "The skill expression represents a conceptual grasp of the Bayesian framework. It involves the ability to define and explain the roles of the prior (initial belief), the likelihood (evidence from data), and the posterior (the updated belief) . The professional could explain, for a simple scenario, how an initial assumption is mathematically updated as new data becomes available, without necessarily building the model themselves. Bayesian methods are generally considered more advanced, but a conceptual understanding can be valuable, especially in roles that deal with high uncertainty. An entry-level skill would focus on the concepts rather than complex modeling.",
      },
    ],
  },
  {
    key: "relational-databases::foundational",
    skillSlug: "relational-databases",
    skillName: "Relational Databases",
    level: "Foundational",
    displayName: "Foundational Relational Databases",
    careerBand: 1,
    expressions: [
      {
        id: "identify-common-data-types-and-their-purpose",
        name: "Identify common data types and their purpose.",
        description: "This skill represents the ability to recognize the format of data stored in a database column. It involves understanding that different types of data have different properties and constraints. A professional with this skill can identify and describe a defined list of core data types, including: INTEGER (whole numbers), VARCHAR/TEXT (strings), DATE/TIMESTAMP (time-based data), FLOAT/DECIMAL (numbers with fractions), and BOOLEAN (true/false values). This knowledge is essential for writing valid queries and performing correct calculations.",
      },
      {
        id: "identify-the-fundamental-components-of-a-relational-database-model",
        name: "Identify the fundamental components of a relational database model.",
        description: "This skill represents the most basic literacy in database structure. It involves recognizing and defining the core building blocks of any relational database. A professional with this skill can identify and describe a defined, comprehensive list of these components, which includes: Tables (entities), Rows (records or tuples), and Columns (fields or attributes). This is the foundational vocabulary needed to discuss and understand database content.",
      },
      {
        id: "interpret-a-database-schema-or-entity-relationship-diagram-erd",
        name: "Interpret a database schema or Entity-Relationship Diagram (ERD).",
        description: "This skill represents the ability to read the 'map' of a database to plan a data query. It involves analyzing a visual diagram (an ERD) or a schema definition to understand how the database is organized. A professional with this skill can identify the relevant tables needed to answer a question, locate specific columns within those tables, and trace the relationships between them to determine how they should be joined.",
      },
      {
        id: "understand-the-purpose-and-application-of-data-integrity-constraints-in--4c8fca",
        name: "Understand the purpose and application of data integrity constraints in relational databases.",
        description: "This competency represents the understanding of fundamental data integrity constraints and how they ensure data quality and create relationships within a relational database. A professional can explain the purpose of core constraints, including:\n NOT NULL: Ensures that a field must contain a value.\n UNIQUE: Ensures that all values within a column are distinct.\n Primary Key: A unique identifier for each row in a table.\n Foreign Key: A field in one table that refers to the primary key of another table, creating a relationship between them. This understanding also involves articulating how primary and foreign keys create relationships that allow data from different tables to be linked and joined for analysis. It encompasses recognizing how these constraints influence the structure and appearance of data from a user's perspective.",
      },
      {
        id: "understand-the-purpose-of-database-transactions-and-their-acid-properties",
        name: "Understand the purpose of database transactions and their ACID properties.",
        description: "This skill represents an understanding of how databases guarantee data integrity during write operations. From an analyst's perspective, this means understanding why data they query is always in a consistent state. A skilled professional can define and explain the purpose of the four ACID properties: Atomicity (all-or-nothing operations), Consistency (database rules are never violated), Isolation (concurrent operations don't interfere), and Durability (once a transaction is saved, it stays saved).",
      },
    ],
  },
  {
    key: "statistical-tests::foundational",
    skillSlug: "statistical-tests",
    skillName: "Statistical Tests",
    level: "Foundational",
    displayName: "Foundational Statistical Tests",
    careerBand: 1,
    expressions: [
      {
        id: "interpret-the-outputs-of-hypothesis-tests-to-make-statistically-sound-decisions",
        name: "Interpret the outputs of hypothesis tests to make statistically sound decisions.",
        description: "This competency represents the ability to interpret the results of standard hypothesis tests (t-test, ANOVA, chi-square test, proportion test) and make informed statistical decisions. It involves more than simply running the test; it includes the ability to understand and explain the key outputs. A professional can:\n Determine statistical significance: Compare the calculated p-value to a given significance level (alpha) and correctly state whether the result is statistically significant. \n Interpret confidence intervals: Articulate the practical meaning of a confidence interval in the context of the data (e.g., 'We are 95% confident that...').\n Understand test statistics: Recognize the role of the test statistic as a measure of the deviation of the observed data from what would be expected under the null hypothesis.\n Make statistical decisions: Based on the p-value and alpha, make a clear decision to reject or fail to reject the null hypothesis, following standard statistical procedures.",
      },
      {
        id: "understand-the-core-components-of-a-statistical-hypothesis-test",
        name: "Understand the core components of a statistical hypothesis test.",
        description: "This skill represents the foundational literacy needed as a pre-requisite to perform and interpret any hypothesis test. It involves defining and explaining the purpose of a defined list of core components, which includes: the Null Hypothesis (the default assumption of no effect), the Alternative Hypothesis (the claim being tested), the Significance Level (alpha, the threshold for evidence), and the p-value (the probability of observing the data if the null is true).",
      },
    ],
  },
  {
    key: "statistical-visualization::foundational",
    skillSlug: "statistical-visualization",
    skillName: "Statistical Visualization",
    level: "Foundational",
    displayName: "Foundational Statistical Visualization",
    careerBand: 1,
    expressions: [
      {
        id: "identify-the-appropriate-chart-type-for-a-given-analytical-purpose",
        name: "Identify the appropriate chart type for a given analytical purpose.",
        description: "This skill represents the foundational knowledge of choosing the right visual tool for the job. It involves matching a specific analytical goal to the correct visualization. A professional with this skill can select the appropriate chart from a defined, comprehensive list of fundamental charts based on the intended purpose. This includes: using a Bar Chart for comparing values across categories, a Line Chart for showing a trend over time, a Scatter Plot for showing a relationship between two variables, a Histogram for showing a distribution, and a Pie Chart for showing the composition of a whole.",
      },
    ],
  },
  {
    key: "statistics::foundational",
    skillSlug: "statistics",
    skillName: "Statistics",
    level: "Foundational",
    displayName: "Foundational Statistics",
    careerBand: 1,
    expressions: [
      {
        id: "understand-the-core-components-of-a-statistical-hypothesis-test",
        name: "Understand the core components of a statistical hypothesis test.",
        description: "This skill represents the foundational literacy needed as a pre-requisite to perform and interpret any hypothesis test. It involves defining and explaining the purpose of a defined list of core components, which includes: the Null Hypothesis (the default assumption of no effect), the Alternative Hypothesis (the claim being tested), the Significance Level (alpha, the threshold for evidence), and the p-value (the probability of observing the data if the null is true).",
      },
    ],
  },
  {
    key: "visualization-graphic::foundational",
    skillSlug: "visualization-graphic",
    skillName: "Visualization Graphic",
    level: "Foundational",
    displayName: "Foundational Visualization Graphic",
    careerBand: 1,
    expressions: [
      {
        id: "identify-the-appropriate-chart-type-for-a-given-analytical-purpose",
        name: "Identify the appropriate chart type for a given analytical purpose.",
        description: "This skill represents the foundational knowledge of choosing the right visual tool for the job. It involves matching a specific analytical goal to the correct visualization. A professional with this skill can select the appropriate chart from a defined, comprehensive list of fundamental charts based on the intended purpose. This includes: using a Bar Chart for comparing values across categories, a Line Chart for showing a trend over time, a Scatter Plot for showing a relationship between two variables, a Histogram for showing a distribution, and a Pie Chart for showing the composition of a whole.",
      },
    ],
  },
  {
    key: "a/b-testing::beginner",
    skillSlug: "a/b-testing",
    skillName: "A/B Testing",
    level: "Beginner",
    displayName: "Beginner A/B Testing",
    careerBand: 1,
    expressions: [
      {
        id: "apply-standard-statistical-tests-for-hypothesis-testing",
        name: "Apply standard statistical tests for hypothesis testing.",
        description: "This competency represents the ability to formulate and execute common hypothesis tests to draw statistically sound inferences from data. This includes:\n \n\n Formulating Hypotheses: Clearly defining null and alternative hypotheses based on the business question.\n Preparing Data: Appropriately formatting and cleaning the data for the chosen statistical test.\n Test Selection and Execution: Selecting and applying the correct statistical test using either standard software functions or statistical library functions in programming languages. Common tests include:\n \n\n T-test: Comparing the means of two groups (e.g., A/B test results, distinct populations).\n Chi-Square Test: Comparing proportions between two or more groups or assessing associations between categorical variables (e.g., analyzing conversion rates or survey responses across groups).\n \n\n Interpretation: Accurately interpreting test results, specifically the p-value, to draw conclusions about the hypotheses in the context of the business problem.",
      },
    ],
  },
  {
    key: "consolidation::beginner",
    skillSlug: "consolidation",
    skillName: "Consolidation",
    level: "Beginner",
    displayName: "Beginner Consolidation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-merging-and-joining-operations-to-combine-datasets",
        name: "Apply merging and joining operations to combine datasets.",
        description: "this skill expression represents the ability to integrate data from two or more separate sources into a single, unified dataset. It involves selecting an appropriate joining strategy based on a defined set of common keys. The list of core join strategies includes: INNER (to keep only matching records), LEFT (to keep all records from the first dataset and matching ones from the second), RIGHT, and OUTER. An early career professional applies these operations using tools like SQL or a library such as Pandas to enrich a dataset with columns from another table.",
      },
    ],
  },
  {
    key: "correlation-and-dependence::beginner",
    skillSlug: "correlation-and-dependence",
    skillName: "Correlation And Dependence",
    level: "Beginner",
    displayName: "Beginner Correlation And Dependence",
    careerBand: 1,
    expressions: [
      {
        id: "apply-correlation-techniques-to-measure-the-association-between-numeric--19c926",
        name: "Apply correlation techniques to measure the association between numeric variables.",
        description: "This competency represents the ability to quantify the strength and direction of the linear relationship between numeric variables. It involves using standard functions to calculate correlation coefficients, such as Pearson's r, which produces a value between -1 and +1. A professional can interpret the output to understand the relationship between variables: a value near +1 indicates a strong positive relationship, a value near -1 indicates a strong negative relationship, and a value near 0 indicates a weak or no linear relationship. This technique can be applied to pairs of variables or to generate a correlation matrix, which shows the correlation coefficients for all possible pairs of numeric variables in a dataset. This information helps identify which variables have strong positive or negative relationships, guiding further investigation and analysis.",
      },
    ],
  },
  {
    key: "dashboard::beginner",
    skillSlug: "dashboard",
    skillName: "Dashboard",
    level: "Beginner",
    displayName: "Beginner Dashboard",
    careerBand: 1,
    expressions: [
      {
        id: "apply-basic-filtering-mechanisms-to-enable-user-driven-data-segmentation",
        name: "Apply basic filtering mechanisms to enable user-driven data segmentation.",
        description: "This skill expression represents the ability to add a foundational layer of interactivity to a dashboard. It involves implementing simple interactive controls like drop-down menus, sliders, or checkboxes that filter the entire dashboard by a specific dimension (e.g., date, region, product category), allowing users to view a subset of the data.",
      },
      {
        id: "apply-basic-formatting-options-to-ensure-dashboard-clarity-and-readability",
        name: "Apply basic formatting options to ensure dashboard clarity and readability.",
        description: "This skill expression represents the ability to refine the visual appearance of a dashboard to make it professional and easy to understand. This includes adjusting colors, font sizes, chart titles, axis labels, number formatting, and date-time formatting according to a given style guide or standard best practices, ensuring a clean and consistent presentation of information.",
      },
      {
        id: "apply-data-connection-methods-to-load-prepared-datasets",
        name: "Apply data connection methods to load prepared datasets",
        description: "This skill expression represents the foundational step of importing data for visualization. It involves using the standard interface of a BI tool to connect to and load data from a defined list of prepared data sources, such as a single spreadsheet, CSV file, or a pre-defined table/view in a database. The data is expected to be clean and analysis-ready.",
      },
      {
        id: "apply-standard-software-and-bi-tools-to-construct-fundamental-chart-types",
        name: "Apply standard software and BI tools to construct fundamental chart types",
        description: "This competency represents the ability to create fundamental visualizations using common software (e.g., Excel, Google Sheets) and Business Intelligence (BI) tools. It involves generating basic, static charts for reports or presentations, as well as individual visual components for dashboards. A professional can construct a defined list of chart types, including Bar Charts, Line Charts, Pie Charts, Scatter Plots, Text Tables (Crosstabs), and basic summary cards displaying KPIs. The focus is on the correct technical generation of the visual from a given dataset.",
      },
      {
        id: "assemble-visualizations-into-a-static-layout-within-a-dashboard-report-o-b33aa6",
        name: "Assemble visualizations into a static layout within a dashboard, report, or slide deck.",
        description: "This competency represents the ability to combine individual charts, tables, and other visual elements into a single, cohesive view within a dashboard, report, or slide deck. It involves using the layout features of BI tools, presentation software (like PowerPoint, Google Slides), or document software (like Word) to arrange these components in a structured and logical manner. This often includes following a provided template, wireframe, or mockup to achieve a clean and effective presentation. In the context of BI tools, this involves using a dashboarding canvas to place, resize, and organize visualizations. In the context of reports and slide decks, it involves embedding and arranging visual and textual elements on a page or slide.",
      },
    ],
  },
  {
    key: "data-cleansing::beginner",
    skillSlug: "data-cleansing",
    skillName: "Data Cleansing",
    level: "Beginner",
    displayName: "Beginner Data Cleansing",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-type-conversions-to-standardize-columns",
        name: "Apply data type conversions to standardize columns.",
        description: "this skill expression represents the ability to ensure that each column in a dataset is stored in the correct and most efficient format for analysis. It involves using conversion functions to change columns to their appropriate types, such as converting a column of numbers stored as text to a numeric type (integer, float), or transforming a string like '2023-01-15' into a formal date/time data type. This is a critical step to enable mathematical calculations and chronological sorting.",
      },
      {
        id: "apply-techniques-to-handle-missing-or-null-values",
        name: "Apply techniques to handle missing or null values.",
        description: "this skill expression represents the practical ability to address empty or incomplete data points within a dataset according to specified rules. It involves executing one of three common strategies: 1. Removal: Deleting rows or columns with a high percentage of missing values. 2. Imputation: Filling in missing values with a substitute, such as the mean, median, mode, or a constant like 'Unknown'. 3. Flagging: Creating a new column to mark rows where data was missing. An early career professional would apply the appropriate technique as instructed to ensure the dataset is complete for analysis.",
      },
      {
        id: "apply-techniques-to-identify-and-remove-duplicate-records",
        name: "Apply techniques to identify and remove duplicate records.",
        description: "this skill expression represents the ability to ensure that each record in a dataset is unique, preventing skewed analysis and reporting. It involves using built-in functions or writing scripts to identify rows that are either complete duplicates (all columns match) or partial duplicates (based on a specific set of key columns, like 'email' and 'date'). Once identified, the professional executes a process to remove or aggregate these redundant records.",
      },
      {
        id: "apply-transformations-to-correct-structural-and-formatting-errors",
        name: "Apply transformations to correct structural and formatting errors.",
        description: "this skill expression represents the ability to standardize the format of data for consistency. It involves using functions and tools to perform tasks such as trimming leading/trailing whitespace, converting text to a uniform case (UPPER, lower, or Proper Case), using find-and-replace to correct common misspellings or inconsistent terminology (e.g., changing 'USA' and 'U.S.' to 'United States'), and parsing text fields into multiple columns (e.g., splitting a full name into 'first_name' and 'last_name'). This ensures that all data within a column follows the same pattern.",
      },
    ],
  },
  {
    key: "data-import/export::beginner",
    skillSlug: "data-import/export",
    skillName: "Data Import/Export",
    level: "Beginner",
    displayName: "Beginner Data Import/Export",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-connection-methods-to-import-data-from-a-relational-database",
        name: "Apply data connection methods to import data from a relational database.",
        description: "This skill represents the ability to retrieve data directly from a database by executing a given query. It involves using a tool's built-in database connectors or a programming library to establish a connection and run a provided SQL SELECT statement, loading the results into a data structure (e.g., a DataFrame) for analysis.",
      },
      {
        id: "apply-data-connection-methods-to-load-prepared-datasets",
        name: "Apply data connection methods to load prepared datasets",
        description: "This skill expression represents the foundational step of importing data for visualization. It involves using the standard interface of a BI tool to connect to and load data from a defined list of prepared data sources, such as a single spreadsheet, CSV file, or a pre-defined table/view in a database. The data is expected to be clean and analysis-ready.",
      },
      {
        id: "apply-standard-functions-to-import-export-and-convert-data-between-commo-abb4f8",
        name: "Apply standard functions to import, export, and convert data between common flat file formats",
        description: "This competency represents the ability to import, export, and convert data between various common file formats. It involves using standard functions and libraries in data analysis tools or programming languages to read and write data. Specifically, a learner may import data from a file into the working environment, and export it to a new file as needed. A professional can perform these operations with a defined list of common formats, which includes: CSV, Excel (XLSX), JSON, Parquet, and Text. This includes using basic parameters to control the import/export process, such as specifying file paths, delimiters, sheet names, or excluding an index. \n  In standard python, the import and export can be achieved with with-open-read/write operations to read and write files respectively. In a programming package such as pandas, this can be achieved through functions such as read_csv/to_csv, read_json/to_json, read_excel/to_excel, read_parquet/to_parquet to read from and write to csv, json, excel, and parquet formats respectively.",
      },
    ],
  },
  {
    key: "data-integration::beginner",
    skillSlug: "data-integration",
    skillName: "Data Integration",
    level: "Beginner",
    displayName: "Beginner Data Integration",
    careerBand: 1,
    expressions: [
      {
        id: "apply-merging-and-joining-operations-to-combine-datasets",
        name: "Apply merging and joining operations to combine datasets.",
        description: "this skill expression represents the ability to integrate data from two or more separate sources into a single, unified dataset. It involves selecting an appropriate joining strategy based on a defined set of common keys. The list of core join strategies includes: INNER (to keep only matching records), LEFT (to keep all records from the first dataset and matching ones from the second), RIGHT, and OUTER. An early career professional applies these operations using tools like SQL or a library such as Pandas to enrich a dataset with columns from another table.",
      },
    ],
  },
  {
    key: "data-manipulation::beginner",
    skillSlug: "data-manipulation",
    skillName: "Data Manipulation",
    level: "Beginner",
    displayName: "Beginner Data Manipulation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-transformation-operations-to-derive-new-columns",
        name: "Apply data transformation operations to derive new columns.",
        description: "this skill expression represents the ability to create new information from existing data within a dataset. It involves performing row-level calculations using arithmetic operators (+, -, *, /) to generate new measures (e.g., creating a 'Profit' column from 'Revenue' and 'Cost' columns). It involves manipulating text, date data, converting data from one data type to another and applying conditional logic create new, derived fields or handle missing values. Thes transformations can be implemented in SQL, or using Pandas and NumPy in Python. This is a foundational form of feature engineering for an early career professional.",
      },
      {
        id: "apply-filtering-and-subsetting-techniques-to-isolate-data",
        name: "Apply filtering and subsetting techniques to isolate data.",
        description: "this skill expression represents the ability to create a smaller, more focused dataset for a specific task by selecting only the necessary data. This involves two primary actions: 1. Column Selection (Projection): Choosing a specific subset of columns to keep for an analysis. 2. Row Selection (Filtering): Using logical conditions to select rows that meet specific criteria (e.g., selecting all sales from the last quarter for customers in a specific region). This is a fundamental first step in nearly all data manipulation workflows to improve efficiency and relevance.",
      },
      {
        id: "apply-merging-and-joining-operations-to-combine-datasets",
        name: "Apply merging and joining operations to combine datasets.",
        description: "this skill expression represents the ability to integrate data from two or more separate sources into a single, unified dataset. It involves selecting an appropriate joining strategy based on a defined set of common keys. The list of core join strategies includes: INNER (to keep only matching records), LEFT (to keep all records from the first dataset and matching ones from the second), RIGHT, and OUTER. An early career professional applies these operations using tools like SQL or a library such as Pandas to enrich a dataset with columns from another table.",
      },
      {
        id: "apply-pivoting-and-unpivoting-techniques-to-reshape-datasets",
        name: "Apply pivoting and unpivoting techniques to reshape datasets.",
        description: "this skill expression represents the ability to change the fundamental structure of a dataset from a long to a wide format, or vice-versa, to make it suitable for a specific analysis or visualization. Pivoting involves converting unique values from a single column into multiple new columns. Unpivoting (or melting) is the reverse, collapsing multiple columns into a single key-value pair. An early career professional applies these techniques using functions like PIVOT/UNPIVOT in SQL or pivot()/melt() in Python's Pandas library to prepare data for tools that require a specific layout.",
      },
    ],
  },
  {
    key: "data-presentation::beginner",
    skillSlug: "data-presentation",
    skillName: "Data Presentation",
    level: "Beginner",
    displayName: "Beginner Data Presentation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-basic-formatting-options-to-ensure-dashboard-clarity-and-readability",
        name: "Apply basic formatting options to ensure dashboard clarity and readability.",
        description: "This skill expression represents the ability to refine the visual appearance of a dashboard to make it professional and easy to understand. This includes adjusting colors, font sizes, chart titles, axis labels, number formatting, and date-time formatting according to a given style guide or standard best practices, ensuring a clean and consistent presentation of information.",
      },
      {
        id: "apply-descriptive-annotations-and-titles-to-communicate-a-key-finding",
        name: "Apply descriptive annotations and titles to communicate a key finding.",
        description: "This skill represents the ability to add a layer of textual context to a visualization. It involves writing a clear, objective summary or title that explicitly states what the chart shows. For example, instead of a generic title like 'Sales vs. Time,' a more descriptive title would be 'Sales Grew 15% in Q4.' This also includes adding annotations to point out specific data points of interest, as instructed.",
      },
      {
        id: "apply-standard-software-and-bi-tools-to-construct-fundamental-chart-types",
        name: "Apply standard software and BI tools to construct fundamental chart types",
        description: "This competency represents the ability to create fundamental visualizations using common software (e.g., Excel, Google Sheets) and Business Intelligence (BI) tools. It involves generating basic, static charts for reports or presentations, as well as individual visual components for dashboards. A professional can construct a defined list of chart types, including Bar Charts, Line Charts, Pie Charts, Scatter Plots, Text Tables (Crosstabs), and basic summary cards displaying KPIs. The focus is on the correct technical generation of the visual from a given dataset.",
      },
      {
        id: "assemble-visualizations-into-a-static-layout-within-a-dashboard-report-o-b33aa6",
        name: "Assemble visualizations into a static layout within a dashboard, report, or slide deck.",
        description: "This competency represents the ability to combine individual charts, tables, and other visual elements into a single, cohesive view within a dashboard, report, or slide deck. It involves using the layout features of BI tools, presentation software (like PowerPoint, Google Slides), or document software (like Word) to arrange these components in a structured and logical manner. This often includes following a provided template, wireframe, or mockup to achieve a clean and effective presentation. In the context of BI tools, this involves using a dashboarding canvas to place, resize, and organize visualizations. In the context of reports and slide decks, it involves embedding and arranging visual and textual elements on a page or slide.",
      },
      {
        id: "apply-visual-design-principles-to-create-clear-and-impactful-presentatio-7078dd",
        name: "Apply visual design principles to create clear and impactful presentation materials.",
        description: "This skill represents the ability to create professional, aesthetically pleasing, and effective slides or reports. It involves the practical application of design best practices to improve communication. A skilled professional can apply a defined list of core design principles, including: 1. Using a consistent color palette and font scheme, 2. Ensuring a high data-to-ink ratio by removing clutter, and 3. Using whitespace and alignment to create a clean, organized layout that directs audience attention.",
      },
    ],
  },
  {
    key: "data-quality::beginner",
    skillSlug: "data-quality",
    skillName: "Data Quality",
    level: "Beginner",
    displayName: "Beginner Data Quality",
    careerBand: 1,
    expressions: [
      {
        id: "apply-programming-and-data-profiling-techniques-to-summarize-dataset-cha-46d72e",
        name: "Apply programming and data profiling techniques to summarize dataset characteristics",
        description: "This competency represents the ability to use programming and data profiling techniques to generate a comprehensive summary of a dataset's characteristics, both for initial exploration and for deeper understanding. This involves leveraging standard functions and tools (such as SQL, Python with libraries like Pandas, or R) to calculate and report on key structural and statistical properties of the data. A professional with this skill can:\n \n\n * Determine basic structural information: Report on the total number of rows and columns, the data type of each column, and identify the presence and extent of missing values.\n * Calculate descriptive statistics: Compute and interpret core descriptive statistics for numeric columns, including mean, median, standard deviation, minimum, maximum, and unique value counts. \n * Profile data for quality assessment: Generate a detailed profile of each column, including data type, row count, percentage of missing values, count of unique values, and summary statistics to identify potential data quality issues. This summary serves as a foundational report on the data's condition and can be used as a starting point for further analysis.",
      },
    ],
  },
  {
    key: "data-synthesis::beginner",
    skillSlug: "data-synthesis",
    skillName: "Data Synthesis",
    level: "Beginner",
    displayName: "Beginner Data Synthesis",
    careerBand: 1,
    expressions: [
      {
        id: "apply-merging-and-joining-operations-to-combine-datasets",
        name: "Apply merging and joining operations to combine datasets.",
        description: "this skill expression represents the ability to integrate data from two or more separate sources into a single, unified dataset. It involves selecting an appropriate joining strategy based on a defined set of common keys. The list of core join strategies includes: INNER (to keep only matching records), LEFT (to keep all records from the first dataset and matching ones from the second), RIGHT, and OUTER. An early career professional applies these operations using tools like SQL or a library such as Pandas to enrich a dataset with columns from another table.",
      },
    ],
  },
  {
    key: "data-transformation::beginner",
    skillSlug: "data-transformation",
    skillName: "Data Transformation",
    level: "Beginner",
    displayName: "Beginner Data Transformation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-binning-to-convert-continuous-variables-into-categorical-variables",
        name: "Apply binning to convert continuous variables into categorical variables.",
        description: "this skill expression represents the ability to reduce the complexity of continuous data by grouping it into a finite number of categories or 'bins'. It involves using conditional logic (like CASE statements or cut functions) to transform a numeric column (e.g., 'Age') into a categorical one (e.g., 'Age Group' with values like '18-25', '26-40'). This transformation makes it easier to analyze data as distinct groups and is a foundational form of generalization.",
      },
      {
        id: "apply-data-type-conversions-to-standardize-columns",
        name: "Apply data type conversions to standardize columns.",
        description: "this skill expression represents the ability to ensure that each column in a dataset is stored in the correct and most efficient format for analysis. It involves using conversion functions to change columns to their appropriate types, such as converting a column of numbers stored as text to a numeric type (integer, float), or transforming a string like '2023-01-15' into a formal date/time data type. This is a critical step to enable mathematical calculations and chronological sorting.",
      },
      {
        id: "apply-normalization-techniques-to-numeric-features",
        name: "Apply normalization techniques to numeric features.",
        description: "this skill expression represents the ability to rescale numeric data to a standard range, a common prerequisite for many analytical models. It involves applying predefined mathematical formulas to columns. A professional proficient in this skill can execute two core techniques: 1. Min-Max Scaling, to transform data to a specific range (typically 0 to 1), and 2. Standardization (Z-score Normalization), to transform data to have a mean of 0 and a standard deviation of 1. This ensures that features with different scales contribute equally to the analysis.",
      },
      {
        id: "apply-standard-functions-to-import-export-and-convert-data-between-commo-abb4f8",
        name: "Apply standard functions to import, export, and convert data between common flat file formats",
        description: "This competency represents the ability to import, export, and convert data between various common file formats. It involves using standard functions and libraries in data analysis tools or programming languages to read and write data. Specifically, a learner may import data from a file into the working environment, and export it to a new file as needed. A professional can perform these operations with a defined list of common formats, which includes: CSV, Excel (XLSX), JSON, Parquet, and Text. This includes using basic parameters to control the import/export process, such as specifying file paths, delimiters, sheet names, or excluding an index. \n  In standard python, the import and export can be achieved with with-open-read/write operations to read and write files respectively. In a programming package such as pandas, this can be achieved through functions such as read_csv/to_csv, read_json/to_json, read_excel/to_excel, read_parquet/to_parquet to read from and write to csv, json, excel, and parquet formats respectively.",
      },
      {
        id: "apply-techniques-to-handle-missing-or-null-values",
        name: "Apply techniques to handle missing or null values.",
        description: "this skill expression represents the practical ability to address empty or incomplete data points within a dataset according to specified rules. It involves executing one of three common strategies: 1. Removal: Deleting rows or columns with a high percentage of missing values. 2. Imputation: Filling in missing values with a substitute, such as the mean, median, mode, or a constant like 'Unknown'. 3. Flagging: Creating a new column to mark rows where data was missing. An early career professional would apply the appropriate technique as instructed to ensure the dataset is complete for analysis.",
      },
      {
        id: "apply-transformations-to-correct-structural-and-formatting-errors",
        name: "Apply transformations to correct structural and formatting errors.",
        description: "this skill expression represents the ability to standardize the format of data for consistency. It involves using functions and tools to perform tasks such as trimming leading/trailing whitespace, converting text to a uniform case (UPPER, lower, or Proper Case), using find-and-replace to correct common misspellings or inconsistent terminology (e.g., changing 'USA' and 'U.S.' to 'United States'), and parsing text fields into multiple columns (e.g., splitting a full name into 'first_name' and 'last_name'). This ensures that all data within a column follows the same pattern.",
      },
    ],
  },
  {
    key: "data-visualization-software::beginner",
    skillSlug: "data-visualization-software",
    skillName: "Data Visualization Software",
    level: "Beginner",
    displayName: "Beginner Data Visualization Software",
    careerBand: 1,
    expressions: [
      {
        id: "apply-basic-filtering-mechanisms-to-enable-user-driven-data-segmentation",
        name: "Apply basic filtering mechanisms to enable user-driven data segmentation.",
        description: "This skill expression represents the ability to add a foundational layer of interactivity to a dashboard. It involves implementing simple interactive controls like drop-down menus, sliders, or checkboxes that filter the entire dashboard by a specific dimension (e.g., date, region, product category), allowing users to view a subset of the data.",
      },
      {
        id: "apply-basic-formatting-options-to-ensure-dashboard-clarity-and-readability",
        name: "Apply basic formatting options to ensure dashboard clarity and readability.",
        description: "This skill expression represents the ability to refine the visual appearance of a dashboard to make it professional and easy to understand. This includes adjusting colors, font sizes, chart titles, axis labels, number formatting, and date-time formatting according to a given style guide or standard best practices, ensuring a clean and consistent presentation of information.",
      },
      {
        id: "apply-data-connection-methods-to-load-prepared-datasets",
        name: "Apply data connection methods to load prepared datasets",
        description: "This skill expression represents the foundational step of importing data for visualization. It involves using the standard interface of a BI tool to connect to and load data from a defined list of prepared data sources, such as a single spreadsheet, CSV file, or a pre-defined table/view in a database. The data is expected to be clean and analysis-ready.",
      },
      {
        id: "apply-standard-software-and-bi-tools-to-construct-fundamental-chart-types",
        name: "Apply standard software and BI tools to construct fundamental chart types",
        description: "This competency represents the ability to create fundamental visualizations using common software (e.g., Excel, Google Sheets) and Business Intelligence (BI) tools. It involves generating basic, static charts for reports or presentations, as well as individual visual components for dashboards. A professional can construct a defined list of chart types, including Bar Charts, Line Charts, Pie Charts, Scatter Plots, Text Tables (Crosstabs), and basic summary cards displaying KPIs. The focus is on the correct technical generation of the visual from a given dataset.",
      },
    ],
  },
  {
    key: "data-wrangling::beginner",
    skillSlug: "data-wrangling",
    skillName: "Data Wrangling",
    level: "Beginner",
    displayName: "Beginner Data Wrangling",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-type-conversions-to-standardize-columns",
        name: "Apply data type conversions to standardize columns.",
        description: "this skill expression represents the ability to ensure that each column in a dataset is stored in the correct and most efficient format for analysis. It involves using conversion functions to change columns to their appropriate types, such as converting a column of numbers stored as text to a numeric type (integer, float), or transforming a string like '2023-01-15' into a formal date/time data type. This is a critical step to enable mathematical calculations and chronological sorting.",
      },
      {
        id: "apply-merging-and-joining-operations-to-combine-datasets",
        name: "Apply merging and joining operations to combine datasets.",
        description: "this skill expression represents the ability to integrate data from two or more separate sources into a single, unified dataset. It involves selecting an appropriate joining strategy based on a defined set of common keys. The list of core join strategies includes: INNER (to keep only matching records), LEFT (to keep all records from the first dataset and matching ones from the second), RIGHT, and OUTER. An early career professional applies these operations using tools like SQL or a library such as Pandas to enrich a dataset with columns from another table.",
      },
      {
        id: "apply-techniques-to-handle-missing-or-null-values",
        name: "Apply techniques to handle missing or null values.",
        description: "this skill expression represents the practical ability to address empty or incomplete data points within a dataset according to specified rules. It involves executing one of three common strategies: 1. Removal: Deleting rows or columns with a high percentage of missing values. 2. Imputation: Filling in missing values with a substitute, such as the mean, median, mode, or a constant like 'Unknown'. 3. Flagging: Creating a new column to mark rows where data was missing. An early career professional would apply the appropriate technique as instructed to ensure the dataset is complete for analysis.",
      },
      {
        id: "apply-transformations-to-correct-structural-and-formatting-errors",
        name: "Apply transformations to correct structural and formatting errors.",
        description: "this skill expression represents the ability to standardize the format of data for consistency. It involves using functions and tools to perform tasks such as trimming leading/trailing whitespace, converting text to a uniform case (UPPER, lower, or Proper Case), using find-and-replace to correct common misspellings or inconsistent terminology (e.g., changing 'USA' and 'U.S.' to 'United States'), and parsing text fields into multiple columns (e.g., splitting a full name into 'first_name' and 'last_name'). This ensures that all data within a column follows the same pattern.",
      },
    ],
  },
  {
    key: "descriptive-analytics::beginner",
    skillSlug: "descriptive-analytics",
    skillName: "Descriptive Analytics",
    level: "Beginner",
    displayName: "Beginner Descriptive Analytics",
    careerBand: 1,
    expressions: [
      {
        id: "apply-frequency-analysis-to-summarize-the-distribution-of-categorical-data",
        name: "Apply frequency analysis to summarize the distribution of categorical data.",
        description: "This skill represents the ability to understand the composition and distribution of categorical data within a dataset. It involves calculating the frequency or count of each unique category in one or more categorical variables, which helps in answering questions like, \"How many items fall into each category?\", \"Which category is most common?\". A professional can use programmatic functions to determine these value counts and create visual representations such as frequency tables and bar charts to present the distribution of categories.",
      },
      {
        id: "apply-measures-of-central-tendency-and-dispersion-to-summarize-dataset-variables",
        name: "Apply measures of central tendency and dispersion to summarize dataset variables.",
        description: "This competency represents the ability to describe the key characteristics of a dataset's variables using fundamental descriptive statistics. It involves applying standard functions in software or programming languages (e.g., Excel, SQL, Python) to calculate and interpret:\n 1. Measures of Central Tendency: These metrics represent the 'typical' or central value of a variable's distribution. They include the mean (average), median (middle value), and mode (most frequent value).\n 2. Measures of Dispersion: These metrics describe the 'spread,' variability, or concentration of data around the central tendency. They include standard deviation, variance, and range (minimum and maximum values).\n Calculating and interpreting these measures provides a foundational quantitative summary of dataset variables and is a crucial first step in understanding and analyzing any data.",
      },
      {
        id: "apply-time-based-reporting-to-track-key-performance-indicators-kpis",
        name: "Apply time-based reporting to track key performance indicators (KPIs).",
        description: "This skill represents the ability to summarize and report on business metrics over a specific time period. It involves filtering a dataset by a date range and often aggregating it by a time unit (e.g., day, week, month) to show trends. A professional with this skill can produce reports showing daily user signups, weekly sales totals, or monthly website traffic, which are the building blocks of trend analysis.",
      },
    ],
  },
  {
    key: "descriptive-statistics::beginner",
    skillSlug: "descriptive-statistics",
    skillName: "Descriptive Statistics",
    level: "Beginner",
    displayName: "Beginner Descriptive Statistics",
    careerBand: 1,
    expressions: [
      {
        id: "apply-frequency-analysis-to-summarize-the-distribution-of-categorical-data",
        name: "Apply frequency analysis to summarize the distribution of categorical data.",
        description: "This skill represents the ability to understand the composition and distribution of categorical data within a dataset. It involves calculating the frequency or count of each unique category in one or more categorical variables, which helps in answering questions like, \"How many items fall into each category?\", \"Which category is most common?\". A professional can use programmatic functions to determine these value counts and create visual representations such as frequency tables and bar charts to present the distribution of categories.",
      },
      {
        id: "apply-measures-of-central-tendency-and-dispersion-to-summarize-dataset-variables",
        name: "Apply measures of central tendency and dispersion to summarize dataset variables.",
        description: "This competency represents the ability to describe the key characteristics of a dataset's variables using fundamental descriptive statistics. It involves applying standard functions in software or programming languages (e.g., Excel, SQL, Python) to calculate and interpret:\n 1. Measures of Central Tendency: These metrics represent the 'typical' or central value of a variable's distribution. They include the mean (average), median (middle value), and mode (most frequent value).\n 2. Measures of Dispersion: These metrics describe the 'spread,' variability, or concentration of data around the central tendency. They include standard deviation, variance, and range (minimum and maximum values).\n Calculating and interpreting these measures provides a foundational quantitative summary of dataset variables and is a crucial first step in understanding and analyzing any data.",
      },
      {
        id: "apply-measures-of-shape-to-describe-the-symmetry-and-tail-characteristic-70a4da",
        name: "Apply measures of shape to describe the symmetry and tail characteristics of a data distribution.",
        description: "This skill represents the ability to calculate metrics that describe the shape of a distribution compared to a normal (bell-shaped) curve. It involves using standard software functions to calculate: 1. Skewness, to measure the asymmetry of the distribution, and 2. Kurtosis, to measure the 'tailedness' or how heavy the tails of the distribution are. This provides a more nuanced understanding of the data's structure.",
      },
      {
        id: "apply-programming-and-data-profiling-techniques-to-summarize-dataset-cha-46d72e",
        name: "Apply programming and data profiling techniques to summarize dataset characteristics",
        description: "This competency represents the ability to use programming and data profiling techniques to generate a comprehensive summary of a dataset's characteristics, both for initial exploration and for deeper understanding. This involves leveraging standard functions and tools (such as SQL, Python with libraries like Pandas, or R) to calculate and report on key structural and statistical properties of the data. A professional with this skill can:\n \n\n * Determine basic structural information: Report on the total number of rows and columns, the data type of each column, and identify the presence and extent of missing values.\n * Calculate descriptive statistics: Compute and interpret core descriptive statistics for numeric columns, including mean, median, standard deviation, minimum, maximum, and unique value counts. \n * Profile data for quality assessment: Generate a detailed profile of each column, including data type, row count, percentage of missing values, count of unique values, and summary statistics to identify potential data quality issues. This summary serves as a foundational report on the data's condition and can be used as a starting point for further analysis.",
      },
    ],
  },
  {
    key: "exploratory-data-analysis::beginner",
    skillSlug: "exploratory-data-analysis",
    skillName: "Exploratory Data Analysis",
    level: "Beginner",
    displayName: "Beginner Exploratory Data Analysis",
    careerBand: 1,
    expressions: [
      {
        id: "apply-correlation-techniques-to-measure-the-association-between-numeric--19c926",
        name: "Apply correlation techniques to measure the association between numeric variables.",
        description: "This competency represents the ability to quantify the strength and direction of the linear relationship between numeric variables. It involves using standard functions to calculate correlation coefficients, such as Pearson's r, which produces a value between -1 and +1. A professional can interpret the output to understand the relationship between variables: a value near +1 indicates a strong positive relationship, a value near -1 indicates a strong negative relationship, and a value near 0 indicates a weak or no linear relationship. This technique can be applied to pairs of variables or to generate a correlation matrix, which shows the correlation coefficients for all possible pairs of numeric variables in a dataset. This information helps identify which variables have strong positive or negative relationships, guiding further investigation and analysis.",
      },
      {
        id: "apply-frequency-analysis-to-summarize-the-distribution-of-categorical-data",
        name: "Apply frequency analysis to summarize the distribution of categorical data.",
        description: "This skill represents the ability to understand the composition and distribution of categorical data within a dataset. It involves calculating the frequency or count of each unique category in one or more categorical variables, which helps in answering questions like, \"How many items fall into each category?\", \"Which category is most common?\". A professional can use programmatic functions to determine these value counts and create visual representations such as frequency tables and bar charts to present the distribution of categories.",
      },
      {
        id: "apply-graphical-methods-to-explore-relationships-between-pairs-of-variables",
        name: "Apply graphical methods to explore relationships between pairs of variables.",
        description: "This competency represents the ability to investigate the relationship between two variables using appropriate graphical methods. It involves selecting and creating the correct type of visualization based on the variables' data types. A professional can generate a defined list of core bivariate plots, including:\n 1. Scatter Plots: To visualize the relationship between two numeric variables, mapping one to the x-axis and the other to the y-axis. This allows for visual assessment of correlation direction (positive, negative) and strength.\n 2. Grouped Box Plots: To compare the distribution of a numeric variable across different categories or groups of a categorical variable. This visualization displays the spread, central tendency, and potential differences in the numeric variable's distribution for each category.",
      },
      {
        id: "apply-programming-and-data-profiling-techniques-to-summarize-dataset-cha-46d72e",
        name: "Apply programming and data profiling techniques to summarize dataset characteristics",
        description: "This competency represents the ability to use programming and data profiling techniques to generate a comprehensive summary of a dataset's characteristics, both for initial exploration and for deeper understanding. This involves leveraging standard functions and tools (such as SQL, Python with libraries like Pandas, or R) to calculate and report on key structural and statistical properties of the data. A professional with this skill can:\n \n\n * Determine basic structural information: Report on the total number of rows and columns, the data type of each column, and identify the presence and extent of missing values.\n * Calculate descriptive statistics: Compute and interpret core descriptive statistics for numeric columns, including mean, median, standard deviation, minimum, maximum, and unique value counts. \n * Profile data for quality assessment: Generate a detailed profile of each column, including data type, row count, percentage of missing values, count of unique values, and summary statistics to identify potential data quality issues. This summary serves as a foundational report on the data's condition and can be used as a starting point for further analysis.",
      },
      {
        id: "apply-visualization-tools-and-graphical-methods-to-understand-the-distri-da68a7",
        name: "Apply visualization tools and graphical methods to understand the distribution of numeric variables.",
        description: "This competency represents the ability to visually explore and summarize the statistical properties of individual numeric variables. It involves using visualization tools and graphical methods to create fundamental plots that reveal a variable's distribution, central tendency, spread, and potential outliers. This is essential for initial data exploration, quality checks, and understanding the characteristics of the data. A professional can construct a defined list of plots, including:\n Histograms: To visualize the frequency distribution, identify skewness, and understand the overall shape of the data.\n Box Plots: To quickly identify the median, quartiles, range, and potential outliers in the data.",
      },
    ],
  },
  {
    key: "extract--transform--load::beginner",
    skillSlug: "extract--transform--load",
    skillName: "Extract, Transform, Load",
    level: "Beginner",
    displayName: "Beginner Extract, Transform, Load",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-type-conversions-to-standardize-columns",
        name: "Apply data type conversions to standardize columns.",
        description: "this skill expression represents the ability to ensure that each column in a dataset is stored in the correct and most efficient format for analysis. It involves using conversion functions to change columns to their appropriate types, such as converting a column of numbers stored as text to a numeric type (integer, float), or transforming a string like '2023-01-15' into a formal date/time data type. This is a critical step to enable mathematical calculations and chronological sorting.",
      },
    ],
  },
  {
    key: "generative-ai::beginner",
    skillSlug: "generative-ai",
    skillName: "Generative Ai",
    level: "Beginner",
    displayName: "Beginner Generative Ai",
    careerBand: 1,
    expressions: [
      {
        id: "apply-a-generative-ai-tool-to-generate-basic-data-queries-for-extracting-data",
        name: "Apply a generative AI tool to generate basic data queries for extracting data",
        description: "This skill represents the ability to use an AI assistant to accelerate the creation of simple data extraction scripts. It involves writing a clear, natural language prompt to request a SQL query. For a CB1 professional, this is limited to a defined list of basic query types, including: `SELECT` statements with `WHERE` clauses for filtering, `ORDER BY` for sorting, and simple `INNER JOIN` operations to combine two tables. The generated code must be reviewed and tested by the user.",
      },
      {
        id: "apply-a-generative-ai-tool-to-generate-code-snippets-for-basic-data-manipulation",
        name: "Apply a generative AI tool to generate code snippets for basic data manipulation.",
        description: "This skill represents the ability to use an AI assistant to perform common data wrangling tasks in a programming language like Python. It involves writing a prompt to request code for a specific action. A skilled professional can generate code for a defined list of core tasks using libraries like Pandas, including: 1. Reading a CSV or Excel file into a DataFrame, 2. Selecting or dropping columns, and 3. Filtering rows based on a simple condition. The generated code must be reviewed and tested.",
      },
      {
        id: "apply-generative-ai-tools-to-document-analytical-code",
        name: "Apply generative AI tools to document analytical code.",
        description: "This skill represents the ability to use AI-powered assistants to improve programming productivity and code quality. It involves using tools like GitHub Copilot or other LLMs to perform a defined list of core coding tasks, including: 1. Generating code snippets in languages like SQL or Python from natural language comments, 2. Creating comprehensive documentation and docstrings for functions, and 3. Refactoring or explaining complex, existing code to improve maintainability.",
      },
    ],
  },
  {
    key: "interactive-data-visualization::beginner",
    skillSlug: "interactive-data-visualization",
    skillName: "Interactive Data Visualization",
    level: "Beginner",
    displayName: "Beginner Interactive Data Visualization",
    careerBand: 1,
    expressions: [
      {
        id: "apply-basic-filtering-mechanisms-to-enable-user-driven-data-segmentation",
        name: "Apply basic filtering mechanisms to enable user-driven data segmentation.",
        description: "This skill expression represents the ability to add a foundational layer of interactivity to a dashboard. It involves implementing simple interactive controls like drop-down menus, sliders, or checkboxes that filter the entire dashboard by a specific dimension (e.g., date, region, product category), allowing users to view a subset of the data.",
      },
    ],
  },
  {
    key: "plot-graphics::beginner",
    skillSlug: "plot-graphics",
    skillName: "Plot Graphics",
    level: "Beginner",
    displayName: "Beginner Plot Graphics",
    careerBand: 1,
    expressions: [
      {
        id: "apply-basic-formatting-options-to-ensure-dashboard-clarity-and-readability",
        name: "Apply basic formatting options to ensure dashboard clarity and readability.",
        description: "This skill expression represents the ability to refine the visual appearance of a dashboard to make it professional and easy to understand. This includes adjusting colors, font sizes, chart titles, axis labels, number formatting, and date-time formatting according to a given style guide or standard best practices, ensuring a clean and consistent presentation of information.",
      },
    ],
  },
  {
    key: "probability-and-statistics::beginner",
    skillSlug: "probability-and-statistics",
    skillName: "Probability And Statistics",
    level: "Beginner",
    displayName: "Beginner Probability And Statistics",
    careerBand: 1,
    expressions: [
      {
        id: "apply-basic-probability-concepts-to-calculate-the-likelihood-of-events",
        name: "Apply basic probability concepts to calculate the likelihood of events",
        description: "this skill expression represents the ability to calculate the chance of an event occurring based on historical data. It involves using counts and proportions to determine empirical probabilities. For an early career professional, this means answering questions like, 'Based on this dataset, what is the probability that a customer who buys product A will also buy product B?' by dividing the number of successful outcomes by the total number of possible outcomes. This is a foundational technique for answering questions using data that fulfil business needs.",
      },
      {
        id: "apply-correlation-techniques-to-measure-the-association-between-numeric--19c926",
        name: "Apply correlation techniques to measure the association between numeric variables.",
        description: "This competency represents the ability to quantify the strength and direction of the linear relationship between numeric variables. It involves using standard functions to calculate correlation coefficients, such as Pearson's r, which produces a value between -1 and +1. A professional can interpret the output to understand the relationship between variables: a value near +1 indicates a strong positive relationship, a value near -1 indicates a strong negative relationship, and a value near 0 indicates a weak or no linear relationship. This technique can be applied to pairs of variables or to generate a correlation matrix, which shows the correlation coefficients for all possible pairs of numeric variables in a dataset. This information helps identify which variables have strong positive or negative relationships, guiding further investigation and analysis.",
      },
      {
        id: "apply-measures-of-central-tendency-and-dispersion-to-summarize-dataset-variables",
        name: "Apply measures of central tendency and dispersion to summarize dataset variables.",
        description: "This competency represents the ability to describe the key characteristics of a dataset's variables using fundamental descriptive statistics. It involves applying standard functions in software or programming languages (e.g., Excel, SQL, Python) to calculate and interpret:\n 1. Measures of Central Tendency: These metrics represent the 'typical' or central value of a variable's distribution. They include the mean (average), median (middle value), and mode (most frequent value).\n 2. Measures of Dispersion: These metrics describe the 'spread,' variability, or concentration of data around the central tendency. They include standard deviation, variance, and range (minimum and maximum values).\n Calculating and interpreting these measures provides a foundational quantitative summary of dataset variables and is a crucial first step in understanding and analyzing any data.",
      },
      {
        id: "apply-standard-statistical-tests-for-hypothesis-testing",
        name: "Apply standard statistical tests for hypothesis testing.",
        description: "This competency represents the ability to formulate and execute common hypothesis tests to draw statistically sound inferences from data. This includes:\n \n\n Formulating Hypotheses: Clearly defining null and alternative hypotheses based on the business question.\n Preparing Data: Appropriately formatting and cleaning the data for the chosen statistical test.\n Test Selection and Execution: Selecting and applying the correct statistical test using either standard software functions or statistical library functions in programming languages. Common tests include:\n \n\n T-test: Comparing the means of two groups (e.g., A/B test results, distinct populations).\n Chi-Square Test: Comparing proportions between two or more groups or assessing associations between categorical variables (e.g., analyzing conversion rates or survey responses across groups).\n \n\n Interpretation: Accurately interpreting test results, specifically the p-value, to draw conclusions about the hypotheses in the context of the business problem.",
      },
      {
        id: "identify-common-probability-distribution-in-a-dataset",
        name: "Identify common probability distribution in a dataset",
        description: "this skill expression represents the ability to use visual tools (like histograms) and descriptive statistics to check if a variable's distribution resembles a common theoretical distribution (Normal, Poisson, Binomial, Gaussian, Geometric, Beta, Bernoulli, Uniform). An early career professional would be expected to analyze the data through various means including visualizing, calculating descriptive statistics and noting similarity with the theoretical ones. This is a crucial step in understanding the data and making informed decisions about how to proceed with data analysis.",
      },
    ],
  },
  {
    key: "sampling-statistics::beginner",
    skillSlug: "sampling-statistics",
    skillName: "Sampling Statistics",
    level: "Beginner",
    displayName: "Beginner Sampling Statistics",
    careerBand: 1,
    expressions: [
      {
        id: "calculate-confidence-intervals-and-margin-of-error-for-sample-estimates--302e04",
        name: "Calculate confidence intervals and margin of error for sample estimates of population parameters.",
        description: "This competency represents the ability to quantify the uncertainty and precision of sample-based estimates of population parameters (such as the mean or a proportion). It involves calculating the standard error of a statistic and constructing a confidence interval, which provides a range of plausible values for the true population parameter. This process allows for a formal measure of how well the sample statistic is likely to represent the true population value. It can involve direct calculation or using standard software functions.",
      },
      {
        id: "apply-statistical-formulas-to-determine-the-required-sample-size-for-an-analysis",
        name: "Apply statistical formulas to determine the required sample size for an analysis.",
        description: "This skill represents the ability to design a statistically sound study before data collection begins. It involves a formal calculation to determine the minimum number of samples needed to achieve a desired level of precision. A skilled professional can calculate the required sample size based on a defined set of inputs: the desired confidence level (e.g., 95%), the acceptable margin of error, and an estimate of the population's variance or proportion.",
      },
    ],
  },
  {
    key: "statistical-analysis::beginner",
    skillSlug: "statistical-analysis",
    skillName: "Statistical Analysis",
    level: "Beginner",
    displayName: "Beginner Statistical Analysis",
    careerBand: 1,
    expressions: [
      {
        id: "apply-standard-statistical-tests-for-hypothesis-testing",
        name: "Apply standard statistical tests for hypothesis testing.",
        description: "This competency represents the ability to formulate and execute common hypothesis tests to draw statistically sound inferences from data. This includes:\n \n\n Formulating Hypotheses: Clearly defining null and alternative hypotheses based on the business question.\n Preparing Data: Appropriately formatting and cleaning the data for the chosen statistical test.\n Test Selection and Execution: Selecting and applying the correct statistical test using either standard software functions or statistical library functions in programming languages. Common tests include:\n \n\n T-test: Comparing the means of two groups (e.g., A/B test results, distinct populations).\n Chi-Square Test: Comparing proportions between two or more groups or assessing associations between categorical variables (e.g., analyzing conversion rates or survey responses across groups).\n \n\n Interpretation: Accurately interpreting test results, specifically the p-value, to draw conclusions about the hypotheses in the context of the business problem.",
      },
      {
        id: "interpret-the-outputs-of-hypothesis-tests-to-make-statistically-sound-decisions",
        name: "Interpret the outputs of hypothesis tests to make statistically sound decisions.",
        description: "This competency represents the ability to interpret the results of standard hypothesis tests (t-test, ANOVA, chi-square test, proportion test) and make informed statistical decisions. It involves more than simply running the test; it includes the ability to understand and explain the key outputs. A professional can:\n Determine statistical significance: Compare the calculated p-value to a given significance level (alpha) and correctly state whether the result is statistically significant. \n Interpret confidence intervals: Articulate the practical meaning of a confidence interval in the context of the data (e.g., 'We are 95% confident that...').\n Understand test statistics: Recognize the role of the test statistic as a measure of the deviation of the observed data from what would be expected under the null hypothesis.\n Make statistical decisions: Based on the p-value and alpha, make a clear decision to reject or fail to reject the null hypothesis, following standard statistical procedures.",
      },
    ],
  },
  {
    key: "statistical-inference::beginner",
    skillSlug: "statistical-inference",
    skillName: "Statistical Inference",
    level: "Beginner",
    displayName: "Beginner Statistical Inference",
    careerBand: 1,
    expressions: [
      {
        id: "apply-standard-statistical-tests-for-hypothesis-testing",
        name: "Apply standard statistical tests for hypothesis testing.",
        description: "This competency represents the ability to formulate and execute common hypothesis tests to draw statistically sound inferences from data. This includes:\n \n\n Formulating Hypotheses: Clearly defining null and alternative hypotheses based on the business question.\n Preparing Data: Appropriately formatting and cleaning the data for the chosen statistical test.\n Test Selection and Execution: Selecting and applying the correct statistical test using either standard software functions or statistical library functions in programming languages. Common tests include:\n \n\n T-test: Comparing the means of two groups (e.g., A/B test results, distinct populations).\n Chi-Square Test: Comparing proportions between two or more groups or assessing associations between categorical variables (e.g., analyzing conversion rates or survey responses across groups).\n \n\n Interpretation: Accurately interpreting test results, specifically the p-value, to draw conclusions about the hypotheses in the context of the business problem.",
      },
      {
        id: "calculate-confidence-intervals-and-margin-of-error-for-sample-estimates--302e04",
        name: "Calculate confidence intervals and margin of error for sample estimates of population parameters.",
        description: "This competency represents the ability to quantify the uncertainty and precision of sample-based estimates of population parameters (such as the mean or a proportion). It involves calculating the standard error of a statistic and constructing a confidence interval, which provides a range of plausible values for the true population parameter. This process allows for a formal measure of how well the sample statistic is likely to represent the true population value. It can involve direct calculation or using standard software functions.",
      },
      {
        id: "interpret-the-outputs-of-hypothesis-tests-to-make-statistically-sound-decisions",
        name: "Interpret the outputs of hypothesis tests to make statistically sound decisions.",
        description: "This competency represents the ability to interpret the results of standard hypothesis tests (t-test, ANOVA, chi-square test, proportion test) and make informed statistical decisions. It involves more than simply running the test; it includes the ability to understand and explain the key outputs. A professional can:\n Determine statistical significance: Compare the calculated p-value to a given significance level (alpha) and correctly state whether the result is statistically significant. \n Interpret confidence intervals: Articulate the practical meaning of a confidence interval in the context of the data (e.g., 'We are 95% confident that...').\n Understand test statistics: Recognize the role of the test statistic as a measure of the deviation of the observed data from what would be expected under the null hypothesis.\n Make statistical decisions: Based on the p-value and alpha, make a clear decision to reject or fail to reject the null hypothesis, following standard statistical procedures.",
      },
    ],
  },
  {
    key: "statistical-visualization::beginner",
    skillSlug: "statistical-visualization",
    skillName: "Statistical Visualization",
    level: "Beginner",
    displayName: "Beginner Statistical Visualization",
    careerBand: 1,
    expressions: [
      {
        id: "apply-a-visualization-tool-to-create-charts-for-a-given-analytical-purpose",
        name: "Apply a visualization tool to create charts for a given analytical purpose",
        description: "This skill represents the ability to visually display characteristics of variables that could be use in assisting data analysis. The task could be of displaying how a numeric value changes over a continuous period or compare the magnitude of a numeric measures across different discrete groups or how two continuour variables are related to each other. It involves the technical task of using a software tool (spreadsheet, BI tool, plotting library such as matplotlib, seaborn or plotly in Python or ggplot2 in R) to map a time-based dimension (like day, month, or year) to the x-axis and a numeric measure to the y-axis, generating a line chart that clearly reveals trends, seasonality, or fluctuations over time. It involves the task to map a categorical variable to one axis and a numeric variable (e.g., a count or an average) to the other, generating a bar chart. It also involves the task of creating a scatter plot to display the relationship between two continuous numerical variables.",
      },
      {
        id: "apply-graphical-methods-to-explore-relationships-between-pairs-of-variables",
        name: "Apply graphical methods to explore relationships between pairs of variables.",
        description: "This competency represents the ability to investigate the relationship between two variables using appropriate graphical methods. It involves selecting and creating the correct type of visualization based on the variables' data types. A professional can generate a defined list of core bivariate plots, including:\n 1. Scatter Plots: To visualize the relationship between two numeric variables, mapping one to the x-axis and the other to the y-axis. This allows for visual assessment of correlation direction (positive, negative) and strength.\n 2. Grouped Box Plots: To compare the distribution of a numeric variable across different categories or groups of a categorical variable. This visualization displays the spread, central tendency, and potential differences in the numeric variable's distribution for each category.",
      },
      {
        id: "apply-visualization-tools-and-graphical-methods-to-understand-the-distri-da68a7",
        name: "Apply visualization tools and graphical methods to understand the distribution of numeric variables.",
        description: "This competency represents the ability to visually explore and summarize the statistical properties of individual numeric variables. It involves using visualization tools and graphical methods to create fundamental plots that reveal a variable's distribution, central tendency, spread, and potential outliers. This is essential for initial data exploration, quality checks, and understanding the characteristics of the data. A professional can construct a defined list of plots, including:\n Histograms: To visualize the frequency distribution, identify skewness, and understand the overall shape of the data.\n Box Plots: To quickly identify the median, quartiles, range, and potential outliers in the data.",
      },
      {
        id: "apply-graphical-methods-to-represent-statistical-uncertainty",
        name: "Apply graphical methods to represent statistical uncertainty.",
        description: "This skill represents the ability to create more honest and informative visualizations by showing the uncertainty around an estimate. It involves adding visual elements to a chart that represent a range of plausible values. A skilled professional can apply a defined list of core techniques, including: 1. Adding error bars to bar charts to show the confidence interval of a mean, and 2. Adding confidence bands to line charts to show the uncertainty of a trend or regression line.",
      },
    ],
  },
  {
    key: "statistics::beginner",
    skillSlug: "statistics",
    skillName: "Statistics",
    level: "Beginner",
    displayName: "Beginner Statistics",
    careerBand: 1,
    expressions: [
      {
        id: "apply-standard-statistical-tests-for-hypothesis-testing",
        name: "Apply standard statistical tests for hypothesis testing.",
        description: "This competency represents the ability to formulate and execute common hypothesis tests to draw statistically sound inferences from data. This includes:\n \n\n Formulating Hypotheses: Clearly defining null and alternative hypotheses based on the business question.\n Preparing Data: Appropriately formatting and cleaning the data for the chosen statistical test.\n Test Selection and Execution: Selecting and applying the correct statistical test using either standard software functions or statistical library functions in programming languages. Common tests include:\n \n\n T-test: Comparing the means of two groups (e.g., A/B test results, distinct populations).\n Chi-Square Test: Comparing proportions between two or more groups or assessing associations between categorical variables (e.g., analyzing conversion rates or survey responses across groups).\n \n\n Interpretation: Accurately interpreting test results, specifically the p-value, to draw conclusions about the hypotheses in the context of the business problem.",
      },
    ],
  },
  {
    key: "tableau-software::beginner",
    skillSlug: "tableau-software",
    skillName: "Tableau Software",
    level: "Beginner",
    displayName: "Beginner Tableau Software",
    careerBand: 1,
    expressions: [
      {
        id: "apply-standard-software-and-bi-tools-to-construct-fundamental-chart-types",
        name: "Apply standard software and BI tools to construct fundamental chart types",
        description: "This competency represents the ability to create fundamental visualizations using common software (e.g., Excel, Google Sheets) and Business Intelligence (BI) tools. It involves generating basic, static charts for reports or presentations, as well as individual visual components for dashboards. A professional can construct a defined list of chart types, including Bar Charts, Line Charts, Pie Charts, Scatter Plots, Text Tables (Crosstabs), and basic summary cards displaying KPIs. The focus is on the correct technical generation of the visual from a given dataset.",
      },
    ],
  },
  {
    key: "visualization-graphic::beginner",
    skillSlug: "visualization-graphic",
    skillName: "Visualization Graphic",
    level: "Beginner",
    displayName: "Beginner Visualization Graphic",
    careerBand: 1,
    expressions: [
      {
        id: "apply-basic-formatting-options-to-ensure-dashboard-clarity-and-readability",
        name: "Apply basic formatting options to ensure dashboard clarity and readability.",
        description: "This skill expression represents the ability to refine the visual appearance of a dashboard to make it professional and easy to understand. This includes adjusting colors, font sizes, chart titles, axis labels, number formatting, and date-time formatting according to a given style guide or standard best practices, ensuring a clean and consistent presentation of information.",
      },
      {
        id: "apply-standard-software-and-bi-tools-to-construct-fundamental-chart-types",
        name: "Apply standard software and BI tools to construct fundamental chart types",
        description: "This competency represents the ability to create fundamental visualizations using common software (e.g., Excel, Google Sheets) and Business Intelligence (BI) tools. It involves generating basic, static charts for reports or presentations, as well as individual visual components for dashboards. A professional can construct a defined list of chart types, including Bar Charts, Line Charts, Pie Charts, Scatter Plots, Text Tables (Crosstabs), and basic summary cards displaying KPIs. The focus is on the correct technical generation of the visual from a given dataset.",
      },
    ],
  },
  {
    key: "data-integrity::intermediate",
    skillSlug: "data-integrity",
    skillName: "Data Integrity",
    level: "Intermediate",
    displayName: "Intermediate Data Integrity",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-comparison-and-auditing-techniques-to-identify-data-quality-issues",
        name: "Apply data comparison and auditing techniques to identify data quality issues.",
        description: "This competency represents the ability to systematically identify a wide range of data quality errors, from simple inconsistencies to complex integrity issues. It involves applying data comparison methods to check for discrepancies by comparing related data within or across datasets. This includes verifying that the same entity is represented identically in different places, such as comparing customer addresses across tables or ensuring product IDs in sales records exist in the product catalog. This competency also encompasses the ability to conduct a data auditing process to proactively discover more complex data integrity issues, including: \n Logical Inconsistencies (e.g., a shipping date before an order date)\n Cross-field Validation Errors (e.g., a city and state combination that doesn't exist)\n Subtle format variations that require advanced pattern matching techniques.",
      },
    ],
  },
  {
    key: "data-manipulation::intermediate",
    skillSlug: "data-manipulation",
    skillName: "Data Manipulation",
    level: "Intermediate",
    displayName: "Intermediate Data Manipulation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-aggregation-and-cross-tabulation-techniques-to-create-summary-data-59aceb",
        name: "Apply aggregation and cross-tabulation techniques to create summary datasets and analyze relationships between variables.",
        description: "This competency encompasses the ability to transform granular data into meaningful summaries and explore relationships between variables. It involves using grouping logic (like GROUP BY in SQL or groupby() in Pandas) along with aggregation functions (such as SUM, COUNT, AVG, MAX) to calculate summary statistics for different categories or business segments. This enables the creation of condensed datasets suitable for reporting and dashboarding. For example, an individual with this competency can summarize individual sales transactions to calculate total daily sales per region or product category, average session duration per marketing channel, or the number of employees per department.\n \n\n Furthermore, this competency includes applying cross-tabulation techniques (pivot tables or crosstabs) to analyze the relationships between categorical variables. This involves summarizing the interaction between two distinct categories by displaying the frequency or a summary statistic (like average sales) for every combination of their categories. For instance, one could create a table showing customer counts broken down by both region and marketing channel to explore the effectiveness of different marketing strategies across regions.",
      },
      {
        id: "apply-advanced-functions-to-create-complex-derived-features",
        name: "Apply advanced functions to create complex derived features.",
        description: "This skill expression represents the ability to perform advanced feature engineering by creating new variables that capture sophisticated relationships in the data. It involves using functions that operate over a set of rows while retaining row-level detail. A professional proficient in this skill can apply a defined list of advanced functions, which includes: 1. Window Functions in SQL ( DENSE_RANK(), RANK(), ROW_NUMBER(), LEAD(), LAG(), SUM() OVER (PARTITION BY ...)), and 2. Complex transformations in Python/Pandas (using .apply() with custom lambda functions, or custom group aggregation or time-series-specific manipulations like rolling averages and cumulative sums). This moves beyond simple arithmetic to creating features like running totals, period-over-period changes, or user rankings.",
      },
      {
        id: "develop-reusable-and-parameterized-scripts-to-automate-routine-data-mani-5dae30",
        name: "Develop reusable and parameterized scripts to automate routine data manipulation, transformation, and cleansing workflows.",
        description: "This competency represents the ability to improve team efficiency and data quality by automating routine data processes. It involves developing well-documented, modular, and reusable scripts or stored procedures that can be executed repeatedly on new data with minimal modifications. This converts manual, one-off tasks into reliable, operational workflows. Specifically, this includes:\n Data Cleansing: Automating standard data cleaning steps to improve data quality.\n Data Transformation: Creating parameterized scripts that apply consistent logic to different datasets based on specified inputs (file names, date ranges). This improves efficiency and reduces manual errors.\n General Data Manipulation: Automating various data manipulation tasks to enhance team productivity. This can include data formatting, aggregation, and other processing operations.\n The automation can be achieved through various programming languages such as Python, R or SQL. In Python or R, this involves writing modular, resuable functions and scripts. In SQL, it involves creating stored procedures, views, or using common table expressions to organize and automate the data manipulation process. \n By automating these tasks, the skilled professional demonstrates ownership and makes a meaningful contribution to the team's outcomes.",
      },
      {
        id: "implement-programmatic-logic-to-handle-complex-conditional-transformations",
        name: "Implement programmatic logic to handle complex conditional transformations.",
        description: "This skill expression represents the ability to write code that systematically handles intricate, multi-layered business rules. It involves creating complex conditional statements that go beyond simple IF/THEN logic. A professional with this skill can implement nested CASE statements in SQL or use functions and mapping dictionaries in Python to create new variables based on multiple criteria. For example, they could create a 'customer_segment' column by applying a series of rules based on purchase frequency, monetary value, and recency.",
      },
    ],
  },
  {
    key: "data-presentation::intermediate",
    skillSlug: "data-presentation",
    skillName: "Data Presentation",
    level: "Intermediate",
    displayName: "Intermediate Data Presentation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-visual-design-principles-to-enhance-clarity-impact-and-narrative-i-4e6ecd",
        name: "Apply visual design principles to enhance clarity, impact, and narrative in visualizations.",
        description: "This competency represents the ability to refine and customize visualizations to maximize their clarity, impact, and narrative effectiveness. It involves applying a range of visual design principles and techniques, from basic formatting to advanced visual encoding, to guide audience attention and highlight key information. A skilled professional can perform a defined list of tasks, including:\n Formatting for Readability: Adding clear, descriptive titles and axis labels, using color intentionally to distinguish categories, and removing unnecessary visual clutter (e.g., excessive gridlines).\n Information Design: Improving data-ink ratio, using direct labeling instead of legends, and strategically placing annotations to call out key insights or data points.\n Visual Encoding: Applying techniques such as using color to highlight categories across multiple charts, adjusting the size or shape of marks to represent magnitude, and adding precise annotations and reference lines to pinpoint critical data points, trends, or statistical thresholds. This goes beyond default formatting and involves making active design choices to create clear, compelling narratives with data.",
      },
      {
        id: "design-a-compelling-narrative-structure-for-data-presentations-dashboard-73ebc7",
        name: "Design a compelling narrative structure for data presentations, dashboards, and reports.",
        description: "This competency represents the ability to structure data presentations, dashboards, and reports as a compelling narrative that guides the audience to a clear conclusion. This involves analyzing key insights and constructing a story arc with defined structural components:\n A Clear Beginning: Establishes the business context and the key question or problem being addressed.\n A Middle: Presents evidence and key findings in a logical and easy-to-follow sequence, building the narrative.\n An End: Provides a concise summary of the key takeaways and delivers a clear recommendation or call to action. \n This narrative design can apply to various presentation formats:\n Presentations/Slide Decks: Structuring content to guide the audience through a compelling storyline.\n Dashboards: Architecting the flow of information within a multi-worksheet or interactive dashboard to ensure a logical progression between visualizations.\n Reports: Structuring multi-page reports to create a clear narrative with distinct sections for context, analysis, and conclusions.\n This competency demonstrates the ability to not only present data but also to craft a persuasive argument that drives action.",
      },
      {
        id: "evaluate-and-select-the-optimal-visualization-type-to-communicate-a-spec-99c6b1",
        name: "Evaluate and select the optimal visualization type to communicate a specific analytical insight.",
        description: "This competency represents the ability to choose the most effective chart or graph to communicate a specific analytical insight. A skilled professional considers the nature of the data and the intended message to make this selection. They can evaluate the analytical goal (e.g., showing a comparison, distribution, relationship, or composition) and select the most appropriate visualization from a comprehensive range of options, including advanced chart types beyond the basics (e.g., waterfall chart, funnel chart, box plot, histogram, density plot, etc.). This competency goes beyond simply creating a chart; it involves understanding why a specific visualization is superior to others for conveying the point clearly, memorably, and effectively to the target audience. The professional can justify their choice by explaining how the selected visualization best represents the data and supports the analytical narrative.",
      },
    ],
  },
  {
    key: "data-quality::intermediate",
    skillSlug: "data-quality",
    skillName: "Data Quality",
    level: "Intermediate",
    displayName: "Intermediate Data Quality",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-comparison-and-auditing-techniques-to-identify-data-quality-issues",
        name: "Apply data comparison and auditing techniques to identify data quality issues.",
        description: "This competency represents the ability to systematically identify a wide range of data quality errors, from simple inconsistencies to complex integrity issues. It involves applying data comparison methods to check for discrepancies by comparing related data within or across datasets. This includes verifying that the same entity is represented identically in different places, such as comparing customer addresses across tables or ensuring product IDs in sales records exist in the product catalog. This competency also encompasses the ability to conduct a data auditing process to proactively discover more complex data integrity issues, including: \n Logical Inconsistencies (e.g., a shipping date before an order date)\n Cross-field Validation Errors (e.g., a city and state combination that doesn't exist)\n Subtle format variations that require advanced pattern matching techniques.",
      },
      {
        id: "design-and-implement-data-validation-rules-to-ensure-data-accuracy-and-validity",
        name: "Design and implement data validation rules to ensure data accuracy and validity.",
        description: "This competency represents the ability to ensure data quality by designing and implementing data validation rules based on business requirements. It involves analyzing project requirements to define and then programmatically implement various types of validation checks. An early career professional can perform the following validations:\n \n\n Range Checks: Ensuring a value falls within a specified range (e.g., age between 0 and 120).\n Format Checks: Verifying that a string matches a predefined pattern (e.g., phone number, email).\n Set Membership Checks: Confirming a value exists within an approved set (e.g., country code, status values).\n Pattern Matching: Using regular expressions (regex) to validate string formats (e.g., product SKU).\n Cross-field Logical Checks: Ensuring logical consistency across multiple fields (e.g., discount amount not exceeding sale price).\n \n\n The process includes translating business needs into a formal set of technical checks, executing the checks against a dataset, and typically producing output like a count of compliant vs. non-compliant records. This demonstrates ownership of the data quality standards for a dataset.",
      },
      {
        id: "analyze-data-lineage-to-perform-root-cause-analysis-of-quality-issues",
        name: "Analyze data lineage to perform root cause analysis of quality issues.",
        description: "This skill represents the ability to move beyond identifying errors to understanding their origin. It involves investigating the flow of data from its source to its current state to pinpoint where and why a data quality issue was introduced. A skilled professional can trace issues back to potential causes like a faulty data entry form, an error in an ETL script, or an upstream API change, allowing for a permanent fix rather than just a temporary patch.",
      },
      {
        id: "create-and-maintain-data-dictionaries-to-establish-data-quality-standards",
        name: "Create and maintain data dictionaries to establish data quality standards.",
        description: "This skill represents the ability to formally document the structure and rules of a dataset, which is a meaningful contribution to team alignment and governance. It involves creating a central document that defines each column in a dataset, including its business definition, data type, allowed values, and specific data quality or validation rules. This serves as a single source of truth for all users of the data.",
      },
      {
        id: "develop-automated-data-quality-dashboards-to-monitor-key-metrics-over-time",
        name: "Develop automated data quality dashboards to monitor key metrics over time.",
        description: "This skill represents the ability to create a sustainable, scalable system for tracking the health of a dataset. It involves using a BI tool (like Tableau or Power BI) or a programming library to build a dashboard that visualizes a defined list of core data quality KPIs, including: the percentage of null values, the count of duplicate records, the number of validation rule failures, and trend lines for these metrics over time. This provides a reusable, at-a-glance view of data health for the entire team.",
      },
    ],
  },
  {
    key: "data-storytelling::intermediate",
    skillSlug: "data-storytelling",
    skillName: "Data Storytelling",
    level: "Intermediate",
    displayName: "Intermediate Data Storytelling",
    careerBand: 1,
    expressions: [
      {
        id: "apply-visual-design-principles-to-enhance-clarity-impact-and-narrative-i-4e6ecd",
        name: "Apply visual design principles to enhance clarity, impact, and narrative in visualizations.",
        description: "This competency represents the ability to refine and customize visualizations to maximize their clarity, impact, and narrative effectiveness. It involves applying a range of visual design principles and techniques, from basic formatting to advanced visual encoding, to guide audience attention and highlight key information. A skilled professional can perform a defined list of tasks, including:\n Formatting for Readability: Adding clear, descriptive titles and axis labels, using color intentionally to distinguish categories, and removing unnecessary visual clutter (e.g., excessive gridlines).\n Information Design: Improving data-ink ratio, using direct labeling instead of legends, and strategically placing annotations to call out key insights or data points.\n Visual Encoding: Applying techniques such as using color to highlight categories across multiple charts, adjusting the size or shape of marks to represent magnitude, and adding precise annotations and reference lines to pinpoint critical data points, trends, or statistical thresholds. This goes beyond default formatting and involves making active design choices to create clear, compelling narratives with data.",
      },
      {
        id: "design-a-compelling-narrative-structure-for-data-presentations-dashboard-73ebc7",
        name: "Design a compelling narrative structure for data presentations, dashboards, and reports.",
        description: "This competency represents the ability to structure data presentations, dashboards, and reports as a compelling narrative that guides the audience to a clear conclusion. This involves analyzing key insights and constructing a story arc with defined structural components:\n A Clear Beginning: Establishes the business context and the key question or problem being addressed.\n A Middle: Presents evidence and key findings in a logical and easy-to-follow sequence, building the narrative.\n An End: Provides a concise summary of the key takeaways and delivers a clear recommendation or call to action. \n This narrative design can apply to various presentation formats:\n Presentations/Slide Decks: Structuring content to guide the audience through a compelling storyline.\n Dashboards: Architecting the flow of information within a multi-worksheet or interactive dashboard to ensure a logical progression between visualizations.\n Reports: Structuring multi-page reports to create a clear narrative with distinct sections for context, analysis, and conclusions.\n This competency demonstrates the ability to not only present data but also to craft a persuasive argument that drives action.",
      },
      {
        id: "evaluate-and-select-the-optimal-visualization-type-to-communicate-a-spec-99c6b1",
        name: "Evaluate and select the optimal visualization type to communicate a specific analytical insight.",
        description: "This competency represents the ability to choose the most effective chart or graph to communicate a specific analytical insight. A skilled professional considers the nature of the data and the intended message to make this selection. They can evaluate the analytical goal (e.g., showing a comparison, distribution, relationship, or composition) and select the most appropriate visualization from a comprehensive range of options, including advanced chart types beyond the basics (e.g., waterfall chart, funnel chart, box plot, histogram, density plot, etc.). This competency goes beyond simply creating a chart; it involves understanding why a specific visualization is superior to others for conveying the point clearly, memorably, and effectively to the target audience. The professional can justify their choice by explaining how the selected visualization best represents the data and supports the analytical narrative.",
      },
      {
        id: "implement-interactive-features-in-bi-tools-to-enable-guided-data-explora-76f79a",
        name: "Implement interactive features in BI tools to enable guided data exploration and analytical paths.",
        description: "This competency represents the ability to build interactive and dynamic dashboards that facilitate both guided exploration and storytelling with data. It involves implementing a range of interactive features within a Business Intelligence (BI) tool to create a user-friendly and insightful experience. This includes basic interactive elements like filters, parameters, and dynamic actions (e.g., clicking one chart filters another) to allow users to explore different facets of the data in a controlled manner. A skilled professional can also leverage more advanced techniques to guide users through a structured analytical journey. This includes:\n Drill-down Functionality: Enabling users to navigate from high-level summaries to granular details on demand.\n Dynamic Visibility: Controlling the display of dashboard elements based on user selections, creating a more focused and relevant experience.\n Parameter-Driven Controls: Empowering users to adjust calculation inputs and perform 'what-if' analyses, fostering deeper engagement with the data.\n The overarching goal is to design interactive dashboards that not only allow exploration but also support a narrative framework, ensuring a clear and insightful analytical path.",
      },
      {
        id: "translate-complex-statistical-model-outputs-into-simplified-interpretabl-829e1b",
        name: "Translate complex statistical model outputs into simplified, interpretable visualizations.",
        description: "This skill expression represents the ability to make the results of advanced analytics accessible to a non-technical audience. It involves the technical task of extracting key outputs from a statistical model (such as regression coefficients, feature importance scores from a machine learning model, or customer segment profiles from a clustering algorithm) and representing them in a simple, clear visual format that accurately communicates their meaning and business impact.",
      },
    ],
  },
  {
    key: "data-transformation::intermediate",
    skillSlug: "data-transformation",
    skillName: "Data Transformation",
    level: "Intermediate",
    displayName: "Intermediate Data Transformation",
    careerBand: 1,
    expressions: [
      {
        id: "develop-and-prepare-a-feature-set-for-predictive-modeling",
        name: "Develop and prepare a feature set for predictive modeling",
        description: "This competency represents the ability to prepare data for use in predictive modeling, encompassing all crucial steps from feature selection and engineering to encoding, scaling, and handling missing values. It involves:\n 1. Identifying and selecting relevant variables.\n 2. Feature engineering:\n Creating new predictors by applying a defined list of core techniques, including:\n Encoding categorical variables (Label Encoding, One-Hot Encoding, Multi-hot Encoding).\n Scaling or normalizing numeric features (Standardization, Min-Max Scaling) based on data distribution and model requirements.\n Creating interaction terms or polynomial features to capture non-linear relationships.\n Binning continuous variables into categories.\n Applying mathematical transformations (e.g., log, square root) for skewed data.\n Leveraging domain expertise for creating composite features.\n 3. Handling missing values through imputation.\n This competency demonstrates understanding of how to apply and select the correct data preparation techniques to ensure optimal performance and prevent overfitting and ensuring the model will generalize.",
      },
      {
        id: "define-and-enforce-data-schemas-for-transformation-pipelines",
        name: "Define and enforce data schemas for transformation pipelines",
        description: "This skill expression represents the ability to formally specify, validate, and enforce the structure and constraints of both input and output data at each stage of a transformation pipeline. A skilled professional uses schemas to 1. Document expected fields, data types, allowed values, and constraints (non-null, ranges, unique keys); 2. Validate incoming data against the input schema before processing, flagging or rejecting records that do not conform; 3. Ensure the output of each transformation step matches the defined output schema, providing guarantees for downstream processes; 4. Use schema definition tools or libraries (such as JSON Schema, Python’s Pydantic, or SQL DDL) to automate validation and documentation; 5. Facilitate collaboration by providing clear contracts between data engineering, analytics, and business teams.",
      },
      {
        id: "design-and-implement-multi-step-transformation-pipelines-for-data-preparation",
        name: "Design and implement multi-step transformation pipelines for data preparation.",
        description: "This skill expression represents the ability to create a logical, ordered sequence of transformations to prepare a dataset for analysis. It involves chaining multiple operations—such as imputation, outlier handling, encoding, and normalization—into a single, cohesive workflow or script. A skilled professional can analyze the raw data and the analytical goal to design a robust pipeline that correctly orders the steps (e.g., imputing missing values before scaling) to produce a clean, analysis-ready dataset.",
      },
      {
        id: "develop-reusable-and-parameterized-scripts-to-automate-routine-data-mani-5dae30",
        name: "Develop reusable and parameterized scripts to automate routine data manipulation, transformation, and cleansing workflows.",
        description: "This competency represents the ability to improve team efficiency and data quality by automating routine data processes. It involves developing well-documented, modular, and reusable scripts or stored procedures that can be executed repeatedly on new data with minimal modifications. This converts manual, one-off tasks into reliable, operational workflows. Specifically, this includes:\n Data Cleansing: Automating standard data cleaning steps to improve data quality.\n Data Transformation: Creating parameterized scripts that apply consistent logic to different datasets based on specified inputs (file names, date ranges). This improves efficiency and reduces manual errors.\n General Data Manipulation: Automating various data manipulation tasks to enhance team productivity. This can include data formatting, aggregation, and other processing operations.\n The automation can be achieved through various programming languages such as Python, R or SQL. In Python or R, this involves writing modular, resuable functions and scripts. In SQL, it involves creating stored procedures, views, or using common table expressions to organize and automate the data manipulation process. \n By automating these tasks, the skilled professional demonstrates ownership and makes a meaningful contribution to the team's outcomes.",
      },
      {
        id: "implement-programmatic-logic-to-handle-complex-conditional-transformations",
        name: "Implement programmatic logic to handle complex conditional transformations.",
        description: "This skill expression represents the ability to write code that systematically handles intricate, multi-layered business rules. It involves creating complex conditional statements that go beyond simple IF/THEN logic. A professional with this skill can implement nested CASE statements in SQL or use functions and mapping dictionaries in Python to create new variables based on multiple criteria. For example, they could create a 'customer_segment' column by applying a series of rules based on purchase frequency, monetary value, and recency.",
      },
    ],
  },
  {
    key: "data-validation::intermediate",
    skillSlug: "data-validation",
    skillName: "Data Validation",
    level: "Intermediate",
    displayName: "Intermediate Data Validation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-comparison-and-auditing-techniques-to-identify-data-quality-issues",
        name: "Apply data comparison and auditing techniques to identify data quality issues.",
        description: "This competency represents the ability to systematically identify a wide range of data quality errors, from simple inconsistencies to complex integrity issues. It involves applying data comparison methods to check for discrepancies by comparing related data within or across datasets. This includes verifying that the same entity is represented identically in different places, such as comparing customer addresses across tables or ensuring product IDs in sales records exist in the product catalog. This competency also encompasses the ability to conduct a data auditing process to proactively discover more complex data integrity issues, including: \n Logical Inconsistencies (e.g., a shipping date before an order date)\n Cross-field Validation Errors (e.g., a city and state combination that doesn't exist)\n Subtle format variations that require advanced pattern matching techniques.",
      },
      {
        id: "design-and-implement-data-validation-rules-to-ensure-data-accuracy-and-validity",
        name: "Design and implement data validation rules to ensure data accuracy and validity.",
        description: "This competency represents the ability to ensure data quality by designing and implementing data validation rules based on business requirements. It involves analyzing project requirements to define and then programmatically implement various types of validation checks. An early career professional can perform the following validations:\n \n\n Range Checks: Ensuring a value falls within a specified range (e.g., age between 0 and 120).\n Format Checks: Verifying that a string matches a predefined pattern (e.g., phone number, email).\n Set Membership Checks: Confirming a value exists within an approved set (e.g., country code, status values).\n Pattern Matching: Using regular expressions (regex) to validate string formats (e.g., product SKU).\n Cross-field Logical Checks: Ensuring logical consistency across multiple fields (e.g., discount amount not exceeding sale price).\n \n\n The process includes translating business needs into a formal set of technical checks, executing the checks against a dataset, and typically producing output like a count of compliant vs. non-compliant records. This demonstrates ownership of the data quality standards for a dataset.",
      },
      {
        id: "develop-automated-data-quality-dashboards-to-monitor-key-metrics-over-time",
        name: "Develop automated data quality dashboards to monitor key metrics over time.",
        description: "This skill represents the ability to create a sustainable, scalable system for tracking the health of a dataset. It involves using a BI tool (like Tableau or Power BI) or a programming library to build a dashboard that visualizes a defined list of core data quality KPIs, including: the percentage of null values, the count of duplicate records, the number of validation rule failures, and trend lines for these metrics over time. This provides a reusable, at-a-glance view of data health for the entire team.",
      },
    ],
  },
  {
    key: "descriptive-analytics::intermediate",
    skillSlug: "descriptive-analytics",
    skillName: "Descriptive Analytics",
    level: "Intermediate",
    displayName: "Intermediate Descriptive Analytics",
    careerBand: 1,
    expressions: [
      {
        id: "apply-aggregation-and-cross-tabulation-techniques-to-create-summary-data-59aceb",
        name: "Apply aggregation and cross-tabulation techniques to create summary datasets and analyze relationships between variables.",
        description: "This competency encompasses the ability to transform granular data into meaningful summaries and explore relationships between variables. It involves using grouping logic (like GROUP BY in SQL or groupby() in Pandas) along with aggregation functions (such as SUM, COUNT, AVG, MAX) to calculate summary statistics for different categories or business segments. This enables the creation of condensed datasets suitable for reporting and dashboarding. For example, an individual with this competency can summarize individual sales transactions to calculate total daily sales per region or product category, average session duration per marketing channel, or the number of employees per department.\n \n\n Furthermore, this competency includes applying cross-tabulation techniques (pivot tables or crosstabs) to analyze the relationships between categorical variables. This involves summarizing the interaction between two distinct categories by displaying the frequency or a summary statistic (like average sales) for every combination of their categories. For instance, one could create a table showing customer counts broken down by both region and marketing channel to explore the effectiveness of different marketing strategies across regions.",
      },
    ],
  },
  {
    key: "feature-engineering::intermediate",
    skillSlug: "feature-engineering",
    skillName: "Feature Engineering",
    level: "Intermediate",
    displayName: "Intermediate Feature Engineering",
    careerBand: 1,
    expressions: [
      {
        id: "develop-and-prepare-a-feature-set-for-predictive-modeling",
        name: "Develop and prepare a feature set for predictive modeling",
        description: "This competency represents the ability to prepare data for use in predictive modeling, encompassing all crucial steps from feature selection and engineering to encoding, scaling, and handling missing values. It involves:\n 1. Identifying and selecting relevant variables.\n 2. Feature engineering:\n Creating new predictors by applying a defined list of core techniques, including:\n Encoding categorical variables (Label Encoding, One-Hot Encoding, Multi-hot Encoding).\n Scaling or normalizing numeric features (Standardization, Min-Max Scaling) based on data distribution and model requirements.\n Creating interaction terms or polynomial features to capture non-linear relationships.\n Binning continuous variables into categories.\n Applying mathematical transformations (e.g., log, square root) for skewed data.\n Leveraging domain expertise for creating composite features.\n 3. Handling missing values through imputation.\n This competency demonstrates understanding of how to apply and select the correct data preparation techniques to ensure optimal performance and prevent overfitting and ensuring the model will generalize.",
      },
    ],
  },
  {
    key: "plot-graphics::intermediate",
    skillSlug: "plot-graphics",
    skillName: "Plot Graphics",
    level: "Intermediate",
    displayName: "Intermediate Plot Graphics",
    careerBand: 1,
    expressions: [
      {
        id: "apply-visual-design-principles-to-enhance-clarity-impact-and-narrative-i-4e6ecd",
        name: "Apply visual design principles to enhance clarity, impact, and narrative in visualizations.",
        description: "This competency represents the ability to refine and customize visualizations to maximize their clarity, impact, and narrative effectiveness. It involves applying a range of visual design principles and techniques, from basic formatting to advanced visual encoding, to guide audience attention and highlight key information. A skilled professional can perform a defined list of tasks, including:\n Formatting for Readability: Adding clear, descriptive titles and axis labels, using color intentionally to distinguish categories, and removing unnecessary visual clutter (e.g., excessive gridlines).\n Information Design: Improving data-ink ratio, using direct labeling instead of legends, and strategically placing annotations to call out key insights or data points.\n Visual Encoding: Applying techniques such as using color to highlight categories across multiple charts, adjusting the size or shape of marks to represent magnitude, and adding precise annotations and reference lines to pinpoint critical data points, trends, or statistical thresholds. This goes beyond default formatting and involves making active design choices to create clear, compelling narratives with data.",
      },
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
    ],
  },
  {
    key: "predictive-analytics::intermediate",
    skillSlug: "predictive-analytics",
    skillName: "Predictive Analytics",
    level: "Intermediate",
    displayName: "Intermediate Predictive Analytics",
    careerBand: 1,
    expressions: [
      {
        id: "construct-and-interpret-statistical-models-to-explain-relationships-betw-b3c77f",
        name: "Construct and interpret statistical models to explain relationships between variables and identify key drivers of predictions.",
        description: "This competency encompasses the ability to build and interpret statistical models, particularly regression models (both linear and logistic), to understand and explain the relationships between variables. It involves defining the model, fitting it to data using statistical software, and interpreting the output. A skilled professional can analyze the model summary to:\n Interpret Coefficients: Explain the change in the outcome variable for a one-unit change in a predictor, holding other predictors constant.\n Assess Statistical Significance: Use p-values to determine which predictors have a statistically significant relationship with the outcome, performing hypothesis testing within the model context.\n Evaluate Model Fit: Explain the R-squared value as the proportion of variance in the outcome explained by the model.\n Identify Key Drivers: Apply model-specific interpretation techniques to identify the most influential variables driving predictions. This includes examining coefficient magnitudes and signs in linear models and extracting feature importance scores from tree-based models (like Random Forest or Gradient Boosting).\n By combining these skills, a professional can translate complex model outputs into meaningful business insights, explaining not only the relationships between variables but also the key factors influencing predictions.",
      },
      {
        id: "develop-and-prepare-a-feature-set-for-predictive-modeling",
        name: "Develop and prepare a feature set for predictive modeling",
        description: "This competency represents the ability to prepare data for use in predictive modeling, encompassing all crucial steps from feature selection and engineering to encoding, scaling, and handling missing values. It involves:\n 1. Identifying and selecting relevant variables.\n 2. Feature engineering:\n Creating new predictors by applying a defined list of core techniques, including:\n Encoding categorical variables (Label Encoding, One-Hot Encoding, Multi-hot Encoding).\n Scaling or normalizing numeric features (Standardization, Min-Max Scaling) based on data distribution and model requirements.\n Creating interaction terms or polynomial features to capture non-linear relationships.\n Binning continuous variables into categories.\n Applying mathematical transformations (e.g., log, square root) for skewed data.\n Leveraging domain expertise for creating composite features.\n 3. Handling missing values through imputation.\n This competency demonstrates understanding of how to apply and select the correct data preparation techniques to ensure optimal performance and prevent overfitting and ensuring the model will generalize.",
      },
      {
        id: "apply-resampling-techniques-and-appropriate-metrics-to-evaluate-compare--08bc4a",
        name: "Apply resampling techniques and appropriate metrics to evaluate, compare, and select predictive models.",
        description: "This competency represents the ability to rigorously evaluate, compare, and select the optimal predictive model for a given problem. It involves applying robust resampling techniques to produce a reliable and unbiased estimate of a model's performance on unseen data, which is critical for preventing overfitting and ensuring the model will generalize. This is achieved by training multiple model types (e.g., logistic regression, random forest) on the same data using a consistent cross-validation strategy, such as K-Fold Cross-Validation. A professional can then compare the models using a defined list of problem-appropriate evaluation metrics. \n For classification problems, core metrics include: Accuracy, Precision, Recall, F1-Score, and AUC-ROC. \n For regression problems, core metrics include: Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.\n This competency also includes using resampling methods to assess model stability and estimate uncertainty. A professional can apply core resampling methods including cross-validation and bootstrapping to create confidence intervals for model coefficients or performance metrics. This entire process allows for a data-driven decision to select the best-performing and most reliable model for a specific business problem.",
      },
      {
        id: "design-a-predictive-analytics-project-by-framing-a-business-problem-and--cf4c93",
        name: "Design a predictive analytics project by framing a business problem and defining success metrics.",
        description: "This skill represents the ability to translate a vague business goal into a specific, measurable analytical project. It involves two key actions: 1. Framing the problem as a clear predictive task (e.g., classifying customers as 'likely to churn' vs. 'not likely'), and 2. Selecting the appropriate technical evaluation metric (e.g., accuracy, precision, F1-score) that aligns with the business objective (e.g., minimizing false negatives). This demonstrates ownership of the analytical strategy.",
      },
    ],
  },
  {
    key: "predictive-modeling::intermediate",
    skillSlug: "predictive-modeling",
    skillName: "Predictive Modeling",
    level: "Intermediate",
    displayName: "Intermediate Predictive Modeling",
    careerBand: 1,
    expressions: [
      {
        id: "develop-and-prepare-a-feature-set-for-predictive-modeling",
        name: "Develop and prepare a feature set for predictive modeling",
        description: "This competency represents the ability to prepare data for use in predictive modeling, encompassing all crucial steps from feature selection and engineering to encoding, scaling, and handling missing values. It involves:\n 1. Identifying and selecting relevant variables.\n 2. Feature engineering:\n Creating new predictors by applying a defined list of core techniques, including:\n Encoding categorical variables (Label Encoding, One-Hot Encoding, Multi-hot Encoding).\n Scaling or normalizing numeric features (Standardization, Min-Max Scaling) based on data distribution and model requirements.\n Creating interaction terms or polynomial features to capture non-linear relationships.\n Binning continuous variables into categories.\n Applying mathematical transformations (e.g., log, square root) for skewed data.\n Leveraging domain expertise for creating composite features.\n 3. Handling missing values through imputation.\n This competency demonstrates understanding of how to apply and select the correct data preparation techniques to ensure optimal performance and prevent overfitting and ensuring the model will generalize.",
      },
      {
        id: "apply-resampling-techniques-and-appropriate-metrics-to-evaluate-compare--08bc4a",
        name: "Apply resampling techniques and appropriate metrics to evaluate, compare, and select predictive models.",
        description: "This competency represents the ability to rigorously evaluate, compare, and select the optimal predictive model for a given problem. It involves applying robust resampling techniques to produce a reliable and unbiased estimate of a model's performance on unseen data, which is critical for preventing overfitting and ensuring the model will generalize. This is achieved by training multiple model types (e.g., logistic regression, random forest) on the same data using a consistent cross-validation strategy, such as K-Fold Cross-Validation. A professional can then compare the models using a defined list of problem-appropriate evaluation metrics. \n For classification problems, core metrics include: Accuracy, Precision, Recall, F1-Score, and AUC-ROC. \n For regression problems, core metrics include: Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.\n This competency also includes using resampling methods to assess model stability and estimate uncertainty. A professional can apply core resampling methods including cross-validation and bootstrapping to create confidence intervals for model coefficients or performance metrics. This entire process allows for a data-driven decision to select the best-performing and most reliable model for a specific business problem.",
      },
      {
        id: "apply-systematic-hyperparameter-tuning-techniques-to-optimize-model-performance",
        name: "Apply systematic hyperparameter tuning techniques to optimize model performance.",
        description: "This skill represents the ability to methodically search for the optimal settings for a chosen machine learning algorithm to maximize its predictive accuracy. It involves using established, automated search strategies to find the configuration that yields the best performance. A skilled professional can apply a defined list of core techniques, including: 1. Grid Search, which exhaustively tries all combinations of a given set of parameters, and 2. Randomized Search, which samples a fixed number of combinations from a parameter distribution.",
      },
      {
        id: "construct-train-and-compare-multiple-supervised-learning-models-to-estab-f9a2d3",
        name: "Construct, train, and compare multiple supervised learning models to establish a performance baseline and solve a prediction problem.",
        description: "This competency represents the ability to independently implement, train, and compare multiple supervised learning models to solve a given prediction problem. A skilled professional can apply various algorithmic approaches from a defined list of core algorithm families, which includes: Linear Models (Linear/Logistic Regression), Tree-based models (Decision Trees), Kernel based model (SVM), Ensembles (Random Forests, Gradient Boosting Machines, Bagging), and Instance-Based Methods (K-Nearest Neighbors). This involves constructing and training each model type, then comparing their performance using a consistent cross-validation strategy and appropriate evaluation metrics, to establish a performance baseline and make a data-driven decision about the most suitable model architecture for the problem.",
      },
      {
        id: "design-a-predictive-analytics-project-by-framing-a-business-problem-and--cf4c93",
        name: "Design a predictive analytics project by framing a business problem and defining success metrics.",
        description: "This skill represents the ability to translate a vague business goal into a specific, measurable analytical project. It involves two key actions: 1. Framing the problem as a clear predictive task (e.g., classifying customers as 'likely to churn' vs. 'not likely'), and 2. Selecting the appropriate technical evaluation metric (e.g., accuracy, precision, F1-score) that aligns with the business objective (e.g., minimizing false negatives). This demonstrates ownership of the analytical strategy.",
      },
      {
        id: "frame-a-business-problem-as-a-supervised-learning-task-by-defining-the-t-8cbdcd",
        name: "Frame a business problem as a supervised learning task by defining the target variable and selecting the appropriate model type.",
        description: "This skill represents the critical first step of translating a business need into a machine learning problem. It involves analyzing the business objective to: 1. Identify and isolate the specific target variable to be predicted, and 2. Select the correct modeling framework, choosing between regression (for predicting a continuous value like revenue) and classification (for predicting a categorical outcome like 'churn' or 'no churn'). This demonstrates the ability to structure an analytical approach.",
      },
    ],
  },
  {
    key: "probability-and-statistics::intermediate",
    skillSlug: "probability-and-statistics",
    skillName: "Probability And Statistics",
    level: "Intermediate",
    displayName: "Intermediate Probability And Statistics",
    careerBand: 1,
    expressions: [
      {
        id: "construct-and-interpret-statistical-models-to-explain-relationships-betw-b3c77f",
        name: "Construct and interpret statistical models to explain relationships between variables and identify key drivers of predictions.",
        description: "This competency encompasses the ability to build and interpret statistical models, particularly regression models (both linear and logistic), to understand and explain the relationships between variables. It involves defining the model, fitting it to data using statistical software, and interpreting the output. A skilled professional can analyze the model summary to:\n Interpret Coefficients: Explain the change in the outcome variable for a one-unit change in a predictor, holding other predictors constant.\n Assess Statistical Significance: Use p-values to determine which predictors have a statistically significant relationship with the outcome, performing hypothesis testing within the model context.\n Evaluate Model Fit: Explain the R-squared value as the proportion of variance in the outcome explained by the model.\n Identify Key Drivers: Apply model-specific interpretation techniques to identify the most influential variables driving predictions. This includes examining coefficient magnitudes and signs in linear models and extracting feature importance scores from tree-based models (like Random Forest or Gradient Boosting).\n By combining these skills, a professional can translate complex model outputs into meaningful business insights, explaining not only the relationships between variables but also the key factors influencing predictions.",
      },
      {
        id: "interpret-the-outputs-of-hypothesis-tests-to-make-statistically-sound-decisions",
        name: "Interpret the outputs of hypothesis tests to make statistically sound decisions.",
        description: "This competency represents the ability to interpret the results of standard hypothesis tests (t-test, ANOVA, chi-square test, proportion test) and make informed statistical decisions. It involves more than simply running the test; it includes the ability to understand and explain the key outputs. A professional can:\n Determine statistical significance: Compare the calculated p-value to a given significance level (alpha) and correctly state whether the result is statistically significant. \n Interpret confidence intervals: Articulate the practical meaning of a confidence interval in the context of the data (e.g., 'We are 95% confident that...').\n Understand test statistics: Recognize the role of the test statistic as a measure of the deviation of the observed data from what would be expected under the null hypothesis.\n Make statistical decisions: Based on the p-value and alpha, make a clear decision to reject or fail to reject the null hypothesis, following standard statistical procedures.",
      },
      {
        id: "apply-bayesian-inference-methods-to-estimate-parameters-quantify-uncerta-809bfb",
        name: "Apply Bayesian inference methods to estimate parameters, quantify uncertainty, and make probabilistic statements.",
        description: "This competency represents the ability to apply Bayesian methods to analyze data, quantify uncertainty, and make probabilistic statements. It involves specifying prior distributions for parameters, combining them with the likelihood of observed data to generate posterior distributions, and constructing credible intervals to provide a range of plausible parameter values. A skilled professional can analyze posterior distributions to calculate probabilities, such as the probability of a parameter exceeding a certain threshold, and apply these methods to business problems like A/B testing to compare groups and determine the probability that one group outperforms another. This includes using various Bayesian models, such as Beta-Binomial models for conversion rates, and interpreting results in a clear and actionable way for business insights. It also involves understanding and applying core Bayesian concepts like prior and posterior distributions, likelihood functions, and credible intervals.",
      },
      {
        id: "apply-model-selection-criteria-to-evaluate-and-compare-competing-statist-59a64d",
        name: "Apply model selection criteria to evaluate and compare competing statistical models.",
        description: "This skill expression represents the ability to objectively choose the best model from a set of candidates. It involves using information criteria to balance model fit against model complexity. A professional proficient in this skill can calculate and interpret a defined list of core criteria, including: goodness of fit measures such as Bayesian information criterion, Akaike information criterion, Kolmogorov-Smirnov test, or splitting the dataset into train-test split for estimating generalized performance.",
      },
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
      {
        id: "apply-resampling-techniques-and-appropriate-metrics-to-evaluate-compare--08bc4a",
        name: "Apply resampling techniques and appropriate metrics to evaluate, compare, and select predictive models.",
        description: "This competency represents the ability to rigorously evaluate, compare, and select the optimal predictive model for a given problem. It involves applying robust resampling techniques to produce a reliable and unbiased estimate of a model's performance on unseen data, which is critical for preventing overfitting and ensuring the model will generalize. This is achieved by training multiple model types (e.g., logistic regression, random forest) on the same data using a consistent cross-validation strategy, such as K-Fold Cross-Validation. A professional can then compare the models using a defined list of problem-appropriate evaluation metrics. \n For classification problems, core metrics include: Accuracy, Precision, Recall, F1-Score, and AUC-ROC. \n For regression problems, core metrics include: Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.\n This competency also includes using resampling methods to assess model stability and estimate uncertainty. A professional can apply core resampling methods including cross-validation and bootstrapping to create confidence intervals for model coefficients or performance metrics. This entire process allows for a data-driven decision to select the best-performing and most reliable model for a specific business problem.",
      },
      {
        id: "construct-and-interpret-generalized-linear-models-glms-for-modeling-non--47e902",
        name: "Construct and interpret generalized linear models (GLMs) for modeling non-normal outcome variables.",
        description: "This skill expression represents the ability to model outcomes that are not continuous or normally distributed. A skilled professional can independently select and build the appropriate GLM, with a core list including: 1. Logistic Regression for binary outcomes (e.g., churn/no churn, win/loss), and 2. Poisson Regression for count data (e.g., number of purchases, number of clicks).",
      },
      {
        id: "design-statistically-valid-experiments-using-power-analysis-to-determine-8d4e80",
        name: "Design statistically valid experiments using power analysis to determine required sample size.",
        description: "This competency represents the ability to proactively plan and design statistically sound experiments by determining the necessary sample size. It involves a formal process of power analysis to calculate the minimum number of participants or observations required to reliably detect a predetermined effect size. This calculation considers key factors such as the desired statistical power (typically 80%), the significance level (alpha, often set at 0.05), and the expected effect size. Performing power analysis before conducting an experiment prevents running studies that are too small to yield conclusive results, ensuring efficient resource allocation and increasing the likelihood of detecting meaningful effects. This skill demonstrates ownership of the entire analytical lifecycle and is critical for the design of effective experiments, including A/B tests and other controlled studies.",
      },
    ],
  },
  {
    key: "reconciliation::intermediate",
    skillSlug: "reconciliation",
    skillName: "Reconciliation",
    level: "Intermediate",
    displayName: "Intermediate Reconciliation",
    careerBand: 1,
    expressions: [
      {
        id: "apply-data-comparison-and-auditing-techniques-to-identify-data-quality-issues",
        name: "Apply data comparison and auditing techniques to identify data quality issues.",
        description: "This competency represents the ability to systematically identify a wide range of data quality errors, from simple inconsistencies to complex integrity issues. It involves applying data comparison methods to check for discrepancies by comparing related data within or across datasets. This includes verifying that the same entity is represented identically in different places, such as comparing customer addresses across tables or ensuring product IDs in sales records exist in the product catalog. This competency also encompasses the ability to conduct a data auditing process to proactively discover more complex data integrity issues, including: \n Logical Inconsistencies (e.g., a shipping date before an order date)\n Cross-field Validation Errors (e.g., a city and state combination that doesn't exist)\n Subtle format variations that require advanced pattern matching techniques.",
      },
    ],
  },
  {
    key: "regression::intermediate",
    skillSlug: "regression",
    skillName: "Regression",
    level: "Intermediate",
    displayName: "Intermediate Regression",
    careerBand: 1,
    expressions: [
      {
        id: "construct-and-interpret-statistical-models-to-explain-relationships-betw-b3c77f",
        name: "Construct and interpret statistical models to explain relationships between variables and identify key drivers of predictions.",
        description: "This competency encompasses the ability to build and interpret statistical models, particularly regression models (both linear and logistic), to understand and explain the relationships between variables. It involves defining the model, fitting it to data using statistical software, and interpreting the output. A skilled professional can analyze the model summary to:\n Interpret Coefficients: Explain the change in the outcome variable for a one-unit change in a predictor, holding other predictors constant.\n Assess Statistical Significance: Use p-values to determine which predictors have a statistically significant relationship with the outcome, performing hypothesis testing within the model context.\n Evaluate Model Fit: Explain the R-squared value as the proportion of variance in the outcome explained by the model.\n Identify Key Drivers: Apply model-specific interpretation techniques to identify the most influential variables driving predictions. This includes examining coefficient magnitudes and signs in linear models and extracting feature importance scores from tree-based models (like Random Forest or Gradient Boosting).\n By combining these skills, a professional can translate complex model outputs into meaningful business insights, explaining not only the relationships between variables but also the key factors influencing predictions.",
      },
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
      {
        id: "apply-resampling-techniques-and-appropriate-metrics-to-evaluate-compare--08bc4a",
        name: "Apply resampling techniques and appropriate metrics to evaluate, compare, and select predictive models.",
        description: "This competency represents the ability to rigorously evaluate, compare, and select the optimal predictive model for a given problem. It involves applying robust resampling techniques to produce a reliable and unbiased estimate of a model's performance on unseen data, which is critical for preventing overfitting and ensuring the model will generalize. This is achieved by training multiple model types (e.g., logistic regression, random forest) on the same data using a consistent cross-validation strategy, such as K-Fold Cross-Validation. A professional can then compare the models using a defined list of problem-appropriate evaluation metrics. \n For classification problems, core metrics include: Accuracy, Precision, Recall, F1-Score, and AUC-ROC. \n For regression problems, core metrics include: Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.\n This competency also includes using resampling methods to assess model stability and estimate uncertainty. A professional can apply core resampling methods including cross-validation and bootstrapping to create confidence intervals for model coefficients or performance metrics. This entire process allows for a data-driven decision to select the best-performing and most reliable model for a specific business problem.",
      },
      {
        id: "apply-variable-transformations-to-address-violations-of-model-assumptions",
        name: "Apply variable transformations to address violations of model assumptions.",
        description: "This skill represents the ability to actively improve a model when its initial assumptions are not met. It involves applying mathematical transformations to variables to correct for issues like non-linearity or non-constant variance. A skilled professional can apply a defined list of common transformations, including: using a Log, Square Root, or Box-Cox transformation on the dependent or independent variables to improve the model's fit and validity.",
      },
    ],
  },
  {
    key: "statistical-reporting::intermediate",
    skillSlug: "statistical-reporting",
    skillName: "Statistical Reporting",
    level: "Intermediate",
    displayName: "Intermediate Statistical Reporting",
    careerBand: 1,
    expressions: [
      {
        id: "apply-standard-statistical-tests-for-hypothesis-testing",
        name: "Apply standard statistical tests for hypothesis testing.",
        description: "This competency represents the ability to formulate and execute common hypothesis tests to draw statistically sound inferences from data. This includes:\n \n\n Formulating Hypotheses: Clearly defining null and alternative hypotheses based on the business question.\n Preparing Data: Appropriately formatting and cleaning the data for the chosen statistical test.\n Test Selection and Execution: Selecting and applying the correct statistical test using either standard software functions or statistical library functions in programming languages. Common tests include:\n \n\n T-test: Comparing the means of two groups (e.g., A/B test results, distinct populations).\n Chi-Square Test: Comparing proportions between two or more groups or assessing associations between categorical variables (e.g., analyzing conversion rates or survey responses across groups).\n \n\n Interpretation: Accurately interpreting test results, specifically the p-value, to draw conclusions about the hypotheses in the context of the business problem.",
      },
    ],
  },
  {
    key: "statistical-tests::intermediate",
    skillSlug: "statistical-tests",
    skillName: "Statistical Tests",
    level: "Intermediate",
    displayName: "Intermediate Statistical Tests",
    careerBand: 1,
    expressions: [
      {
        id: "apply-standard-statistical-tests-for-hypothesis-testing",
        name: "Apply standard statistical tests for hypothesis testing.",
        description: "This competency represents the ability to formulate and execute common hypothesis tests to draw statistically sound inferences from data. This includes:\n \n\n Formulating Hypotheses: Clearly defining null and alternative hypotheses based on the business question.\n Preparing Data: Appropriately formatting and cleaning the data for the chosen statistical test.\n Test Selection and Execution: Selecting and applying the correct statistical test using either standard software functions or statistical library functions in programming languages. Common tests include:\n \n\n T-test: Comparing the means of two groups (e.g., A/B test results, distinct populations).\n Chi-Square Test: Comparing proportions between two or more groups or assessing associations between categorical variables (e.g., analyzing conversion rates or survey responses across groups).\n \n\n Interpretation: Accurately interpreting test results, specifically the p-value, to draw conclusions about the hypotheses in the context of the business problem.",
      },
      {
        id: "construct-and-interpret-statistical-models-to-explain-relationships-betw-b3c77f",
        name: "Construct and interpret statistical models to explain relationships between variables and identify key drivers of predictions.",
        description: "This competency encompasses the ability to build and interpret statistical models, particularly regression models (both linear and logistic), to understand and explain the relationships between variables. It involves defining the model, fitting it to data using statistical software, and interpreting the output. A skilled professional can analyze the model summary to:\n Interpret Coefficients: Explain the change in the outcome variable for a one-unit change in a predictor, holding other predictors constant.\n Assess Statistical Significance: Use p-values to determine which predictors have a statistically significant relationship with the outcome, performing hypothesis testing within the model context.\n Evaluate Model Fit: Explain the R-squared value as the proportion of variance in the outcome explained by the model.\n Identify Key Drivers: Apply model-specific interpretation techniques to identify the most influential variables driving predictions. This includes examining coefficient magnitudes and signs in linear models and extracting feature importance scores from tree-based models (like Random Forest or Gradient Boosting).\n By combining these skills, a professional can translate complex model outputs into meaningful business insights, explaining not only the relationships between variables but also the key factors influencing predictions.",
      },
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
      {
        id: "apply-statistical-correction-methods-to-control-for-the-multiple-compari-0bc8be",
        name: "Apply statistical correction methods to control for the multiple comparisons problem.",
        description: "This skill represents the ability to maintain statistical rigor when conducting multiple simultaneous hypothesis tests (e.g., in A/B/n testing or when analyzing many metrics at once). It involves understanding the inflated risk of false positives (Type I errors) that arises when performing multiple comparisons and applying appropriate statistical adjustments to control this risk. A skilled professional can apply core correction methods to the significance threshold (p-value). These methods include:\n 1. The Bonferroni correction: A simple and conservative approach that divides the desired alpha level by the number of tests.\n 2. False Discovery Rate (FDR) control: Methods like the Benjamini-Hochberg procedure, which offer more power (less conservative) while still controlling the expected proportion of false discoveries among rejected hypotheses. \n Applying these correction methods ensures that the overall Type I error rate is controlled and that the results of multiple hypothesis tests are interpreted reliably.",
      },
      {
        id: "design-statistically-valid-experiments-using-power-analysis-to-determine-8d4e80",
        name: "Design statistically valid experiments using power analysis to determine required sample size.",
        description: "This competency represents the ability to proactively plan and design statistically sound experiments by determining the necessary sample size. It involves a formal process of power analysis to calculate the minimum number of participants or observations required to reliably detect a predetermined effect size. This calculation considers key factors such as the desired statistical power (typically 80%), the significance level (alpha, often set at 0.05), and the expected effect size. Performing power analysis before conducting an experiment prevents running studies that are too small to yield conclusive results, ensuring efficient resource allocation and increasing the likelihood of detecting meaningful effects. This skill demonstrates ownership of the entire analytical lifecycle and is critical for the design of effective experiments, including A/B tests and other controlled studies.",
      },
      {
        id: "perform-post-hoc-analysis-following-a-significant-multi-group-test-result",
        name: "Perform post-hoc analysis following a significant multi-group test result.",
        description: "This skill expression represents the ability to conduct a complete analysis when comparing more than two groups. After an omnibus test like ANOVA indicates that a significant difference exists somewhere among the groups, this skill involves applying a follow-up (post-hoc) test to determine exactly which specific pairs of groups are different from each other. A professional with this skill can apply a standard method like Tukey's Honest Significant Difference (HSD) test to provide specific, actionable insights.",
      },
      {
        id: "select-and-apply-the-appropriate-statistical-test-for-comparing-multiple-2085b2",
        name: "Select and apply the appropriate statistical test for comparing multiple groups or non-normal data.",
        description: "This skill expression represents the ability to independently choose the correct hypothesis test based on the experimental design and data characteristics. It involves moving beyond basic two-group tests to apply a defined list of advanced tests, including: 1. Analysis of Variance (ANOVA) to compare the means of three or more groups, and 2. Non-parametric tests (like Mann-Whitney U or Kruskal-Wallis) when the assumptions of parametric tests (e.g., normality) are not met.",
      },
    ],
  },
  {
    key: "statistical-visualization::intermediate",
    skillSlug: "statistical-visualization",
    skillName: "Statistical Visualization",
    level: "Intermediate",
    displayName: "Intermediate Statistical Visualization",
    careerBand: 1,
    expressions: [
      {
        id: "apply-visual-design-principles-to-enhance-clarity-impact-and-narrative-i-4e6ecd",
        name: "Apply visual design principles to enhance clarity, impact, and narrative in visualizations.",
        description: "This competency represents the ability to refine and customize visualizations to maximize their clarity, impact, and narrative effectiveness. It involves applying a range of visual design principles and techniques, from basic formatting to advanced visual encoding, to guide audience attention and highlight key information. A skilled professional can perform a defined list of tasks, including:\n Formatting for Readability: Adding clear, descriptive titles and axis labels, using color intentionally to distinguish categories, and removing unnecessary visual clutter (e.g., excessive gridlines).\n Information Design: Improving data-ink ratio, using direct labeling instead of legends, and strategically placing annotations to call out key insights or data points.\n Visual Encoding: Applying techniques such as using color to highlight categories across multiple charts, adjusting the size or shape of marks to represent magnitude, and adding precise annotations and reference lines to pinpoint critical data points, trends, or statistical thresholds. This goes beyond default formatting and involves making active design choices to create clear, compelling narratives with data.",
      },
      {
        id: "evaluate-and-select-the-optimal-visualization-type-to-communicate-a-spec-99c6b1",
        name: "Evaluate and select the optimal visualization type to communicate a specific analytical insight.",
        description: "This competency represents the ability to choose the most effective chart or graph to communicate a specific analytical insight. A skilled professional considers the nature of the data and the intended message to make this selection. They can evaluate the analytical goal (e.g., showing a comparison, distribution, relationship, or composition) and select the most appropriate visualization from a comprehensive range of options, including advanced chart types beyond the basics (e.g., waterfall chart, funnel chart, box plot, histogram, density plot, etc.). This competency goes beyond simply creating a chart; it involves understanding why a specific visualization is superior to others for conveying the point clearly, memorably, and effectively to the target audience. The professional can justify their choice by explaining how the selected visualization best represents the data and supports the analytical narrative.",
      },
      {
        id: "select-and-apply-advanced-plots-to-compare-data-distributions-across-mul-aded68",
        name: "Select and apply advanced plots to compare data distributions across multiple groups.",
        description: "This skill represents the ability to move beyond basic histograms to use more information-rich plots for comparing distributions. It involves choosing the appropriate plot to show differences in shape, spread, and central tendency. A skilled professional can implement and interpret a defined list of core advanced distribution plots, including: 1. Violin Plots, which combine a box plot with a density plot, and 2. Ridgeline Plots, which are effective for visualizing changes in distribution over time or across many categories.",
      },
    ],
  },
  {
    key: "supervised-learning::intermediate",
    skillSlug: "supervised-learning",
    skillName: "Supervised Learning",
    level: "Intermediate",
    displayName: "Intermediate Supervised Learning",
    careerBand: 1,
    expressions: [
      {
        id: "construct-and-interpret-statistical-models-to-explain-relationships-betw-b3c77f",
        name: "Construct and interpret statistical models to explain relationships between variables and identify key drivers of predictions.",
        description: "This competency encompasses the ability to build and interpret statistical models, particularly regression models (both linear and logistic), to understand and explain the relationships between variables. It involves defining the model, fitting it to data using statistical software, and interpreting the output. A skilled professional can analyze the model summary to:\n Interpret Coefficients: Explain the change in the outcome variable for a one-unit change in a predictor, holding other predictors constant.\n Assess Statistical Significance: Use p-values to determine which predictors have a statistically significant relationship with the outcome, performing hypothesis testing within the model context.\n Evaluate Model Fit: Explain the R-squared value as the proportion of variance in the outcome explained by the model.\n Identify Key Drivers: Apply model-specific interpretation techniques to identify the most influential variables driving predictions. This includes examining coefficient magnitudes and signs in linear models and extracting feature importance scores from tree-based models (like Random Forest or Gradient Boosting).\n By combining these skills, a professional can translate complex model outputs into meaningful business insights, explaining not only the relationships between variables but also the key factors influencing predictions.",
      },
      {
        id: "develop-and-prepare-a-feature-set-for-predictive-modeling",
        name: "Develop and prepare a feature set for predictive modeling",
        description: "This competency represents the ability to prepare data for use in predictive modeling, encompassing all crucial steps from feature selection and engineering to encoding, scaling, and handling missing values. It involves:\n 1. Identifying and selecting relevant variables.\n 2. Feature engineering:\n Creating new predictors by applying a defined list of core techniques, including:\n Encoding categorical variables (Label Encoding, One-Hot Encoding, Multi-hot Encoding).\n Scaling or normalizing numeric features (Standardization, Min-Max Scaling) based on data distribution and model requirements.\n Creating interaction terms or polynomial features to capture non-linear relationships.\n Binning continuous variables into categories.\n Applying mathematical transformations (e.g., log, square root) for skewed data.\n Leveraging domain expertise for creating composite features.\n 3. Handling missing values through imputation.\n This competency demonstrates understanding of how to apply and select the correct data preparation techniques to ensure optimal performance and prevent overfitting and ensuring the model will generalize.",
      },
      {
        id: "apply-resampling-techniques-and-appropriate-metrics-to-evaluate-compare--08bc4a",
        name: "Apply resampling techniques and appropriate metrics to evaluate, compare, and select predictive models.",
        description: "This competency represents the ability to rigorously evaluate, compare, and select the optimal predictive model for a given problem. It involves applying robust resampling techniques to produce a reliable and unbiased estimate of a model's performance on unseen data, which is critical for preventing overfitting and ensuring the model will generalize. This is achieved by training multiple model types (e.g., logistic regression, random forest) on the same data using a consistent cross-validation strategy, such as K-Fold Cross-Validation. A professional can then compare the models using a defined list of problem-appropriate evaluation metrics. \n For classification problems, core metrics include: Accuracy, Precision, Recall, F1-Score, and AUC-ROC. \n For regression problems, core metrics include: Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.\n This competency also includes using resampling methods to assess model stability and estimate uncertainty. A professional can apply core resampling methods including cross-validation and bootstrapping to create confidence intervals for model coefficients or performance metrics. This entire process allows for a data-driven decision to select the best-performing and most reliable model for a specific business problem.",
      },
      {
        id: "construct-train-and-compare-multiple-supervised-learning-models-to-estab-f9a2d3",
        name: "Construct, train, and compare multiple supervised learning models to establish a performance baseline and solve a prediction problem.",
        description: "This competency represents the ability to independently implement, train, and compare multiple supervised learning models to solve a given prediction problem. A skilled professional can apply various algorithmic approaches from a defined list of core algorithm families, which includes: Linear Models (Linear/Logistic Regression), Tree-based models (Decision Trees), Kernel based model (SVM), Ensembles (Random Forests, Gradient Boosting Machines, Bagging), and Instance-Based Methods (K-Nearest Neighbors). This involves constructing and training each model type, then comparing their performance using a consistent cross-validation strategy and appropriate evaluation metrics, to establish a performance baseline and make a data-driven decision about the most suitable model architecture for the problem.",
      },
    ],
  },
  {
    key: "data-model::foundational",
    skillSlug: "data-model",
    skillName: "Data Model",
    level: "Foundational",
    displayName: "Foundational Data Model",
    careerBand: 2,
    expressions: [
      {
        id: "distinguish-between-transactional-oltp-and-analytical-olap-data-modeling-e879f9",
        name: "Distinguish between transactional (OLTP) and analytical (OLAP) data modeling approaches.",
        description: "This skill represents a deeper, strategic understanding of data modeling. It involves explaining the fundamental differences between two major modeling paradigms. A skilled professional can articulate that Online Transaction Processing (OLTP) models are normalized to optimize for fast write operations and data integrity, while Online Analytical Processing (OLAP) models are denormalized (like a star schema) to optimize for fast read and aggregation queries.",
      },
    ],
  },
  {
    key: "sampling-statistics::foundational",
    skillSlug: "sampling-statistics",
    skillName: "Sampling Statistics",
    level: "Foundational",
    displayName: "Foundational Sampling Statistics",
    careerBand: 2,
    expressions: [
      {
        id: "analyze-potential-sources-of-sampling-bias-in-a-data-collection-process",
        name: "Analyze potential sources of sampling bias in a data collection process.",
        description: "This skill represents the ability to apply critical thinking to the practical realities of data collection. It involves identifying and explaining how real-world issues can undermine the validity of a theoretically sound sampling method. A skilled professional can identify a defined list of common biases, including: 1. Selection Bias (when the sampling method systematically excludes parts of the population), 2. Non-response Bias (when people who respond are different from those who don't), and 3. Undercoverage (when the sampling frame doesn't include everyone in the population).",
      },
    ],
  },
  {
    key: "supervised-learning::foundational",
    skillSlug: "supervised-learning",
    skillName: "Supervised Learning",
    level: "Foundational",
    displayName: "Foundational Supervised Learning",
    careerBand: 2,
    expressions: [
      {
        id: "understand-the-fundamental-concepts-of-supervised-learning",
        name: "Understand the fundamental concepts of supervised learning",
        description: "This skill expression involves understanding the fundamental concepts of supervised learning. It involves understanding supervised learning is a machine learning approach where algorithms are trained on labeled datasets, meaning each input is paired with a correct output, to learn the relationship between them and make predictions on new data. The process involves selecting a hypothesis space (the set of possible models), searching for the best parameters that minimize prediction error, and iteratively adjusting the model based on feedback from the data—a process guided by optimization techniques like gradient descent or C4 or CART algorithm as in the case of decision trees. Concepts like the VC dimension help quantify the capacity of a model to generalize beyond the training data, balancing complexity and performance. A skilled data analytics professional should understand these principles, including how to prepare data, choose and evaluate models, avoid overfitting, and interpret results to ensure robust, actionable insights.",
      },
    ],
  },
  {
    key: "time-series-analysis-and-forecasting::beginner",
    skillSlug: "time-series-analysis-and-forecasting",
    skillName: "Time Series Analysis And Forecasting",
    level: "Beginner",
    displayName: "Beginner Time Series Analysis And Forecasting",
    careerBand: 2,
    expressions: [
      {
        id: "apply-statistical-tests-and-transformations-to-achieve-stationarity-in-a-cb9140",
        name: "Apply statistical tests and transformations to achieve stationarity in a time series.",
        description: "This skill represents the ability to prepare a time series for modeling by ensuring its statistical properties are constant over time. It involves a defined, two-step process: 1. Using a formal statistical test, such as the Augmented Dickey-Fuller (ADF) test, to determine if a series is non-stationary, and 2. Applying transformations, most commonly differencing (calculating the change from one period to the next), to make the series stationary, which is a key assumption for many forecasting models.",
      },
      {
        id: "apply-time-series-decomposition-techniques-to-identify-trend-seasonality-60b1d4",
        name: "Apply time series decomposition techniques to identify trend, seasonality, and residual components.",
        description: "This skill represents the ability to break down a time series into its fundamental constituent parts to understand its underlying structure. It involves applying statistical methods (like additive or multiplicative decomposition) to separate the signal into three distinct components: 1. The Trend (the long-term direction), 2. The Seasonality (the repeating, cyclical patterns), and 3. The Residuals (the random, unexplained noise). This is a critical first step in any formal time series analysis.",
      },
    ],
  },
  {
    key: "a/b-testing::intermediate",
    skillSlug: "a/b-testing",
    skillName: "A/B Testing",
    level: "Intermediate",
    displayName: "Intermediate A/B Testing",
    careerBand: 2,
    expressions: [
      {
        id: "apply-statistical-correction-methods-to-control-for-the-multiple-compari-0bc8be",
        name: "Apply statistical correction methods to control for the multiple comparisons problem.",
        description: "This skill represents the ability to maintain statistical rigor when conducting multiple simultaneous hypothesis tests (e.g., in A/B/n testing or when analyzing many metrics at once). It involves understanding the inflated risk of false positives (Type I errors) that arises when performing multiple comparisons and applying appropriate statistical adjustments to control this risk. A skilled professional can apply core correction methods to the significance threshold (p-value). These methods include:\n 1. The Bonferroni correction: A simple and conservative approach that divides the desired alpha level by the number of tests.\n 2. False Discovery Rate (FDR) control: Methods like the Benjamini-Hochberg procedure, which offer more power (less conservative) while still controlling the expected proportion of false discoveries among rejected hypotheses. \n Applying these correction methods ensures that the overall Type I error rate is controlled and that the results of multiple hypothesis tests are interpreted reliably.",
      },
      {
        id: "design-statistically-valid-experiments-using-power-analysis-to-determine-8d4e80",
        name: "Design statistically valid experiments using power analysis to determine required sample size.",
        description: "This competency represents the ability to proactively plan and design statistically sound experiments by determining the necessary sample size. It involves a formal process of power analysis to calculate the minimum number of participants or observations required to reliably detect a predetermined effect size. This calculation considers key factors such as the desired statistical power (typically 80%), the significance level (alpha, often set at 0.05), and the expected effect size. Performing power analysis before conducting an experiment prevents running studies that are too small to yield conclusive results, ensuring efficient resource allocation and increasing the likelihood of detecting meaningful effects. This skill demonstrates ownership of the entire analytical lifecycle and is critical for the design of effective experiments, including A/B tests and other controlled studies.",
      },
    ],
  },
  {
    key: "anomaly-detection::intermediate",
    skillSlug: "anomaly-detection",
    skillName: "Anomaly Detection",
    level: "Intermediate",
    displayName: "Intermediate Anomaly Detection",
    careerBand: 2,
    expressions: [
      {
        id: "construct-and-apply-unsupervised-models-to-identify-anomalies-or-outlier-78dbfa",
        name: "Construct and apply unsupervised models to identify anomalies or outliers in a dataset.",
        description: "This skill expression represents the ability to use machine learning to detect unusual or suspicious data points that deviate from the norm. It involves implementing models specifically designed for this purpose. A skilled professional can apply a defined list of core anomaly detection algorithms, including: 1. Isolation Forest, which is efficient at isolating outliers, and 2. Density-based approaches (like Local Outlier Factor), which identify points in low-density regions.",
      },
    ],
  },
  {
    key: "business-intelligence::intermediate",
    skillSlug: "business-intelligence",
    skillName: "Business Intelligence",
    level: "Intermediate",
    displayName: "Intermediate Business Intelligence",
    careerBand: 2,
    expressions: [
      {
        id: "design-a-dimensional-data-model-star-schema-for-analytical-reporting",
        name: "Design a dimensional data model (star schema) for analytical reporting.",
        description: "This skill represents the ability to structure data specifically for business intelligence and data warehousing applications. It involves designing a model optimized for fast querying and easy analysis. A skilled professional can design a star schema by: 1. Identifying the business process and its numeric measures to create a central Fact Table, and 2. Identifying the descriptive context (who, what, where, when) to create the surrounding Dimension Tables.",
      },
    ],
  },
  {
    key: "business-intelligence-software::intermediate",
    skillSlug: "business-intelligence-software",
    skillName: "Business Intelligence Software",
    level: "Intermediate",
    displayName: "Intermediate Business Intelligence Software",
    careerBand: 2,
    expressions: [
      {
        id: "apply-performance-optimization-techniques-to-bi-dashboards-and-reports",
        name: "Apply performance optimization techniques to BI dashboards and reports.",
        description: "This competency represents the ability to ensure that Business Intelligence (BI) dashboards and reports load quickly and respond efficiently, which is crucial for user adoption and a positive user experience. It involves using the BI tool's performance analysis features to identify bottlenecks and then applying a defined list of core optimization techniques. These techniques include:\n Data Model Optimization: Optimizing the underlying data model by reducing column cardinality, removing unnecessary columns, or restructuring relationships.\n Calculation Optimization: Rewriting inefficient calculations or using pre-calculated measures and aggregations.\n Efficient Filtering: Using optimized filtering methods to minimize the amount of data processed in queries and reduce query load times.\n Visual Optimization: Minimizing the number of visuals or the complexity of visuals on a single dashboard page to improve rendering performance.\n Data Connection Optimization: Selecting the appropriate data connection methods (e.g., DirectQuery vs. Import) based on the specific requirements and performance considerations.",
      },
      {
        id: "construct-a-data-model-within-a-bi-tool-by-defining-relationships-hierar-ec13b1",
        name: "Construct a data model within a BI tool by defining relationships, hierarchies, and calculated fields.",
        description: "This skill represents the ability to build the foundational analytical engine behind a dashboard. It involves using a BI tool's modeling capabilities to structure the data for analysis. A skilled professional can independently perform a defined list of core modeling tasks, including: 1. Establishing correct relationships and cardinality between tables, 2. Creating user-friendly hierarchies (e.g., for dates or geography), and 3. Writing and validating reusable calculated measures that encapsulate core business logic, creating a single source of truth.",
      },
      {
        id: "manage-the-deployment-and-maintenance-lifecycle-of-bi-reports-and-dashboards",
        name: "Manage the deployment and maintenance lifecycle of BI reports and dashboards.",
        description: "This skill represents the ability to take a BI solution from a desktop file to a shared, operational asset. It involves using the BI platform's online service to manage the report after its creation. A skilled professional can perform a defined list of core deployment tasks, including: 1. Publishing reports to a shared workspace, 2. Configuring and troubleshooting scheduled data refreshes, and 3. Managing user permissions and sharing content through apps or direct access.",
      },
    ],
  },
  {
    key: "business-metrics::intermediate",
    skillSlug: "business-metrics",
    skillName: "Business Metrics",
    level: "Intermediate",
    displayName: "Intermediate Business Metrics",
    careerBand: 2,
    expressions: [
      {
        id: "design-a-predictive-analytics-project-by-framing-a-business-problem-and--cf4c93",
        name: "Design a predictive analytics project by framing a business problem and defining success metrics.",
        description: "This skill represents the ability to translate a vague business goal into a specific, measurable analytical project. It involves two key actions: 1. Framing the problem as a clear predictive task (e.g., classifying customers as 'likely to churn' vs. 'not likely'), and 2. Selecting the appropriate technical evaluation metric (e.g., accuracy, precision, F1-score) that aligns with the business objective (e.g., minimizing false negatives). This demonstrates ownership of the analytical strategy.",
      },
    ],
  },
  {
    key: "business-requirements::intermediate",
    skillSlug: "business-requirements",
    skillName: "Business Requirements",
    level: "Intermediate",
    displayName: "Intermediate Business Requirements",
    careerBand: 2,
    expressions: [
      {
        id: "design-a-conceptual-and-logical-data-model-based-on-business-requirements",
        name: "Design a conceptual and logical data model based on business requirements.",
        description: "This skill represents the ability to translate business processes into a formal, abstract data model. It involves two key stages: 1. Creating a Conceptual Model that identifies the main business entities and their relationships at a high level, and 2. Developing a Logical Model that specifies the attributes for each entity and defines the primary and foreign keys that link them. A skilled professional can create an Entity-Relationship Diagram (ERD) to visually represent this logical model.",
      },
    ],
  },
  {
    key: "dashboard::intermediate",
    skillSlug: "dashboard",
    skillName: "Dashboard",
    level: "Intermediate",
    displayName: "Intermediate Dashboard",
    careerBand: 2,
    expressions: [
      {
        id: "apply-performance-optimization-techniques-to-bi-dashboards-and-reports",
        name: "Apply performance optimization techniques to BI dashboards and reports.",
        description: "This competency represents the ability to ensure that Business Intelligence (BI) dashboards and reports load quickly and respond efficiently, which is crucial for user adoption and a positive user experience. It involves using the BI tool's performance analysis features to identify bottlenecks and then applying a defined list of core optimization techniques. These techniques include:\n Data Model Optimization: Optimizing the underlying data model by reducing column cardinality, removing unnecessary columns, or restructuring relationships.\n Calculation Optimization: Rewriting inefficient calculations or using pre-calculated measures and aggregations.\n Efficient Filtering: Using optimized filtering methods to minimize the amount of data processed in queries and reduce query load times.\n Visual Optimization: Minimizing the number of visuals or the complexity of visuals on a single dashboard page to improve rendering performance.\n Data Connection Optimization: Selecting the appropriate data connection methods (e.g., DirectQuery vs. Import) based on the specific requirements and performance considerations.",
      },
      {
        id: "design-a-dashboard-layout-based-on-information-hierarchy-and-user-needs",
        name: "Design a dashboard layout based on information hierarchy and user needs.",
        description: "This skill represents the ability to architect an effective visual report that prioritizes information logically. It involves analyzing the audience's needs to structure a dashboard with the most important, high-level KPIs at the top or top-left, followed by more detailed trend charts and granular tables. A skilled professional can intentionally design a layout that guides the user's eye from a summary overview to detailed exploratory sections, ensuring the most critical information is seen first.",
      },
      {
        id: "implement-interactive-features-in-bi-tools-to-enable-guided-data-explora-76f79a",
        name: "Implement interactive features in BI tools to enable guided data exploration and analytical paths.",
        description: "This competency represents the ability to build interactive and dynamic dashboards that facilitate both guided exploration and storytelling with data. It involves implementing a range of interactive features within a Business Intelligence (BI) tool to create a user-friendly and insightful experience. This includes basic interactive elements like filters, parameters, and dynamic actions (e.g., clicking one chart filters another) to allow users to explore different facets of the data in a controlled manner. A skilled professional can also leverage more advanced techniques to guide users through a structured analytical journey. This includes:\n Drill-down Functionality: Enabling users to navigate from high-level summaries to granular details on demand.\n Dynamic Visibility: Controlling the display of dashboard elements based on user selections, creating a more focused and relevant experience.\n Parameter-Driven Controls: Empowering users to adjust calculation inputs and perform 'what-if' analyses, fostering deeper engagement with the data.\n The overarching goal is to design interactive dashboards that not only allow exploration but also support a narrative framework, ensuring a clear and insightful analytical path.",
      },
    ],
  },
  {
    key: "data-cleansing::intermediate",
    skillSlug: "data-cleansing",
    skillName: "Data Cleansing",
    level: "Intermediate",
    displayName: "Intermediate Data Cleansing",
    careerBand: 2,
    expressions: [
      {
        id: "develop-reusable-and-parameterized-scripts-to-automate-routine-data-mani-5dae30",
        name: "Develop reusable and parameterized scripts to automate routine data manipulation, transformation, and cleansing workflows.",
        description: "This competency represents the ability to improve team efficiency and data quality by automating routine data processes. It involves developing well-documented, modular, and reusable scripts or stored procedures that can be executed repeatedly on new data with minimal modifications. This converts manual, one-off tasks into reliable, operational workflows. Specifically, this includes:\n Data Cleansing: Automating standard data cleaning steps to improve data quality.\n Data Transformation: Creating parameterized scripts that apply consistent logic to different datasets based on specified inputs (file names, date ranges). This improves efficiency and reduces manual errors.\n General Data Manipulation: Automating various data manipulation tasks to enhance team productivity. This can include data formatting, aggregation, and other processing operations.\n The automation can be achieved through various programming languages such as Python, R or SQL. In Python or R, this involves writing modular, resuable functions and scripts. In SQL, it involves creating stored procedures, views, or using common table expressions to organize and automate the data manipulation process. \n By automating these tasks, the skilled professional demonstrates ownership and makes a meaningful contribution to the team's outcomes.",
      },
      {
        id: "evaluate-and-implement-the-appropriate-strategy-for-handling-outliers",
        name: "Evaluate and implement the appropriate strategy for handling outliers.",
        description: "This skill represents the ability to make a reasoned, defensible decision on how to treat extreme values in a dataset. It involves analyzing outliers to determine their cause and then evaluating the impact of different handling strategies. A skilled professional can choose between a defined list of core actions, including: 1. Removing the outlier if it's a clear error, 2. Capping/Flooring (winsorizing) the value to a specific percentile if it's a legitimate but extreme value, or 3. Transforming the variable (e.g., with a log transformation) to reduce the outlier's influence.",
      },
      {
        id: "perform-data-reconciliation-by-comparing-a-dataset-against-alternative-s-c54c9d",
        name: "Perform data reconciliation by comparing a dataset against alternative sources of data",
        description: "This skill represents the ability to validate and correct data by checking it against other sources of the same data. It involves programmatically joining a dataset with a master record (e.g., a product catalog or customer database) or previous versions of the same dataset or other sources where the data is present to identify discrepancies in spelling, categorization, or values, and then implementing logic to update the records to match the source of truth, thus improving overall data consistency.",
      },
    ],
  },
  {
    key: "data-model::intermediate",
    skillSlug: "data-model",
    skillName: "Data Model",
    level: "Intermediate",
    displayName: "Intermediate Data Model",
    careerBand: 2,
    expressions: [
      {
        id: "apply-data-normalization-principles-to-design-a-logical-data-model-for-r-04248a",
        name: "Apply data normalization principles to design a logical data model for relational databases.",
        description: "This competency represents the ability to design a robust and efficient logical data model for relational databases by systematically applying data normalization principles. It involves structuring data in a way that minimizes redundancy and improves data integrity, which is crucial for creating efficient and reliable transactional databases. A skilled professional can take a denormalized dataset and propose a normalized, multi-table schema. This involves understanding and applying a defined list of core normalization forms, primarily:\n 1. First Normal Form (1NF): Ensuring data is atomic and each column contains only one value.\n 2. Second Normal Form (2NF): Removing partial dependencies and ensuring that all non-key attributes are fully dependent on the primary key.\n 3. Third Normal Form (3NF): Removing transitive dependencies and ensuring that non-key attributes are not dependent on other non-key attributes.",
      },
      {
        id: "construct-a-data-model-within-a-bi-tool-by-defining-relationships-hierar-ec13b1",
        name: "Construct a data model within a BI tool by defining relationships, hierarchies, and calculated fields.",
        description: "This skill represents the ability to build the foundational analytical engine behind a dashboard. It involves using a BI tool's modeling capabilities to structure the data for analysis. A skilled professional can independently perform a defined list of core modeling tasks, including: 1. Establishing correct relationships and cardinality between tables, 2. Creating user-friendly hierarchies (e.g., for dates or geography), and 3. Writing and validating reusable calculated measures that encapsulate core business logic, creating a single source of truth.",
      },
      {
        id: "design-a-conceptual-and-logical-data-model-based-on-business-requirements",
        name: "Design a conceptual and logical data model based on business requirements.",
        description: "This skill represents the ability to translate business processes into a formal, abstract data model. It involves two key stages: 1. Creating a Conceptual Model that identifies the main business entities and their relationships at a high level, and 2. Developing a Logical Model that specifies the attributes for each entity and defines the primary and foreign keys that link them. A skilled professional can create an Entity-Relationship Diagram (ERD) to visually represent this logical model.",
      },
      {
        id: "design-a-dimensional-data-model-star-schema-for-analytical-reporting",
        name: "Design a dimensional data model (star schema) for analytical reporting.",
        description: "This skill represents the ability to structure data specifically for business intelligence and data warehousing applications. It involves designing a model optimized for fast querying and easy analysis. A skilled professional can design a star schema by: 1. Identifying the business process and its numeric measures to create a central Fact Table, and 2. Identifying the descriptive context (who, what, where, when) to create the surrounding Dimension Tables.",
      },
    ],
  },
  {
    key: "data-pipelines::intermediate",
    skillSlug: "data-pipelines",
    skillName: "Data Pipelines",
    level: "Intermediate",
    displayName: "Intermediate Data Pipelines",
    careerBand: 2,
    expressions: [
      {
        id: "automate-the-execution-of-routine-etl-workflows-using-scheduling-tools",
        name: "Automate the execution of routine ETL workflows using scheduling tools.",
        description: "This skill represents the ability to make a data pipeline operational, which is a meaningful contribution to team efficiency. It involves using a scheduling service to automatically run an ETL script on a recurring basis (e.g., daily or hourly). A skilled professional can use a defined list of core scheduling tools, which includes: system-based schedulers like cron (for Linux/macOS) or Task Scheduler (for Windows), or cloud-based services or tools such as Airflow DAGs or Databricks Jobs",
      },
    ],
  },
  {
    key: "data-warehousing::intermediate",
    skillSlug: "data-warehousing",
    skillName: "Data Warehousing",
    level: "Intermediate",
    displayName: "Intermediate Data Warehousing",
    careerBand: 2,
    expressions: [
      {
        id: "design-a-dimensional-data-model-star-schema-for-analytical-reporting",
        name: "Design a dimensional data model (star schema) for analytical reporting.",
        description: "This skill represents the ability to structure data specifically for business intelligence and data warehousing applications. It involves designing a model optimized for fast querying and easy analysis. A skilled professional can design a star schema by: 1. Identifying the business process and its numeric measures to create a central Fact Table, and 2. Identifying the descriptive context (who, what, where, when) to create the surrounding Dimension Tables.",
      },
    ],
  },
  {
    key: "database-design::intermediate",
    skillSlug: "database-design",
    skillName: "Database Design",
    level: "Intermediate",
    displayName: "Intermediate Database Design",
    careerBand: 2,
    expressions: [
      {
        id: "design-a-conceptual-and-logical-data-model-based-on-business-requirements",
        name: "Design a conceptual and logical data model based on business requirements.",
        description: "This skill represents the ability to translate business processes into a formal, abstract data model. It involves two key stages: 1. Creating a Conceptual Model that identifies the main business entities and their relationships at a high level, and 2. Developing a Logical Model that specifies the attributes for each entity and defines the primary and foreign keys that link them. A skilled professional can create an Entity-Relationship Diagram (ERD) to visually represent this logical model.",
      },
      {
        id: "design-a-dimensional-data-model-star-schema-for-analytical-reporting",
        name: "Design a dimensional data model (star schema) for analytical reporting.",
        description: "This skill represents the ability to structure data specifically for business intelligence and data warehousing applications. It involves designing a model optimized for fast querying and easy analysis. A skilled professional can design a star schema by: 1. Identifying the business process and its numeric measures to create a central Fact Table, and 2. Identifying the descriptive context (who, what, where, when) to create the surrounding Dimension Tables.",
      },
    ],
  },
  {
    key: "experiment::intermediate",
    skillSlug: "experiment",
    skillName: "Experiment",
    level: "Intermediate",
    displayName: "Intermediate Experiment",
    careerBand: 2,
    expressions: [
      {
        id: "apply-statistical-correction-methods-to-control-for-the-multiple-compari-0bc8be",
        name: "Apply statistical correction methods to control for the multiple comparisons problem.",
        description: "This skill represents the ability to maintain statistical rigor when conducting multiple simultaneous hypothesis tests (e.g., in A/B/n testing or when analyzing many metrics at once). It involves understanding the inflated risk of false positives (Type I errors) that arises when performing multiple comparisons and applying appropriate statistical adjustments to control this risk. A skilled professional can apply core correction methods to the significance threshold (p-value). These methods include:\n 1. The Bonferroni correction: A simple and conservative approach that divides the desired alpha level by the number of tests.\n 2. False Discovery Rate (FDR) control: Methods like the Benjamini-Hochberg procedure, which offer more power (less conservative) while still controlling the expected proportion of false discoveries among rejected hypotheses. \n Applying these correction methods ensures that the overall Type I error rate is controlled and that the results of multiple hypothesis tests are interpreted reliably.",
      },
      {
        id: "design-statistically-valid-experiments-using-power-analysis-to-determine-8d4e80",
        name: "Design statistically valid experiments using power analysis to determine required sample size.",
        description: "This competency represents the ability to proactively plan and design statistically sound experiments by determining the necessary sample size. It involves a formal process of power analysis to calculate the minimum number of participants or observations required to reliably detect a predetermined effect size. This calculation considers key factors such as the desired statistical power (typically 80%), the significance level (alpha, often set at 0.05), and the expected effect size. Performing power analysis before conducting an experiment prevents running studies that are too small to yield conclusive results, ensuring efficient resource allocation and increasing the likelihood of detecting meaningful effects. This skill demonstrates ownership of the entire analytical lifecycle and is critical for the design of effective experiments, including A/B tests and other controlled studies.",
      },
    ],
  },
  {
    key: "exploratory-data-analysis::intermediate",
    skillSlug: "exploratory-data-analysis",
    skillName: "Exploratory Data Analysis",
    level: "Intermediate",
    displayName: "Intermediate Exploratory Data Analysis",
    careerBand: 2,
    expressions: [
      {
        id: "analyze-the-results-of-an-eda-to-generate-testable-hypotheses-for-furthe-656b79",
        name: "Analyze the results of an EDA to generate testable hypotheses for further analysis.",
        description: "This skill represents the ability to translate exploratory findings into formal, actionable next steps. It involves interpreting the patterns, trends, and relationships discovered during EDA and formulating them as specific, testable hypotheses. For example, after observing a difference in a box plot, they can formulate the hypothesis, 'The average spend of customers from marketing channel A is significantly higher than from channel B,' which can then be formally tested.",
      },
      {
        id: "apply-multivariate-visualization-techniques-to-explore-relationships-amo-6e8df2",
        name: "Apply multivariate visualization techniques to explore relationships among three or more variables.",
        description: "This skill represents the ability to investigate complex interactions in the data. It involves using visualization techniques that encode additional variables into a plot. A skilled professional can apply a defined list of core multivariate techniques, including: 1. Using color, size, or shape in a scatter plot to represent a third or fourth variable, 2. Creating faceted plots (small multiples) to compare distributions across multiple categories, and 3. Using pair plots to visualize all pairwise relationships in a dataset simultaneously.",
      },
      {
        id: "investigate-data-to-validate-key-assumptions-for-statistical-modeling",
        name: "Investigate data to validate key assumptions for statistical modeling.",
        description: "This skill represents the ability to use EDA for a specific, critical purpose: ensuring the data is suitable for a planned analytical model. It involves performing targeted checks to validate a defined list of core modeling assumptions, including: 1. Checking for linearity in relationships for linear regression, 2. Examining the distribution of variables to check for normality, and 3. Testing for multicollinearity among predictor variables by analyzing a correlation matrix.",
      },
    ],
  },
  {
    key: "extract--transform--load::intermediate",
    skillSlug: "extract--transform--load",
    skillName: "Extract, Transform, Load",
    level: "Intermediate",
    displayName: "Intermediate Extract, Transform, Load",
    careerBand: 2,
    expressions: [
      {
        id: "automate-the-execution-of-routine-etl-workflows-using-scheduling-tools",
        name: "Automate the execution of routine ETL workflows using scheduling tools.",
        description: "This skill represents the ability to make a data pipeline operational, which is a meaningful contribution to team efficiency. It involves using a scheduling service to automatically run an ETL script on a recurring basis (e.g., daily or hourly). A skilled professional can use a defined list of core scheduling tools, which includes: system-based schedulers like cron (for Linux/macOS) or Task Scheduler (for Windows), or cloud-based services or tools such as Airflow DAGs or Databricks Jobs",
      },
    ],
  },
  {
    key: "generative-ai::intermediate",
    skillSlug: "generative-ai",
    skillName: "Generative Ai",
    level: "Intermediate",
    displayName: "Intermediate Generative Ai",
    careerBand: 2,
    expressions: [
      {
        id: "apply-large-language-models-llms-to-perform-feature-engineering-on-unstr-5219de",
        name: "Apply Large Language Models (LLMs) to perform feature engineering on unstructured text data.",
        description: "This skill represents the ability to use LLMs to extract valuable, structured information from raw text for use in analysis or modeling. It involves using prompt engineering to instruct a model to perform a defined list of core feature extraction tasks, including: 1. Sentiment Analysis (classifying text as positive/negative/neutral), 2. Topic Modeling (identifying key themes), and 3. Named Entity Recognition (extracting specific entities like product names, people, or locations).",
      },
      {
        id: "apply-generative-models-to-create-synthetic-data-for-testing-and-analysis",
        name: "Apply generative models to create synthetic data for testing and analysis.",
        description: "This skill represents the ability to use AI to generate new, artificial data that mimics the statistical properties of a real dataset. A skilled professional can apply this for two primary purposes: 1. Data Augmentation, to create additional training examples for a machine learning model, especially to address class imbalance, and 2. Data Synthesis, to create a realistic but anonymized dataset for testing a data pipeline or sharing for analysis without exposing sensitive information. This may involve using techniques like Variational Autoencoders (VAEs) or Generative Adversarial Networks (GANs).",
      },
      {
        id: "apply-prompt-engineering-techniques-with-large-language-models-llms-for--aee86b",
        name: "Apply prompt engineering techniques with Large Language Models (LLMs) for data analysis",
        description: "This competency represents the ability to effectively use Large Language Models (LLMs) for data analysis tasks. It involves applying prompt engineering techniques to communicate with and control LLMs, designing and refining text prompts to elicit accurate and relevant outputs from the model. A skilled professional can apply core prompting techniques, including few-shot prompting (providing examples), chain-of-thought prompting (guiding the model's reasoning process), and role-based prompting (instructing the model to act as a specific expert, like a SQL developer or business analyst). This competency enables the automation of key parts of the data analysis process, such as providing quantitative data (e.g., from pandas DataFrames) to an LLM and prompting it to explore patterns, generate insights, or assist with interpretation.",
      },
      {
        id: "apply-prompt-engineering-techniques-with-large-language-models-llms-for--74c4fe",
        name: "Apply prompt engineering techniques with Large Language Models (LLMs) for reporting.",
        description: "This competency represents the ability to effectively use Large Language Models (LLMs) for generating natural language summaries and reports. It involves applying prompt engineering techniques to communicate with and control LLMs, designing and refining text prompts to elicit accurate and relevant outputs from the model. A skilled professional can apply core prompting techniques, including few-shot prompting (providing examples), chain-of-thought prompting (guiding the model's reasoning process), and role-based prompting (instructing the model to act as a specific expert, like a SQL developer or business analyst). This competency enables the automation of key parts of the data storytelling process, such as providing insights and analysis artifacts and prompting it to generate narratives, visual summaries to communicate findings in plain language. This facilitates rapid creation of reports and presentations.",
      },
    ],
  },
  {
    key: "performance-analysis::intermediate",
    skillSlug: "performance-analysis",
    skillName: "Performance Analysis",
    level: "Intermediate",
    displayName: "Intermediate Performance Analysis",
    careerBand: 2,
    expressions: [
      {
        id: "optimize-data-manipulation-queries-and-scripts-for-performance",
        name: "Optimize data manipulation queries and scripts for performance.",
        description: "This skill expression represents the ability to analyze and improve the efficiency of data manipulation code to ensure it runs quickly and scales effectively on large datasets. It involves identifying performance bottlenecks in SQL queries or Python scripts and applying optimization techniques. This includes a defined list of core optimization actions: 1. Rewriting SQL queries to use efficient join logic, filtering data early, or leveraging database indexes, and 2. Refactoring Python (Pandas) code to replace slow loops with vectorized operations or use memory-efficient data types. This ensures that data preparation processes are timely and sustainable.",
      },
    ],
  },
  {
    key: "performance-metric::intermediate",
    skillSlug: "performance-metric",
    skillName: "Performance Metric",
    level: "Intermediate",
    displayName: "Intermediate Performance Metric",
    careerBand: 2,
    expressions: [
      {
        id: "apply-resampling-techniques-and-appropriate-metrics-to-evaluate-compare--08bc4a",
        name: "Apply resampling techniques and appropriate metrics to evaluate, compare, and select predictive models.",
        description: "This competency represents the ability to rigorously evaluate, compare, and select the optimal predictive model for a given problem. It involves applying robust resampling techniques to produce a reliable and unbiased estimate of a model's performance on unseen data, which is critical for preventing overfitting and ensuring the model will generalize. This is achieved by training multiple model types (e.g., logistic regression, random forest) on the same data using a consistent cross-validation strategy, such as K-Fold Cross-Validation. A professional can then compare the models using a defined list of problem-appropriate evaluation metrics. \n For classification problems, core metrics include: Accuracy, Precision, Recall, F1-Score, and AUC-ROC. \n For regression problems, core metrics include: Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared.\n This competency also includes using resampling methods to assess model stability and estimate uncertainty. A professional can apply core resampling methods including cross-validation and bootstrapping to create confidence intervals for model coefficients or performance metrics. This entire process allows for a data-driven decision to select the best-performing and most reliable model for a specific business problem.",
      },
      {
        id: "design-a-predictive-analytics-project-by-framing-a-business-problem-and--cf4c93",
        name: "Design a predictive analytics project by framing a business problem and defining success metrics.",
        description: "This skill represents the ability to translate a vague business goal into a specific, measurable analytical project. It involves two key actions: 1. Framing the problem as a clear predictive task (e.g., classifying customers as 'likely to churn' vs. 'not likely'), and 2. Selecting the appropriate technical evaluation metric (e.g., accuracy, precision, F1-score) that aligns with the business objective (e.g., minimizing false negatives). This demonstrates ownership of the analytical strategy.",
      },
    ],
  },
  {
    key: "power-bi::intermediate",
    skillSlug: "power-bi",
    skillName: "Power Bi",
    level: "Intermediate",
    displayName: "Intermediate Power Bi",
    careerBand: 2,
    expressions: [
      {
        id: "construct-a-data-model-within-a-bi-tool-by-defining-relationships-hierar-ec13b1",
        name: "Construct a data model within a BI tool by defining relationships, hierarchies, and calculated fields.",
        description: "This skill represents the ability to build the foundational analytical engine behind a dashboard. It involves using a BI tool's modeling capabilities to structure the data for analysis. A skilled professional can independently perform a defined list of core modeling tasks, including: 1. Establishing correct relationships and cardinality between tables, 2. Creating user-friendly hierarchies (e.g., for dates or geography), and 3. Writing and validating reusable calculated measures that encapsulate core business logic, creating a single source of truth.",
      },
    ],
  },
  {
    key: "process-optimization::intermediate",
    skillSlug: "process-optimization",
    skillName: "Process Optimization",
    level: "Intermediate",
    displayName: "Intermediate Process Optimization",
    careerBand: 2,
    expressions: [
      {
        id: "optimize-data-manipulation-queries-and-scripts-for-performance",
        name: "Optimize data manipulation queries and scripts for performance.",
        description: "This skill expression represents the ability to analyze and improve the efficiency of data manipulation code to ensure it runs quickly and scales effectively on large datasets. It involves identifying performance bottlenecks in SQL queries or Python scripts and applying optimization techniques. This includes a defined list of core optimization actions: 1. Rewriting SQL queries to use efficient join logic, filtering data early, or leveraging database indexes, and 2. Refactoring Python (Pandas) code to replace slow loops with vectorized operations or use memory-efficient data types. This ensures that data preparation processes are timely and sustainable.",
      },
    ],
  },
  {
    key: "relational-databases::intermediate",
    skillSlug: "relational-databases",
    skillName: "Relational Databases",
    level: "Intermediate",
    displayName: "Intermediate Relational Databases",
    careerBand: 2,
    expressions: [
      {
        id: "analyze-a-query-execution-plan-to-identify-performance-bottlenecks",
        name: "Analyze a query execution plan to identify performance bottlenecks.",
        description: "This skill represents the ability to understand how a database intends to execute a query. It involves using a database command (like `EXPLAIN` or `EXPLAIN ANALYZE`) to generate a query plan and then interpreting the output to diagnose performance issues. A skilled professional can identify costly operations in the plan, such as a full table scan where an index scan was expected, or an inefficient join method.",
      },
      {
        id: "apply-data-normalization-principles-to-design-a-logical-data-model-for-r-04248a",
        name: "Apply data normalization principles to design a logical data model for relational databases.",
        description: "This competency represents the ability to design a robust and efficient logical data model for relational databases by systematically applying data normalization principles. It involves structuring data in a way that minimizes redundancy and improves data integrity, which is crucial for creating efficient and reliable transactional databases. A skilled professional can take a denormalized dataset and propose a normalized, multi-table schema. This involves understanding and applying a defined list of core normalization forms, primarily:\n 1. First Normal Form (1NF): Ensuring data is atomic and each column contains only one value.\n 2. Second Normal Form (2NF): Removing partial dependencies and ensuring that all non-key attributes are fully dependent on the primary key.\n 3. Third Normal Form (3NF): Removing transitive dependencies and ensuring that non-key attributes are not dependent on other non-key attributes.",
      },
      {
        id: "evaluate-the-use-of-database-indexes-to-improve-query-performance",
        name: "Evaluate the use of database indexes to improve query performance.",
        description: "This skill represents the ability to understand and leverage one of the most critical performance-enhancing features of a database. It involves analyzing a slow-running query and determining if a database index could speed it up. A skilled professional can explain how an index works (like an index in a book) and can analyze a query's `WHERE` clause or `JOIN` conditions to identify which columns are good candidates for indexing, enabling them to have an informed discussion with a DBA or data engineer.",
      },
    ],
  },
  {
    key: "research-design::intermediate",
    skillSlug: "research-design",
    skillName: "Research Design",
    level: "Intermediate",
    displayName: "Intermediate Research Design",
    careerBand: 2,
    expressions: [
      {
        id: "design-statistically-valid-experiments-using-power-analysis-to-determine-8d4e80",
        name: "Design statistically valid experiments using power analysis to determine required sample size.",
        description: "This competency represents the ability to proactively plan and design statistically sound experiments by determining the necessary sample size. It involves a formal process of power analysis to calculate the minimum number of participants or observations required to reliably detect a predetermined effect size. This calculation considers key factors such as the desired statistical power (typically 80%), the significance level (alpha, often set at 0.05), and the expected effect size. Performing power analysis before conducting an experiment prevents running studies that are too small to yield conclusive results, ensuring efficient resource allocation and increasing the likelihood of detecting meaningful effects. This skill demonstrates ownership of the entire analytical lifecycle and is critical for the design of effective experiments, including A/B tests and other controlled studies.",
      },
    ],
  },
  {
    key: "sampling-statistics::intermediate",
    skillSlug: "sampling-statistics",
    skillName: "Sampling Statistics",
    level: "Intermediate",
    displayName: "Intermediate Sampling Statistics",
    careerBand: 2,
    expressions: [
      {
        id: "evaluate-and-select-the-appropriate-sampling-strategy",
        name: "Evaluate and select the appropriate sampling strategy",
        description: "This skill represents the ability to independently choose the most effective and efficient method for selecting a sample. It involves analyzing the population's structure and the goals of the study to select from a defined list of core sampling techniques, including: 1. Simple Random Sampling (when the population is homogenous), 2. Stratified Sampling (to ensure representation of key subgroups), and 3. Cluster Sampling (for practical efficiency with geographically dispersed populations).",
      },
      {
        id: "implement-complex-sampling-designs",
        name: "Implement complex sampling designs",
        description: "This skill represents the ability to execute more advanced, multi-stage sampling plans programmatically. For stratified sampling, this involves a defined process: 1. Identifying the distinct strata (subgroups) in the population, 2. Determining the sample size to draw from each stratum (e.g., proportional allocation), and 3. Performing the random sample within each stratum. This demonstrates a deeper technical capability beyond simple random sampling.",
      },
    ],
  },
  {
    key: "scheduling::intermediate",
    skillSlug: "scheduling",
    skillName: "Scheduling",
    level: "Intermediate",
    displayName: "Intermediate Scheduling",
    careerBand: 2,
    expressions: [
      {
        id: "automate-the-execution-of-routine-etl-workflows-using-scheduling-tools",
        name: "Automate the execution of routine ETL workflows using scheduling tools.",
        description: "This skill represents the ability to make a data pipeline operational, which is a meaningful contribution to team efficiency. It involves using a scheduling service to automatically run an ETL script on a recurring basis (e.g., daily or hourly). A skilled professional can use a defined list of core scheduling tools, which includes: system-based schedulers like cron (for Linux/macOS) or Task Scheduler (for Windows), or cloud-based services or tools such as Airflow DAGs or Databricks Jobs",
      },
    ],
  },
  {
    key: "statistical-analysis::intermediate",
    skillSlug: "statistical-analysis",
    skillName: "Statistical Analysis",
    level: "Intermediate",
    displayName: "Intermediate Statistical Analysis",
    careerBand: 2,
    expressions: [
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
    ],
  },
  {
    key: "statistical-inference::intermediate",
    skillSlug: "statistical-inference",
    skillName: "Statistical Inference",
    level: "Intermediate",
    displayName: "Intermediate Statistical Inference",
    careerBand: 2,
    expressions: [
      {
        id: "apply-bayesian-inference-methods-to-estimate-parameters-quantify-uncerta-809bfb",
        name: "Apply Bayesian inference methods to estimate parameters, quantify uncertainty, and make probabilistic statements.",
        description: "This competency represents the ability to apply Bayesian methods to analyze data, quantify uncertainty, and make probabilistic statements. It involves specifying prior distributions for parameters, combining them with the likelihood of observed data to generate posterior distributions, and constructing credible intervals to provide a range of plausible parameter values. A skilled professional can analyze posterior distributions to calculate probabilities, such as the probability of a parameter exceeding a certain threshold, and apply these methods to business problems like A/B testing to compare groups and determine the probability that one group outperforms another. This includes using various Bayesian models, such as Beta-Binomial models for conversion rates, and interpreting results in a clear and actionable way for business insights. It also involves understanding and applying core Bayesian concepts like prior and posterior distributions, likelihood functions, and credible intervals.",
      },
      {
        id: "apply-statistical-correction-methods-to-control-for-the-multiple-compari-0bc8be",
        name: "Apply statistical correction methods to control for the multiple comparisons problem.",
        description: "This skill represents the ability to maintain statistical rigor when conducting multiple simultaneous hypothesis tests (e.g., in A/B/n testing or when analyzing many metrics at once). It involves understanding the inflated risk of false positives (Type I errors) that arises when performing multiple comparisons and applying appropriate statistical adjustments to control this risk. A skilled professional can apply core correction methods to the significance threshold (p-value). These methods include:\n 1. The Bonferroni correction: A simple and conservative approach that divides the desired alpha level by the number of tests.\n 2. False Discovery Rate (FDR) control: Methods like the Benjamini-Hochberg procedure, which offer more power (less conservative) while still controlling the expected proportion of false discoveries among rejected hypotheses. \n Applying these correction methods ensures that the overall Type I error rate is controlled and that the results of multiple hypothesis tests are interpreted reliably.",
      },
      {
        id: "apply-statistical-methods-to-control-for-confounding-variables-in-observ-7a8a67",
        name: "Apply statistical methods to control for confounding variables in observational data to estimate causal effects.",
        description: "This skill expression represents the ability to conduct more rigorous analysis on non-experimental data by accounting for potential alternative explanations. It involves applying techniques to isolate the relationship between a specific treatment and an outcome by statistically controlling for the influence of confounding variables. For a skilled professional, this includes using methods like multiple regression or stratification to provide a more accurate estimate of a variable's true effect.",
      },
      {
        id: "design-statistically-valid-experiments-using-power-analysis-to-determine-8d4e80",
        name: "Design statistically valid experiments using power analysis to determine required sample size.",
        description: "This competency represents the ability to proactively plan and design statistically sound experiments by determining the necessary sample size. It involves a formal process of power analysis to calculate the minimum number of participants or observations required to reliably detect a predetermined effect size. This calculation considers key factors such as the desired statistical power (typically 80%), the significance level (alpha, often set at 0.05), and the expected effect size. Performing power analysis before conducting an experiment prevents running studies that are too small to yield conclusive results, ensuring efficient resource allocation and increasing the likelihood of detecting meaningful effects. This skill demonstrates ownership of the entire analytical lifecycle and is critical for the design of effective experiments, including A/B tests and other controlled studies.",
      },
    ],
  },
  {
    key: "statistical-machine-learning::intermediate",
    skillSlug: "statistical-machine-learning",
    skillName: "Statistical Machine Learning",
    level: "Intermediate",
    displayName: "Intermediate Statistical Machine Learning",
    careerBand: 2,
    expressions: [
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
    ],
  },
  {
    key: "statistical-modeling::intermediate",
    skillSlug: "statistical-modeling",
    skillName: "Statistical Modeling",
    level: "Intermediate",
    displayName: "Intermediate Statistical Modeling",
    careerBand: 2,
    expressions: [
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
    ],
  },
  {
    key: "statistics::intermediate",
    skillSlug: "statistics",
    skillName: "Statistics",
    level: "Intermediate",
    displayName: "Intermediate Statistics",
    careerBand: 2,
    expressions: [
      {
        id: "apply-programmatic-and-visual-diagnostic-techniques-to-validate-statisti-a4ee21",
        name: "Apply programmatic and visual diagnostic techniques to validate statistical model assumptions.",
        description: "This competency represents the ability to use programming, visualization libraries, and statistical tests to critically evaluate the validity and reliability of statistical models. It involves writing code to extract model components (like residuals, fitted values, and influence metrics) and generate a defined set of core diagnostic plots and tests. A professional can interpret these plots and test results to assess if the model's underlying assumptions are met. \n For linear regression, core assumptions and checks include:\n Linearity: Assessed using residuals vs. fitted plots.\n Homoscedasticity (constant variance of residuals): Assessed using scale-location plots.\n Independence of errors.\n Normality of residuals: Assessed using Q-Q plots.\n General diagnostic plots include: Quantile-Quantile (Q-Q) plots, histograms, residuals vs. fitted plots, and leverage plots to identify influential data points. \n Specialized diagnostic plots and tests tailored for specific model types, such as logistic regression (e.g., deviance residual plots, binned residual plots) and time series models (e.g., residuals vs. time, autocorrelation functions) can also be used. This rigorous approach ensures the model's conclusions are statistically sound and reliable for decision-making.",
      },
    ],
  },
  {
    key: "tableau-software::intermediate",
    skillSlug: "tableau-software",
    skillName: "Tableau Software",
    level: "Intermediate",
    displayName: "Intermediate Tableau Software",
    careerBand: 2,
    expressions: [
      {
        id: "construct-a-data-model-within-a-bi-tool-by-defining-relationships-hierar-ec13b1",
        name: "Construct a data model within a BI tool by defining relationships, hierarchies, and calculated fields.",
        description: "This skill represents the ability to build the foundational analytical engine behind a dashboard. It involves using a BI tool's modeling capabilities to structure the data for analysis. A skilled professional can independently perform a defined list of core modeling tasks, including: 1. Establishing correct relationships and cardinality between tables, 2. Creating user-friendly hierarchies (e.g., for dates or geography), and 3. Writing and validating reusable calculated measures that encapsulate core business logic, creating a single source of truth.",
      },
    ],
  },
  {
    key: "time-series-analysis-and-forecasting::intermediate",
    skillSlug: "time-series-analysis-and-forecasting",
    skillName: "Time Series Analysis And Forecasting",
    level: "Intermediate",
    displayName: "Intermediate Time Series Analysis And Forecasting",
    careerBand: 2,
    expressions: [
      {
        id: "construct-an-arima-model-to-generate-forecasts",
        name: "Construct an ARIMA model to generate forecasts.",
        description: "This skill represents the ability to build a sophisticated, widely used statistical forecasting model. It involves a systematic process: 1. Analyzing Autocorrelation Function (ACF) and Partial Autocorrelation Function (PACF) plots to identify the appropriate parameters (p, d, q) for the model, 2. Fitting the ARIMA model to the time series data using statistical software, and 3. Using the fitted model to generate point forecasts and prediction intervals for future time periods.",
      },
      {
        id: "construct-an-exponential-smoothing-model-to-capture-trend-and-seasonality",
        name: "Construct an exponential smoothing model to capture trend and seasonality.",
        description: "This skill represents the ability to build a forecasting model that is particularly effective at handling trend and seasonal components directly. It involves selecting and fitting the appropriate model from the exponential smoothing family. A skilled professional can implement a defined list of core models, including: 1. Simple Exponential Smoothing (for data with no trend or seasonality), and 2. The Holt-Winters method (for data with both trend and seasonality).",
      },
      {
        id: "evaluate-the-performance-and-validity-of-a-forecasting-model",
        name: "Evaluate the performance and validity of a forecasting model.",
        description: "This skill represents the critical final step of validating a forecast to ensure its reliability. It involves two key actions: 1. Calculating a defined list of core accuracy metrics on a hold-out test set, including Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and Mean Absolute Percentage Error (MAPE), and 2. Performing residual diagnostics by analyzing the model's errors to ensure they behave like random noise (i.e., have no remaining patterns or autocorrelation).",
      },
    ],
  },
  {
    key: "visualization-graphic::intermediate",
    skillSlug: "visualization-graphic",
    skillName: "Visualization Graphic",
    level: "Intermediate",
    displayName: "Intermediate Visualization Graphic",
    careerBand: 2,
    expressions: [
      {
        id: "evaluate-and-select-the-optimal-visualization-type-to-communicate-a-spec-99c6b1",
        name: "Evaluate and select the optimal visualization type to communicate a specific analytical insight.",
        description: "This competency represents the ability to choose the most effective chart or graph to communicate a specific analytical insight. A skilled professional considers the nature of the data and the intended message to make this selection. They can evaluate the analytical goal (e.g., showing a comparison, distribution, relationship, or composition) and select the most appropriate visualization from a comprehensive range of options, including advanced chart types beyond the basics (e.g., waterfall chart, funnel chart, box plot, histogram, density plot, etc.). This competency goes beyond simply creating a chart; it involves understanding why a specific visualization is superior to others for conveying the point clearly, memorably, and effectively to the target audience. The professional can justify their choice by explaining how the selected visualization best represents the data and supports the analytical narrative.",
      },
    ],
  },
  {
    key: "business-intelligence-software::advanced",
    skillSlug: "business-intelligence-software",
    skillName: "Business Intelligence Software",
    level: "Advanced",
    displayName: "Advanced Business Intelligence Software",
    careerBand: 2,
    expressions: [
      {
        id: "apply-advanced-analytical-functions-to-create-derived-metrics-and-kpis",
        name: "Apply advanced analytical functions to create derived metrics and KPIs.",
        description: "This competency represents the ability to create new, insightful metrics and Key Performance Indicators (KPIs) by applying advanced analytical functions within a Business Intelligence (BI) tool. It involves writing custom formulas using the tool's specific language (e.g., DAX in Power BI, Level of Detail expressions in Tableau, LookML) to perform complex calculations on existing data or derive new metrics not readily available in the source data. A skilled professional can implement a range of advanced metric types, including:\n \n\n * Time Intelligence/Period-over-Period Calculations: Year-over-Year growth, Month-over-Month change, etc.\n * Ratios, Rates, and Percentages: Conversion rates, gross margin, customer churn rate, etc.\n * Comparative Analysis: Performance vs. target, market share analysis, etc. \n * Cohort Analysis: User retention rate, customer lifetime value, etc.",
      },
    ],
  },
  {
    key: "business-requirements::advanced",
    skillSlug: "business-requirements",
    skillName: "Business Requirements",
    level: "Advanced",
    displayName: "Advanced Business Requirements",
    careerBand: 2,
    expressions: [
      {
        id: "design-a-predictive-analytics-project-by-framing-a-business-problem-and--cf4c93",
        name: "Design a predictive analytics project by framing a business problem and defining success metrics.",
        description: "This skill represents the ability to translate a vague business goal into a specific, measurable analytical project. It involves two key actions: 1. Framing the problem as a clear predictive task (e.g., classifying customers as 'likely to churn' vs. 'not likely'), and 2. Selecting the appropriate technical evaluation metric (e.g., accuracy, precision, F1-score) that aligns with the business objective (e.g., minimizing false negatives). This demonstrates ownership of the analytical strategy.",
      },
    ],
  },
  {
    key: "dashboard::advanced",
    skillSlug: "dashboard",
    skillName: "Dashboard",
    level: "Advanced",
    displayName: "Advanced Dashboard",
    careerBand: 2,
    expressions: [
      {
        id: "apply-advanced-analytical-functions-to-create-derived-metrics-and-kpis",
        name: "Apply advanced analytical functions to create derived metrics and KPIs.",
        description: "This competency represents the ability to create new, insightful metrics and Key Performance Indicators (KPIs) by applying advanced analytical functions within a Business Intelligence (BI) tool. It involves writing custom formulas using the tool's specific language (e.g., DAX in Power BI, Level of Detail expressions in Tableau, LookML) to perform complex calculations on existing data or derive new metrics not readily available in the source data. A skilled professional can implement a range of advanced metric types, including:\n \n\n * Time Intelligence/Period-over-Period Calculations: Year-over-Year growth, Month-over-Month change, etc.\n * Ratios, Rates, and Percentages: Conversion rates, gross margin, customer churn rate, etc.\n * Comparative Analysis: Performance vs. target, market share analysis, etc. \n * Cohort Analysis: User retention rate, customer lifetime value, etc.",
      },
    ],
  },
  {
    key: "data-cleansing::advanced",
    skillSlug: "data-cleansing",
    skillName: "Data Cleansing",
    level: "Advanced",
    displayName: "Advanced Data Cleansing",
    careerBand: 2,
    expressions: [
      {
        id: "apply-advanced-text-processing-techniques-to-parse-and-standardize-unstr-a59632",
        name: "Apply advanced text processing techniques to parse and standardize unstructured data.",
        description: "This skill represents the ability to clean messy, free-form text fields. It involves using programmatic tools to extract structured information from unstructured text. A skilled professional can apply a defined list of core techniques, including: 1. Regular Expressions (regex) to identify and extract specific patterns (like phone numbers or zip codes) from a larger text block, and 2. String similarity algorithms to identify and consolidate 'fuzzy' duplicates (e.g., 'ABC Company' vs. 'ABC Co.').",
      },
    ],
  },
  {
    key: "data-manipulation::advanced",
    skillSlug: "data-manipulation",
    skillName: "Data Manipulation",
    level: "Advanced",
    displayName: "Advanced Data Manipulation",
    careerBand: 2,
    expressions: [
      {
        id: "optimize-data-manipulation-queries-and-scripts-for-performance",
        name: "Optimize data manipulation queries and scripts for performance.",
        description: "This skill expression represents the ability to analyze and improve the efficiency of data manipulation code to ensure it runs quickly and scales effectively on large datasets. It involves identifying performance bottlenecks in SQL queries or Python scripts and applying optimization techniques. This includes a defined list of core optimization actions: 1. Rewriting SQL queries to use efficient join logic, filtering data early, or leveraging database indexes, and 2. Refactoring Python (Pandas) code to replace slow loops with vectorized operations or use memory-efficient data types. This ensures that data preparation processes are timely and sustainable.",
      },
    ],
  },
  {
    key: "data-transformation::advanced",
    skillSlug: "data-transformation",
    skillName: "Data Transformation",
    level: "Advanced",
    displayName: "Advanced Data Transformation",
    careerBand: 2,
    expressions: [
      {
        id: "apply-advanced-functions-to-create-complex-derived-features",
        name: "Apply advanced functions to create complex derived features.",
        description: "This skill expression represents the ability to perform advanced feature engineering by creating new variables that capture sophisticated relationships in the data. It involves using functions that operate over a set of rows while retaining row-level detail. A professional proficient in this skill can apply a defined list of advanced functions, which includes: 1. Window Functions in SQL ( DENSE_RANK(), RANK(), ROW_NUMBER(), LEAD(), LAG(), SUM() OVER (PARTITION BY ...)), and 2. Complex transformations in Python/Pandas (using .apply() with custom lambda functions, or custom group aggregation or time-series-specific manipulations like rolling averages and cumulative sums). This moves beyond simple arithmetic to creating features like running totals, period-over-period changes, or user rankings.",
      },
    ],
  },
];

export const REQUIRED_GROUP_KEYS: string[] =
  DATA_ANALYST_MASTERY_GROUPS.filter((g) => g.careerBand === 1).map((g) => g.key);

export const OTHER_GROUP_KEYS: string[] =
  DATA_ANALYST_MASTERY_GROUPS.filter((g) => g.careerBand === 2).map((g) => g.key);
