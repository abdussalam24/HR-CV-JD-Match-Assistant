# Test Plan: HR CV-JD Match Assistant

## Overview
This document outlines the test strategy for the CV-JD Match Assistant. The goal is to verify the accuracy of the matching logic, the resilience of the system against invalid inputs, and the clarity of the UI feedback.

---

## Test Cases

| ID | Test Scenario | Input Data | Steps | Expected Outcome | Actual Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | **Perfect Match** | **JD**: "Python Developer. Must know Django, DRF, and SQL."<br><br>**CV**: "Expert Python Developer with 5 years in Django, Django Rest Framework, and MySQL/PostgreSQL." | 1. Navigate to Match Page.<br>2. Paste JD text.<br>3. Paste CV text.<br>4. Click 'Analyze'. | **Score**: > 85%<br>**Status**: Green/High Match.<br>**Analysis**: All skills listed as matches. | (To be filled during execution) |
| **TC-002** | **Partial Match** | **JD**: "Senior React Developer. Needs Redux, TypeScript, and AWS knowledge."<br><br>**CV**: "Junior Frontend Dev. Proficient in React and simple CSS. Learning TypeScript." | 1. Navigate to Match Page.<br>2. Paste JD text.<br>3. Paste CV text.<br>4. Click 'Analyze'. | **Score**: 40-60%<br>**Status**: Yellow/Moderate.<br>**Analysis**: React matches. AWS and Senior experience flagged as missing. | (To be filled during execution) |
| **TC-003** | **Irrelevant Match** | **JD**: "Accountant. CPA required. Tax filing experience."<br><br>**CV**: "Chef. 10 years managing kitchens. Expert in French cuisine." | 1. Navigate to Match Page.<br>2. Paste JD text.<br>3. Paste CV text.<br>4. Click 'Analyze'. | **Score**: < 20%<br>**Status**: Red/Low Match.<br>**Analysis**: Core keywords (CPA, Tax) listed as missing. | (To be filled during execution) |
| **TC-004** | **Empty Fields Validation** | **JD**: [Empty]<br><br>**CV**: "Experienced Developer..." | 1. Navigate to Match Page.<br>2. Leave JD field blank.<br>3. Paste CV text.<br>4. Click 'Analyze'. | **Error**: System should display a validation error: "Please enter both a Job Description and a CV." | (To be filled during execution) |
| **TC-005** | **Gibberish / Noise Input** | **JD**: "lorem ipsum dolor sit amet"<br><br>**CV**: "asdf jkl; qwer tyui" | 1. Navigate to Match Page.<br>2. Paste nonsensical JD.<br>3. Paste nonsensical CV.<br>4. Click 'Analyze'. | **Score**: Low / Close to 0%.<br>**Analysis**: Should handle gracefully without crashing. Might recommend providing valid English text. | (To be filled during execution) |

## Test Execution Notes
*   **Environment**: Localhost (Dev)
*   **Browser**: Chrome / Edge Latest
*   **Tools**: Manual Testing
