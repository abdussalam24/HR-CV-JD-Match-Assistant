# Project Setup Instructions

This project contains a full-stack application for HR CV-JD Matching.

## Prerequisites
- **Python**: Required for the backend. Please install Python 3.8+ and ensure it's in your system PATH.
- **Node.js**: Required for the frontend. You have Node installed (v24.11.1).

## Backend Setup (Django)

1.  Open a terminal in the `backend` directory.
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    *Note: If `pip` fails, ensure Python is correctly installed and added to PATH.*
4.  Run migrations:
    ```bash
    python manage.py migrate
    ```
5.  Start the server:
    ```bash
    python manage.py runserver
    ```
    The API will be available at `http://127.0.0.1:8000/`.

## Frontend Setup (React + Vite)

1.  Open a terminal in the `frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
    *Note: If you encounter execution policy errors with PowerShell, try running this in Command Prompt (cmd) or Git Bash, or set the execution policy:*
    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to the URL shown (usually `http://localhost:5173`).

## Usage

1.  Navigate to the "CV Match" tab.
2.  Paste a Job Description (JD) text.
3.  Paste a Candidate CV text.
4.  Click "Analyze Match".
5.  View the Match Score, Matched Skills, and Missing Skills.

*Note: The frontend includes a demonstration mode that works even if the backend is not running, using simple keyword matching in the browser.*
