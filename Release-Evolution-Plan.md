# Release & Evolution Plan

## Phase 0: Open Source Launch (0 - 1 Month)
*Focus: Community engagement, stress testing, and unrestricted access.*

*   **Open Access**: Launch as a fully open-source web application with **no usage limits**.
*   **Objective**: Gather massive amounts of user interaction data to test system response times and load handling under real-world traffic.
*   **Community Feedback**: Establish GitHub issues and discussion boards to collect bug reports and feature requests directly from developers and early adopters.
*   **Performance Baseline**: Monitor API latency and matching accuracy to establish a benchmark for future optimizations.

## Phase 1: Pilot & Polish (0 - 3 Months)
*Focus: Stabilizing the core functionality and improving the user experience for early adopters.*

*   **User Authentication**: Implement Login/Sign-up (OAuth/Email) to allow users to save their personal session history.
*   **History & Persistence**: Save previous Job Descriptions (JDs) and CVs so users don't have to re-upload files for every new analysis.
*   **Robust File Support**: Enhance the parsing engine to handle complex PDF layouts, multi-column resumes, and various Word document formats reliably.
*   **Export Reports**: Add functionality to download the "Match Analysis" as a professional, branded PDF to share with Hiring Managers.

## Phase 2: Market Ready (3 - 12 Months)
*Focus: Scaling the feature set to compete with existing tools and integrating into professional workflows.*

*   **Batch Processing**: Enable "Bulk Upload" to process a ZIP file of 50+ CVs against a single JD, returning a ranked list of candidates.
*   **ATS Integrations**: Build direct API connectors to major Applicant Tracking Systems (e.g., Greenhouse, Lever, LinkedIn Recruiter) for seamless data import.
*   **Advanced NLP Models**: Upgrade from basic keyword/rules-based models (SpaCy) to fine-tuned Large Language Models (LLMs/BERT) for understanding industry-specific jargon (Medical, Legal, Engineering).
*   **Custom Weighting**: Allow recruiters to "pin" specific skills as "Must Haves" vs "Nice to Haves," directly significantly affecting the score calculation logic.

## Phase 3: Ecosystem & Intelligence (1 - 2 Years)
*Focus: Advanced analytics, bias reduction, and ecosystem expansion.*

*   **Bias Detection Engine**: Analyze Job Descriptions for biased language (e.g., gender-coded terms) and suggest inclusive alternatives before the search begins.
*   **Predictive Analytics**: Track "Hired" candidates to learn which match characteristics actually correlated with successful employment, creating a feedback loop to refine the algorithm.
*   **Candidate Portal**: A "Reverse Market" feature where candidates can upload their CV to see which open jobs in the databse they match with best.
*   **Soft Skills Analysis**: Analyze cover letters and writing styles to infer soft skills like communication, leadership, and empathy.
