# Release & Evolution Plan

This roadmap outlines the strategic evolution of the HR CV-JD Match Assistant from its current MVP state to a fully mature Enterprise SaaS product.

---

## Phase 1: Pilot & Polish (0 - 3 Months)
*Focus: Stabilizing the core functionality and improving the user experience for early adopters.*

*   **User Authentication**: Implement Login/Sign-up to allow users to save their history.
*   **History & Persistence**: Save previous JDs and CVs so users don't have to re-upload for every session.
*   **File Support**: Robust handling of complex PDF layouts and Word documents (parsing improvements).
*   **Export Reports**: Ability to download the Match Analysis as a branded PDF to share with Hiring Managers.

## Phase 2: Market Ready (3 - 12 Months)
*Focus: Scaling the feature set to compete with existing tools and integrating into workflows.*

*   **Batch Processing**: Allow uploading a ZIP file of 50 CVs against a single JD and receive a ranked list of candidates.
*   **ATS Integrations**: direct API connectors to Greenhouse, Lever, and LinkedIn Recruiter to pull candidates directly.
*   **Advanced NLP Models**: Upgrade from basic spaCy models to fine-tuned BERT/LLM models for better understanding of industry-specific jargon (e.g., Medical, Legal, Engineering).
*   **Custom Weighting**: Allow recruiters to "pin" specific skills as "Must Haves" vs "Nice to Haves," affecting the score calculation.

## Phase 3: Ecosystem & Intelligence (1 - 2 Years)
*Focus: Advanced analytics, bias reduction, and ecosystem expansion.*

*   **Bias Detection Engine**: Analyze JDs for biased language (e.g., gendered terms) and suggest more inclusive alternatives before the search even begins.
*   **Predictive Analytics**: Track "Hired" candidates to learn which match characteristics actually correlated with successful employment, refining the algorithm over time.
*   **Candidate Portal**: A "Reverse Market" feature where candidates can upload their CV to see which open jobs in the database they match with best.
*   **Soft Skills Analysis**: Analyzing cover letters and writing style to infer soft skills like communication, leadership, and empathy.
