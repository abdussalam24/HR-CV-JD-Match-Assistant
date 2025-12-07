from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import JobDescription, CV
from .serializers import JobDescriptionSerializer, CVSerializer
from .utils import analyze_match


@api_view(['POST'])
def upload_jd(request):
    """Upload a job description (file or text)"""
    try:
        if 'file' in request.FILES:
            jd = JobDescription.objects.create(file=request.FILES['file'])
            # Extract text from file
            from .utils import extract_text_from_file
            try:
                with jd.file.open('rb') as f:
                    extracted_text = extract_text_from_file(f)
                    jd.text = extracted_text if extracted_text else "Error: Could not extract text from file"
                    print(f"Extracted JD text ({len(jd.text)} chars): {jd.text[:100]}...")
                jd.save()
            except Exception as e:
                print(f"Error extracting JD text: {e}")
                jd.text = f"Error extracting text: {str(e)}"
                jd.save()
        elif 'text' in request.data:
            jd = JobDescription.objects.create(text=request.data['text'])
            print(f"JD text input ({len(jd.text)} chars): {jd.text[:100]}...")
        else:
            return Response({'error': 'No file or text provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = JobDescriptionSerializer(jd)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        print(f"Error in upload_jd: {e}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def upload_cv(request):
    """Upload a CV (file or text)"""
    try:
        if 'file' in request.FILES:
            cv = CV.objects.create(file=request.FILES['file'])
            # Extract text from file
            from .utils import extract_text_from_file
            try:
                with cv.file.open('rb') as f:
                    extracted_text = extract_text_from_file(f)
                    cv.text = extracted_text if extracted_text else "Error: Could not extract text from file"
                    print(f"Extracted CV text ({len(cv.text)} chars): {cv.text[:100]}...")
                cv.save()
            except Exception as e:
                print(f"Error extracting CV text: {e}")
                cv.text = f"Error extracting text: {str(e)}"
                cv.save()
        elif 'text' in request.data:
            cv = CV.objects.create(text=request.data['text'])
            print(f"CV text input ({len(cv.text)} chars): {cv.text[:100]}...")
        else:
            return Response({'error': 'No file or text provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CVSerializer(cv)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        print(f"Error in upload_cv: {e}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def match(request):
    """Analyze match between JD and CV"""
    jd_id = request.data.get('jd_id')
    cv_id = request.data.get('cv_id')
    
    if not jd_id or not cv_id:
        return Response({'error': 'Both jd_id and cv_id are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        jd = JobDescription.objects.get(id=jd_id)
        cv = CV.objects.get(id=cv_id)
        
        print(f"\n=== MATCH ANALYSIS ===")
        print(f"JD ID: {jd_id}, CV ID: {cv_id}")
        print(f"JD text ({len(jd.text)} chars): {jd.text[:200]}...")
        print(f"CV text ({len(cv.text)} chars): {cv.text[:200]}...")
        
        result = analyze_match(cv.text, jd.text)
        
        print(f"Match result: {result['match_score']} - {result['match_level']}")
        print(f"=== END ANALYSIS ===\n")
        
        return Response(result, status=status.HTTP_200_OK)
    except (JobDescription.DoesNotExist, CV.DoesNotExist):
        return Response({'error': 'JD or CV not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error in match: {e}")
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

