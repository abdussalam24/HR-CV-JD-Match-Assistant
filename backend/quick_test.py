import requests

# Test text upload
print("Testing JD text upload...")
jd_response = requests.post('http://127.0.0.1:8000/api/upload-jd/', data={'text': 'Python Developer with Django needed'})
print(f"JD Response: {jd_response.status_code}")
print(f"JD Data: {jd_response.json()}")

print("\nTesting CV text upload...")
cv_response = requests.post('http://127.0.0.1:8000/api/upload-cv/', data={'text': 'Python Developer with 5 years Django experience'})
print(f"CV Response: {cv_response.status_code}")
print(f"CV Data: {cv_response.json()}")

print("\nTesting match...")
match_response = requests.post('http://127.0.0.1:8000/api/match/', json={
    'jd_id': jd_response.json()['id'],
    'cv_id': cv_response.json()['id']
})
print(f"Match Response: {match_response.status_code}")
if match_response.status_code == 200:
    print(f"Match Result: {match_response.json()}")
else:
    print(f"Error: {match_response.text}")
