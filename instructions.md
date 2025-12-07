# Project Setup & Execution Guide

This document provides a comprehensive, step-by-step guide to setting up and running the **HR CV-JD Match Assistant** project on a local machine.

## 1. Prerequisites
Before starting, ensure you have the following installed:
*   **Python (3.8+)**: [Download Here](https://www.python.org/downloads/)
    *   *Verify*: `python --version`
*   **Node.js (16+)**: [Download Here](https://nodejs.org/)
    *   *Verify*: `node --version`

---

## 2. Project Structure
The project is split into two distinct parts:
*   `backend/`: A Django (Python) server that handles the AI matching logic and API.
*   `frontend/`: A React (Vite) web application that provides the user interface.

---

## 3. Backend Setup (Django)
*This handles the logic and data processing.*

1.  **Open Terminal**: Navigate to the project root folder (`PBSE`).
2.  **Navigate to Backend**:
    ```bash
    cd backend
    ```
3.  **Create Virtual Environment** (Recommended):
    ```bash
    python -m venv venv
    ```
4.  **Activate Virtual Environment**:
    *   **Windows**:
        ```bash
        .\venv\Scripts\activate
        ```
    *   **Mac/Linux**:
        ```bash
        source venv/bin/activate
        ```
5.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
6.  **Run Migrations** (Initialize Database):
    ```bash
    python manage.py migrate
    ```
7.  **Start the Server**:
    ```bash
    python manage.py runserver
    ```
    ✅ **Success**: You should see `Starting development server at http://127.0.0.1:8000/`.

---

## 4. Frontend Setup (React)
*This is the visual interface you interact with.*

1.  **Open a New Terminal**: Keep the backend terminal running and open a new window.
2.  **Navigate to Frontend**:
    ```bash
    cd frontend
    ```
3.  **Install Node Modules**:
    ```bash
    npm install
    ```
4.  **Start the Web Server**:
    ```bash
    npm run dev
    ```
    ✅ **Success**: You should see `Local: http://localhost:5173/`.

---

## 5. How to Use
1.  Open your browser to **[http://localhost:5173](http://localhost:5173)**.
2.  You will see the **Chat Interface**.
3.  **Input Data**:
    *   **Job Description**: Upload a file or click "Text" to paste the job requirements.
    *   **CV**: Upload a resume or click "Text" to paste the candidate's details.
4.  Click **Analyze**.
5.  Review the **Match Score**, **Missing Skills**, and **Recommendations**.

---

## 6. Troubleshooting

### "Script is disabled" error in PowerShell
If you see an error about execution policies when activating the venv:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Module not found"
Ensure you activated the virtual environment (`.\venv\Scripts\activate`) *before* running `pip install` or `python manage.py`.

### "Network Error" in Frontend
This means the React app cannot talk to the Django app.
*   Ensure the Backend terminal is still running.
*   Check that the backend is on port `8000` and frontend on `5173`.
