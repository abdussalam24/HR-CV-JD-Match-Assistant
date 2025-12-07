import React, { useState, useRef, useEffect } from 'react';
import {
    FileText, Settings, Upload, CheckCircle, AlertCircle,
    BarChart2, Loader, Plus, MessageSquare, ChevronDown, Send, User, Cpu, Type
} from 'lucide-react';
import axios from 'axios';

function App() {
    // Session Management
    const [conversations, setConversations] = useState([
        {
            id: 1,
            title: "New Analysis",
            messages: [{
                type: 'ai',
                content: "Hello! I'm your HR Assistant. You can upload CVs/JDs or paste text requirements below to start."
            }]
        }
    ]);
    const [activeId, setActiveId] = useState(1);

    // Input State - Independent types for CV and JD
    const [inputTypes, setInputTypes] = useState({ cv: 'file', jd: 'file' });

    // Data State
    const [jdFile, setJdFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [jdText, setJdText] = useState('');
    const [cvText, setCvText] = useState('');
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    // Get active conversation safely
    const activeConversation = conversations.find(c => c.id === activeId) || conversations[0];

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation.messages]);

    const createNewAnalysis = () => {
        const newId = Date.now();
        const newConv = {
            id: newId,
            title: "New Analysis",
            messages: [{
                type: 'ai',
                content: "Ready for a new analysis. Please provide the Candidate CV and Job Description."
            }]
        };
        setConversations(prev => [newConv, ...prev]);
        setActiveId(newId);
        // Reset inputs
        setJdFile(null); setCvFile(null); setJdText(''); setCvText('');
        setInputTypes({ cv: 'file', jd: 'file' });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === 'jd') setJdFile(file);
            else setCvFile(file);
        }
    };

    const handleMatch = async () => {
        // Validation based on independent types
        const hasJD = inputTypes.jd === 'file' ? !!jdFile : !!jdText;
        const hasCV = inputTypes.cv === 'file' ? !!cvFile : !!cvText;

        if (!hasJD || !hasCV) {
            alert("Please provide both a CV and a Job Description.");
            return;
        }

        setLoading(true);

        // 1. Add User Message
        const userContent = (
            <div>
                <p>Analyze this candidate:</p>
                <div className="upload-grid" style={{ marginTop: '0.5rem', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                    <div className="file-status">
                        <User size={14} style={{ display: 'inline', marginRight: 4 }} />
                        {inputTypes.cv === 'file' ? `CV: ${cvFile?.name}` : 'CV: Text Input'}
                    </div>
                    <div className="file-status">
                        <FileText size={14} style={{ display: 'inline', marginRight: 4 }} />
                        {inputTypes.jd === 'file' ? `JD: ${jdFile?.name}` : 'JD: Text Input'}
                    </div>
                </div>
            </div>
        );

        // Capture current ID
        const currentId = activeId;
        const currentConv = conversations.find(c => c.id === currentId);
        const updatedMessages = [...currentConv.messages, { type: 'user', content: userContent }];

        // Optimistic update
        setConversations(prev => prev.map(c =>
            c.id === currentId ? { ...c, messages: updatedMessages } : c
        ));

        // Clear Inputs immediately
        setJdFile(null);
        setCvFile(null);
        setJdText('');
        setCvText('');
        if (document.getElementById('cv-upload')) document.getElementById('cv-upload').value = '';
        if (document.getElementById('jd-upload')) document.getElementById('jd-upload').value = '';

        try {
            let jdId, cvId;
            const headers = { 'Content-Type': 'multipart/form-data' };

            // Upload JD
            const jdData = new FormData();
            if (inputTypes.jd === 'file') jdData.append('file', jdFile);
            else jdData.append('text', jdText);
            const jdReq = await axios.post('http://127.0.0.1:8000/api/upload-jd/', jdData, { headers });
            jdId = jdReq.data.id;

            // Upload CV
            const cvData = new FormData();
            if (inputTypes.cv === 'file') cvData.append('file', cvFile);
            else cvData.append('text', cvText);
            const cvReq = await axios.post('http://127.0.0.1:8000/api/upload-cv/', cvData, { headers });
            cvId = cvReq.data.id;

            // Match
            const matchResponse = await axios.post('http://127.0.0.1:8000/api/match/', { jd_id: jdId, cv_id: cvId });
            const result = matchResponse.data;

            // Determine styling
            const scoreVal = parseInt(result.match_score);
            let scoreColor = '#ef4146'; // Red (Weak, <50)

            if (scoreVal >= 75) {
                scoreColor = '#10a37f'; // Green (Strong)
            } else if (scoreVal >= 50) {
                scoreColor = '#fbbf24'; // Yellow (Moderate)
            }

            // Generate AI Response
            const aiContent = (
                <div>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>I've completed a comprehensive analysis of the CV against the job description. Here are the results:</p>

                    <div className="result-card" style={{ border: '1px solid #4d4d4f', paddingBottom: 0, overflow: 'hidden' }}>
                        {/* 1. Header Section */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.25rem', color: scoreColor }}>
                                    {result.match_score}
                                </div>
                                <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: '#C5C5D2', fontWeight: 600 }}>Match Level: {result.match_level}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f7f7f8' }}>{result.summary_title}</div>
                                <div style={{ fontSize: '0.9rem', color: '#c5c5d2' }}>Based on keyword & skill analysis</div>
                            </div>
                        </div>

                        {/* 2. Summary & Analysis */}
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.9rem', color: '#C5C5D2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Summary</h4>
                                <p style={{ lineHeight: '1.6', color: '#ECECF1' }}>{result.overall_summary}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                {/* Strong Matches */}
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: '#10a37f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                        Strong Matches ({result.matched_skills.length})
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {result.matched_skills.map(s => (
                                            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ECECF1' }}>
                                                <CheckCircle size={14} color="#10a37f" />
                                                <span style={{ textTransform: 'capitalize' }}>{s} <span style={{ color: '#6e6e80', fontSize: '0.85rem' }}>(Technical Skill)</span></span>
                                            </div>
                                        ))}
                                        {result.matched_skills.length === 0 && <span style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#666' }}>No specific matches found.</span>}
                                    </div>
                                </div>

                                {/* Missing Requirements */}
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: '#ef4146', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                        Missing Key Requirements ({result.missing_skills.length})
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {result.missing_skills.map(s => (
                                            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ECECF1' }}>
                                                <AlertCircle size={14} color="#ef4146" />
                                                <span style={{ textTransform: 'capitalize' }}>{s}</span>
                                            </div>
                                        ))}
                                        {result.missing_skills.length > 0 && (
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#ef4146', fontStyle: 'italic' }}>
                                                These skills are required by the JD but not found in the CV.
                                            </p>
                                        )}
                                        {result.missing_skills.length === 0 && <span style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#666' }}>No Missing Skills found.</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Strengths */}
                            {result.additional_strengths && result.additional_strengths.length > 0 && (
                                <div style={{ marginTop: '2rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: '#C5C5D2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                        Additional Strengths ({result.additional_strengths.length})
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {result.additional_strengths.map(s => (
                                            <span key={s} style={{
                                                background: '#2A2B32', border: '1px solid #565869',
                                                padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem', color: '#ECECF1', textTransform: 'capitalize'
                                            }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Experience Analysis */}
                            <div style={{ marginTop: '2rem' }}>
                                <h4 style={{ fontSize: '0.9rem', color: '#C5C5D2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Experience Analysis</h4>
                                <p style={{ background: '#2A2B32', padding: '1rem', borderRadius: '6px', color: '#ECECF1', borderLeft: '4px solid #10a37f' }}>
                                    {result.experience_relevance}
                                </p>
                            </div>
                        </div>

                        {/* 3. Recommendations Footer */}
                        <div style={{ background: '#2A2B32', borderTop: '1px solid #4d4d4f', padding: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                {/* Candidate Recs */}
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: '#C5C5D2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Recommendations for Candidate</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {result.candidate_recommendations && result.candidate_recommendations.map((rec, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '0.75rem' }}>
                                                <div style={{
                                                    background: '#343541', color: '#c5c5d2', width: '20px', height: '20px', borderRadius: '50%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, fontWeight: 'bold'
                                                }}>{idx + 1}</div>
                                                <span style={{ fontSize: '0.9rem', color: '#ECECF1' }}>{rec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Recruiter Recs */}
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: '#C5C5D2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Recommendations for Recruiter</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {result.recruiter_recommendations && result.recruiter_recommendations.map((rec, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '0.75rem' }}>
                                                <div style={{
                                                    background: '#343541', color: '#c5c5d2', width: '20px', height: '20px', borderRadius: '50%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, fontWeight: 'bold'
                                                }}>{idx + 1}</div>
                                                <span style={{ fontSize: '0.9rem', color: '#ECECF1' }}>{rec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

            // Update Conversation with AI Response and Title
            setConversations(prev => prev.map(c => {
                if (c.id === currentId) {
                    const newTitle = c.title === "New Analysis"
                        ? `${result.match_score} - ${inputTypes.cv === 'file' ? (cvFile?.name || 'Candidate') : 'Candidate'}`
                        : c.title;

                    return {
                        ...c,
                        title: newTitle,
                        messages: [...updatedMessages, { type: 'ai', content: aiContent }]
                    };
                }
                return c;
            }));

        } catch (error) {
            console.error(error);
            setConversations(prev => prev.map(c =>
                c.id === currentId
                    ? { ...c, messages: [...updatedMessages, { type: 'ai', content: "Error: " + (error.message || "Failed to analyze.") }] }
                    : c
            ));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <button className="new-chat-btn" onClick={createNewAnalysis}>
                    <Plus size={16} /> New Analysis
                </button>

                <div className="nav-section">
                    <div className="nav-label">History</div>
                    {conversations.map(conv => (
                        <div
                            key={conv.id}
                            className={`nav-item ${activeId === conv.id ? 'active' : ''}`}
                            style={{ backgroundColor: activeId === conv.id ? '#2A2B32' : 'transparent' }}
                            onClick={() => setActiveId(conv.id)}
                        >
                            <MessageSquare size={16} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{conv.title}</span>
                        </div>
                    ))}
                </div>

                <div className="user-menu">
                    <div className="nav-item">
                        <Settings size={16} /> Settings
                    </div>
                </div>
            </aside>

            {/* Main Chat */}
            <main className="main-chat">
                <div className="chat-history">
                    {activeConversation.messages.map((msg, idx) => (
                        <div key={idx} className={`message-row ${msg.type}`}>
                            <div className="message-content">
                                <div className={`avatar ${msg.type}`}>
                                    {msg.type === 'ai' ? <Cpu size={18} color="white" /> : <User size={18} color="white" />}
                                </div>
                                <div className="message-text">
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message-row ai">
                            <div className="message-content">
                                <div className="avatar ai"><Cpu size={18} color="white" /></div>
                                <div className="message-text">
                                    <Loader className="animate-spin" size={20} /> Analyzing documents...
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="input-container">
                    <div className="input-box-wrapper">

                        <div className="upload-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {/* CV Section */}
                            <div className="upload-section">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#C5C5D2', fontWeight: 600 }}>
                                    <span>CV / Resume</span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => setInputTypes(prev => ({ ...prev, cv: 'file' }))}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: inputTypes.cv === 'file' ? '#10A37F' : '#666', padding: 0, fontWeight: inputTypes.cv === 'file' ? 700 : 400 }}
                                        >File</button>
                                        <span style={{ color: '#666' }}>|</span>
                                        <button
                                            onClick={() => setInputTypes(prev => ({ ...prev, cv: 'text' }))}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: inputTypes.cv === 'text' ? '#10A37F' : '#666', padding: 0, fontWeight: inputTypes.cv === 'text' ? 700 : 400 }}
                                        >Text</button>
                                    </div>
                                </div>

                                {inputTypes.cv === 'file' ? (
                                    <div
                                        className={`upload-card ${cvFile ? 'active' : ''}`}
                                        style={{ minHeight: '100px', height: '100px' }}
                                        onClick={() => document.getElementById('cv-upload').click()}
                                    >
                                        <Upload size={20} style={{ marginBottom: '0.5rem' }} />
                                        <div className="file-status">{cvFile ? cvFile.name : "Upload PDF/DOCX"}</div>
                                        <input type="file" id="cv-upload" hidden accept=".pdf,.docx,.txt" onChange={(e) => handleFileChange(e, 'cv')} />
                                    </div>
                                ) : (
                                    <textarea
                                        placeholder="Paste CV text..."
                                        value={cvText}
                                        onChange={e => setCvText(e.target.value)}
                                        style={{
                                            background: '#40414F', border: '1px solid #565869', color: 'white',
                                            borderRadius: '0.5rem', padding: '0.75rem', height: '100px', width: '100%', resize: 'none', fontFamily: 'inherit'
                                        }}
                                    />
                                )}
                            </div>

                            {/* JD Section */}
                            <div className="upload-section">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#C5C5D2', fontWeight: 600 }}>
                                    <span>Job Description</span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => setInputTypes(prev => ({ ...prev, jd: 'file' }))}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: inputTypes.jd === 'file' ? '#10A37F' : '#666', padding: 0, fontWeight: inputTypes.jd === 'file' ? 700 : 400 }}
                                        >File</button>
                                        <span style={{ color: '#666' }}>|</span>
                                        <button
                                            onClick={() => setInputTypes(prev => ({ ...prev, jd: 'text' }))}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: inputTypes.jd === 'text' ? '#10A37F' : '#666', padding: 0, fontWeight: inputTypes.jd === 'text' ? 700 : 400 }}
                                        >Text</button>
                                    </div>
                                </div>

                                {inputTypes.jd === 'file' ? (
                                    <div
                                        className={`upload-card ${jdFile ? 'active' : ''}`}
                                        style={{ minHeight: '100px', height: '100px' }}
                                        onClick={() => document.getElementById('jd-upload').click()}
                                    >
                                        <FileText size={20} style={{ marginBottom: '0.5rem' }} />
                                        <div className="file-status">{jdFile ? jdFile.name : "Upload PDF/DOCX"}</div>
                                        <input type="file" id="jd-upload" hidden accept=".pdf,.docx,.txt" onChange={(e) => handleFileChange(e, 'jd')} />
                                    </div>
                                ) : (
                                    <textarea
                                        placeholder="Paste JD text..."
                                        value={jdText}
                                        onChange={e => setJdText(e.target.value)}
                                        style={{
                                            background: '#40414F', border: '1px solid #565869', color: 'white',
                                            borderRadius: '0.5rem', padding: '0.75rem', height: '100px', width: '100%', resize: 'none', fontFamily: 'inherit'
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#8E8EA0' }}>AI can make mistakes. Review generated results.</span>
                            <button className="analyze-btn" disabled={loading} onClick={handleMatch}>
                                <Send size={16} /> Analyze
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
