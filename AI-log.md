# AI Log

This document records the usage of Artificial Intelligence tools throughout the development lifecycle of the HR CV-JD Match Assistant.

## Tools Used

1.  **Google Gemini (via Antigravity Agent)**
    *   **Role**: Primary coding assistant, architectural advisor, and content generator.
    *   **Usage**: Generating project structure, writing backend (Django) and frontend (React) code, debugging errors, and creating documentation.

2.  **Github Copilot (Implicit/Simulated)**
    *   **Role**: Autocomplete and minor logic suggestions (simulated in IDE interactions).
    *   **Usage**: Speeding up boilerplate code writing.

---

## Key Prompts & Interactions

| Phase | Prompt Summary | AI Contribution |
| :--- | :--- | :--- |
| **Ideation** | "Help me design an architecture for a Peer-to-Peer Learning Platform..." (Initial pivot) | Provided comprehensive full-stack architecture, DB schemas, and tech stack recommendations. |
| **Setup** | "Set up the HR CV-JD Match Assistant with Django and React." | Generated the directory structure, `requirements.txt`, `package.json`, and initial configuration files. |
| **Refinement** | "Refine the Match Analysis UI to include color-coded scores and specific sections for missing skills." | Wrote the specific React components (`MatchResult.jsx`) and CSS implementation for the visual feedback. |
| **Documentation** | "Create a Problem Statement, Test Plan, and README for this project." | Drafted professional-grade documentation based on the code context. |

---

## Reflection

### Usefulness
*   **Speed**: The AI significantly exhausted the setup time, moving from zero to a running MVP in a fraction of the time it would take manually.
*   **Context Awareness**: The ability to read the file structure and specific file contents allowed for highly relevant code suggestions that worked out-of-the-box.
*   **Boilerplate reduction**: Writing standard Django views and React hooks was almost instantaneous.

### Limitations
*   **Visual Validation**: The AI cannot "see" the UI. It relies on the code to infer what the UI looks like. This sometimes required back-and-forth iteration to get CSS styling (colors, spacing) exactly right.
*   **Environment Specifics**: Issues with local environment configuration (e.g., PowerShell execution policies, specific Python path issues) had to be debugged with explicit error logs provided by the user.
*   **Complex Business Logic**: While great at general logic, fine-tuning the specific "weighting" of different skills in the matching algorithm required specific human direction to ensure it aligned with HR realities.
