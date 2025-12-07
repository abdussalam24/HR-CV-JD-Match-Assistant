import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

def test_flow():
    print("1. Testing JD Upload (Text)...")
    try:
        jd_payload = {"text": "We need a Senior Python Developer with Django, React, and AWS experience."}
        jd_res = requests.post(f"{BASE_URL}/upload-jd/", data=jd_payload)
        if jd_res.status_code != 201:
            print(f"FAILED JD Upload: {jd_res.text}")
            return
        jd_id = jd_res.json()['id']
        print(f"SUCCESS: JD Created (ID: {jd_id})")

        print("\n2. Testing CV Upload (Text)...")
        cv_payload = {"text": "I am a Python Developer with 5 years experience in Django and AWS. I am learning React."}
        cv_res = requests.post(f"{BASE_URL}/upload-cv/", data=cv_payload)
        if cv_res.status_code != 201:
            print(f"FAILED CV Upload: {cv_res.text}")
            return
        cv_id = cv_res.json()['id']
        print(f"SUCCESS: CV Created (ID: {cv_id})")

        print("\n3. Testing Match Analysis...")
        match_payload = {"jd_id": jd_id, "cv_id": cv_id}
        match_res = requests.post(f"{BASE_URL}/match/", data=match_payload)
        
        if match_res.status_code == 200:
            data = match_res.json()
            print("SUCCESS: Analysis Result:")
            print(json.dumps(data, indent=2))
        else:
            print(f"FAILED Match: {match_res.text}")

    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to server. Is it running on port 8000?")

if __name__ == "__main__":
    test_flow()
