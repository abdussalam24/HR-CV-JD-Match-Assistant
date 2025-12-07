# HR CV-JD Match Assistant

An intelligent AI-powered system that analyzes the compatibility between Candidate CVs and Job Descriptions, providing detailed match scores, skill gap analysis, and actionable recommendations for both recruiters and candidates.

## 🚀 Features

- **Semantic Matching**: Uses NLP to understand context beyond simple keyword matching
- **Detailed Analysis**: Provides match scores, identified skills, missing requirements, and experience relevance
- **Dual Recommendations**: Actionable insights for both candidates and recruiters
- **Modern UI**: Chat-based interface with radial progress gauges and color-coded feedback
- **Flexible Input**: Supports both file uploads (PDF, DOCX) and direct text input

## 📋 Tech Stack

**Frontend:**
- React 18
- Vite
- Axios
- Lucide Icons

**Backend:**
- Django 5.1
- Django REST Framework
- SpaCy (NLP)
- Python 3.8+

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## 📖 Usage

1. Open your browser to `http://localhost:5173`
2. You'll see a chat-based interface
3. Upload or paste a **Job Description** (JD)
4. Upload or paste a **Candidate CV**
5. Click **Analyze**
6. Review the comprehensive match analysis including:
   - Match Score (with radial gauge)
   - Strong Matches (skills found)
   - Missing/Gap Skills
   - Experience Relevance
   - Recommendations for Candidate
   - Recommendations for Recruiter

## 🧪 Testing

Run the automated API test:
```bash
cd backend
python test_api_flow.py
```

## 📁 Project Structure

```
PBSE/
├── backend/
│   ├── api/              # Django REST API
│   ├── core/             # Django settings
│   ├── cvs/              # Uploaded CV storage
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── index.css     # Styles
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── AI-log.md
├── ProblemStatement.md
├── TestPlan.md
├── UI-Sketch-Vision.md
├── Release-Evolution-Plan.md
└── instructions.md
```

## 🎨 UI Design Philosophy

The interface uses a **dark theme** with:
- **Green (#10A37F)**: Strong matches and positive indicators
- **Yellow (#F1C40F)**: Moderate matches and warnings
- **Red (#E74C3C)**: Missing skills and critical gaps

## 🚦 Roadmap

See [Release-Evolution-Plan.md](./Release-Evolution-Plan.md) for the full development roadmap.

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.
