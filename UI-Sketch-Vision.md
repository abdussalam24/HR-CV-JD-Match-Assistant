# UI Sketch & Vision (Revised)

## 1. Visualizing the Final Product

Below is a low-fidelity wireframe representation of the **Chat-based Interface** currently implemented for the CV-JD Match Assistant.

```text
+---------------------+------------------------------------------------------------------+
| [LOGO] SmartRecruit |  CURRENT CHAT: 85% - Senior Python Dev...                        |
+---------------------+------------------------------------------------------------------+
|                     |                                                                  |
|  + NEW ANALYSIS     |  [ AI ]                                                          |
|                     |   I've completed the analysis. Here are the results:             |
|  HISTORY            |                                                                  |
|  -----------------  |   +----------------------------------------------------------+   |
|  > 85% - Python...  |   |  92%  |  STRONG MATCH                                    |   |
|  > 42% - Java Dev   |   | [GREEN]                                                  |   |
|  > 70% - FullStack  |   |                                                          |   |
|                     |   |  SUMMARY: Strong technical fit. Meets all core reqs.     |   |
|                     |   |                                                          |   |
|                     |   |  [+] STRONG MATCHES (Green)                              |   |
|                     |   |      • Python, Django, AWS, Docker                       |   |
|                     |   |                                                          |   |
|                     |   |  [-] MISSING / CRITICAL (Red)                            |   |
|  [Settings]         |   |      • Kubernetes                                        |   |
|                     |   +----------------------------------------------------------+   |
|                     |                                                                  |
|                     |                                                                  |
+---------------------+------------------------------------------------------------------+
|                     |  INPUT AREA (Fixed Bottom)                                       |
|                     |  +------------------------------------------------------------+  |
|                     |  |  CV INPUT: [File] | Text       JD INPUT: [File] | Text     |  |
|                     |  |  +----------------------+      +----------------------+    |  |
|                     |  |  | [ICON] Upload CV     |      | [ICON] Upload JD     |    |  |
|                     |  |  | "john_doe_cv.pdf"    |      | "senior_dev_jd.docx" |    |  |
|                     |  |  +----------------------+      +----------------------+    |  |
|                     |  |                                            [ ANALYZE > ]   |  |
|                     |  +------------------------------------------------------------+  |
+---------------------+------------------------------------------------------------------+
```

## 2. Key UI Decisions

### Chat-First Paradigm ("ChatGPT Style")
*   **Decision**: The interface mimics a conversational AI agent rather than a static dashboard.
*   **Rationale**: 
    *   **Familiarity**: Users are accustomed to LLM interfaces (ChatGPT, Gemini).
    *   **History**: It naturally handles multiple "sessions" or "analyses" as a history list on the left sidebar.
    *   **Flow**: It reinforces the idea of an "Assistant" that you talk to (via uploading files) and it responds with data.

### Unified Input Panel
*   **Decision**: A fixed bottom panel containing both CV and JD inputs side-by-side.
*   **Rationale**: 
    *   **Comparison**: Keeps the context close. You define the "Problem" (JD) and the "Solution" (CV) in one view before asking the AI to solve it.
    *   **Flexibility**: Toggles for "File" vs "Text" allow for quick copy-paste testing without needing to save dummy files.

### The "Result Card" Micro-UI
*   **Decision**: The analysis result is a rich HTML card embedded in the chat stream, not just plain text.
*   **Rationale**:
    *   **Scannability**: Uses color (`#10a37f` Green, `#ef4146` Red) to guide the eye immediately to strengths and weaknesses.
    *   **Hierarchy**: The Match Score (large font) is the primary anchor, followed by the "Why" (Skills), followed by "Recommendations".

### Dark Mode Aesthetics
*   **Decision**: Defaulting to a high-contrast Dark Mode (Anthracite `#343541`, Black `#202123`).
*   **Rationale**:
    *   **Modern Feel**: Aligns with modern developer/recruiter tools.
    *   **Readability**: High contrast text (`#ECECF1`) on dark backgrounds reduces eye strain during long reviewing sessions.
