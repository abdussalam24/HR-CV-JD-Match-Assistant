# UI Sketch & Vision

## 1. Visualizing the Final Product

Below is a low-fidelity wireframe representation of the **"Pro"** version of the CV-JD Match Assistant dashboard.

```text
+----------------------------------------------------------------------------------+
|  [LOGO] SmartRecruit                                   [User Profile] [Settings] |
+----------------------------------------------------------------------------------+
|  MENU         |  DASHBOARD > MATCH ANALYSIS                                      |
|               |                                                                  |
|  [Dashboard]  |  +-------------------------------------+  +-------------------+  |
|  [My Jobs]    |  | JOB DESCRIPTION (JD)                |  | CANDIDATE CV      |  |
|  [Candidates] |  | [ Drop file or Paste text         ] |  | [ Drop PDF/Docx ] |  |
|  [Reports]    |  | "Senior Python Dev..."            |  | "John Doe..."     |  |
|  [Archive]    |  +-------------------------------------+  +-------------------+  |
|               |                                                                  |
|               |            [  ANALYZE MATCH BUTTON (Processing...)  ]            |
|               |                                                                  |
+---------------+------------------------------------------------------------------+
|               |  RESULTS PANEL                                                   |
|               |  +---------------------+  +-----------------------------------+  |
|               |  |  MATCH SCORE        |  |  DETAILED ANALYSIS                |  |
|               |  |      /```\          |  |                                   |  |
|               |  |     ( 88% )         |  |  [+] MATCHED SKILLS (Green)       |  |
|               |  |      \___/          |  |      • Python, Django, AWS        |  |
|               |  |   [HIGH MATCH]      |  |                                   |  |
|               |  |                     |  |  [-] MISSING / CRITICAL (Red)     |  |
|               |  |  Experience: 5/5y   |  |      • Kubernetes                 |  |
|               |  |  Education: Match   |  |                                   |  |
|               |  +---------------------+  |  [?] RECOMMENDATION               |  |
|               |                           |  "Interview. Strong tech fit."    |  |
|               |                           +-----------------------------------+  |
+----------------------------------------------------------------------------------+
```

## 2. Key UI Decisions

### Split-Screen Input / Single View Analysis
*   **Decision**: We chose a side-by-side layout for the input phase.
*   **Rationale**: Recruiters often compare physical documents side-by-side. Mimicking this natural workflow reduces cognitive load. It allows the user to quickly verify that they have pasted/uploaded the correct corresponding documents before hitting analyze.

### Hierarchy of Information (Score First, Details Second)
*   **Decision**: The "Match Score" gauge is the most prominent visual element in the results section.
*   **Rationale**: HR professionals are busy. They need an immediate "Go/No-Go" signal (The Score). Once their attention is captured by a good score (or bad one), they can then look to the right to see the *evidence* (Matched/Missing skills) providing the "Why" behind the score.

### Color-Coded Feedback (Traffic Light System)
*   **Decision**: Using Green for matches, Yellow for partials/warnings, and Red for missing critical skills.
*   **Rationale**: This leverages universal semantic associations. A recruiter scanning a list doesn't need to read every word; a sea of "Green" implies safety and competence, while "Red" alerts them to potential deal-breakers immediately.
