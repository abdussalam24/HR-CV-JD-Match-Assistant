# Problem Statement: HR CV-JD Match Assistant

## 1. The Problem

### Pain Points
*   **Volume Overload**: HR recruiters are often inundated with hundreds of applications for a single opening, making manual review impossible to perform thoroughly.
*   **Inefficiency**: Traditional manual screening is slow, leading to a high "time-to-hire" and the potential loss of top talent to faster competitors.
*   **Human Bias & Error**: Manual review is susceptible to unconscious bias and fatigue. Recruiters might miss qualified candidates due to skimming or minor formatting issues.
*   **Limitations of Keyword Matching**: Standard Application Tracking Systems (ATS) often rely on exact keyword matching. They fail to recognize synonyms or context (e.g., "React.js" vs. "Frontend Development"), leading to false negatives.

### Primary Users
*   **HR Recruiters**: The primary users who manage the initial screening process.
*   **Hiring Managers**: Users who define job requirements and review the rationale behind candidate shortlisting.
*   **Candidates (Secondary)**: In a self-service model, candidates could use the tool to optimize their CVs before submission.

### Why This Matters
*   **Strategic Advantage**: Automating the screening process allows HR teams to focus on high-value tasks like interviewing and relationship building.
*   **Quality of Hire**: By using semantic analysis rather than just keywords, the system ensures that the best-fitting candidates—not just the best keyword-stuffers—are identified.
*   **Objectivity**: A standardized scoring system promotes a fairer selection process.

---

## 2. Project Scope

### In-Scope Features
*   **Document Ingestion**: 
    *   Mechanisms to upload and parse CVs/Resumes (supported formats: PDF, DOCX, TXT).
    *   Input mechanisms for Job Descriptions (text paste or file upload).
*   **Intelligent Analysis (NLP)**:
    *   **Semantic Matching**: Utilizing Natural Language Processing (e.g., Transformers, SpaCy) to understand the contextual meaning of skills and experiences.
    *   **Entity Extraction**: Identifying and categorizing Skills, Education, Experience, and Certifications.
*   **Scoring & Ranking**:
    *   Generating a quantifiable Match Score (0-100%) for each CV-JD pair.
    *   Categorizing matches (e.g., High, Medium, Low).
*   **Detailed Reporting**:
    *   Visual dashboard displaying the analysis.
    *   Breakdown of "Matched Skills" vs. "Missing Requirements".
    *   Actionable "Recommendations" for both the Recruiter and the Candidate.

### Out-of-Scope Features
*   **Full Applicant Tracking System (ATS)**: The system is a specialized module for *matching*, not a full suite for managing the entire hiring lifecycle (e.g., interview scheduling, offer management, onboarding).
*   **Background Verification**: No integration with criminal record or credit check services.
*   **External Data Scraping**: The system will analyze only the data provided in the uploaded documents; it will not scrape LinkedIn, GitHub, or other social profiles.
*   **Automated Correspondence**: The system will not automatically send rejection or acceptance emails to candidates.
