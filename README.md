# HR CV-JD Match Assistant

This project is an intelligent HR tool designed to streamline the recruitment process by evaluating how well a candidate's CV matches a specific Job Description (JD). It utilizes Natural Language Processing (NLP) to provide a semantic match score and detailed insights.

## Tech Stack

-   **Backend**: Python, Django REST Framework
-   **Frontend**: React (Vite), Tailwind CSS
-   **AI/NLP**: spaCy, HuggingFace Transformers
-   **Database**: SQLite (Default)

## Run Instructions

### Prerequisites
-   **Python 3.10+**
-   **Node.js 16+**

### 1. Backend Setup (Django)

1.  Open a terminal and navigate to the `backend` directory.
2.  Create and activate a virtual environment (recommended):
    ```bash
    python -m venv venv
    # Windows:
    .\venv\Scripts\activate
    # Mac/Linux:
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    *Note: The first install may take a few minutes as it downloads large NLP models.*
4.  Run database migrations:
    ```bash
    python manage.py migrate
    ```
5.  Start the backend server:
    ```bash
    python manage.py runserver
    ```
    The API is now running at `http://127.0.0.1:8000/`.

### 2. Frontend Setup (React)

1.  Open a **new** terminal window and navigate to the `frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  The application will launch in your default browser (usually at `http://localhost:5173`).

---

## Example Input / Output

### Scenario: Hiring a Senior Python Developer

#### **Input: Job Description (JD)**
> "We are looking for a Senior Backend Developer with at least 5 years of experience in Python and Django. Experience with AWS, REST APIs, and PostgreSQL is required. The ideal candidate should have strong problem-solving skills and mentorship experience."

#### **Input: Candidate CV**
> "Jane Doe. Senior Software Engineer.
> **Skills:** Python, Django, Flask, AWS (EC2, S3), PostgreSQL, Docker, Kubernetes, CI/CD.
> **Experience:** 6 years developing scalable backend systems. Led a team of 4 remote developers. Architected RESTful APIs for fintech applications."

#### **Output: Analysis Result**

*   **Match Score**: **88%** (High Match)
*   **Key Matches**:
    *   Python (Exact)
    *   Django (Exact)
    *   AWS (Exact)
    *   PostgreSQL (Exact)
    *   REST APIs (Semantic match with "RESTful APIs")
*   **Missing / Gaps**:
    *   *None explicit*, but system notes "Mentorship" is implied by "Led a team".
*   **Recommendation**:
    *   **For Recruiter**: "Strong candidate. Meets all core technical requirements and has leadership experience. Highly recommended for interview."
