import re
import PyPDF2
import docx
import io

def analyze_match(cv_text, jd_text):
    """
    Analyzes the match between CV and JD with enhanced feedback.
    """
    cv_text_lower = cv_text.lower()
    jd_text_lower = jd_text.lower()
    
    # Expanded skill list for better demo quality
    known_skills = [
        "python", "django", "react", "javascript", "node.js", "sql", "postgresql", 
        "docker", "aws", "rest api", "html", "css", "git", "communication", 
        "teamwork", "problem solving", "leadership", "agile", "scrum", "java", 
        "c#", "c++", "php", "angular", "vue.js", "machine learning", "ai", 
        "jira", "linux", "cloud", "kubernetes", "typescript", "figma", 
        "marketing", "sales", "finance"
    ]
    
    jd_skills = list(set([skill for skill in known_skills if skill in jd_text_lower]))
    cv_skills = list(set([skill for skill in known_skills if skill in cv_text_lower]))
    
    matched_skills = [skill for skill in jd_skills if skill in cv_skills]
    missing_skills = [skill for skill in jd_skills if skill not in cv_skills]
    additional_strengths = [skill for skill in cv_skills if skill not in jd_skills]
    
    # Simple scoring logic
    if not jd_skills:
        score = 0 
    else:
        score = int((len(matched_skills) / len(jd_skills)) * 100)
    
    if score >= 75:
        level = "High"
        summary_title = "Excellent fit - Strongly Recommended"
    elif score >= 50:
        level = "Medium"
        summary_title = "Moderate fit - needs review"
    else:
        level = "Low"
        summary_title = "Low fit - significant gaps"

    # Generate Recommendations
    candidate_recs = []
    if missing_skills:
        candidate_recs.append(f"Acquire skills in: {', '.join(missing_skills[:3])}")
    candidate_recs.append("Add quantifiable achievements (e.g., 'Improved performance by 40%')")
    candidate_recs.append("Include relevant keywords from the job description naturally in your resume")
    
    recruiter_recs = []
    if score >= 60:
        recruiter_recs.append("Potential candidate - consider if skills gaps can be filled through training")
    else:
        recruiter_recs.append("Candidate might need significant ramp-up time")
    
    if missing_skills:
        recruiter_recs.append("Focus interview questions on missing skills to assess learning ability")
    
    if additional_strengths:
        recruiter_recs.append(f"Note additional strengths: {', '.join(additional_strengths[:3])}")

    return {
        "match_score": f"{score}%",
        "match_level": level,
        "summary_title": summary_title,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "additional_strengths": additional_strengths,
        "experience_relevance": "Candidate appears to have relevant skills. Experience level requires manual verification of years.",
        "overall_summary": f"The candidate shows a {level} fit for this position, matching {len(matched_skills)} requirements but lacking {len(missing_skills)} key skills.",
        "candidate_recommendations": candidate_recs,
        "recruiter_recommendations": recruiter_recs
    }

def extract_text_from_file(file_obj):
    """
    Extracts text from a file object (PDF or DOCX).
    """
    text = ""
    try:
        file_name = getattr(file_obj, 'name', '')
        
        if file_name.endswith('.pdf'):
            pdf_reader = PyPDF2.PdfReader(file_obj)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        elif file_name.endswith('.docx'):
            doc = docx.Document(file_obj)
            for para in doc.paragraphs:
                text += para.text + "\n"
        elif file_name.endswith('.txt'):
            content = file_obj.read()
            if isinstance(content, bytes):
                text = content.decode('utf-8')
            else:
                text = content
    except Exception as e:
        print(f"Error extracting text: {e}")
        return ""
    
    return text.strip()
