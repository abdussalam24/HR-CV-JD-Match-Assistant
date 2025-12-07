from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JobDescription, CandidateCV, MatchAnalysis
from .serializers import JobDescriptionSerializer, CandidateCVSerializer, MatchAnalysisSerializer
from .utils import analyze_match, extract_text_from_file

class UploadJDView(APIView):
    def post(self, request):
        data = request.data.copy()
        file = request.FILES.get('file')
        if file and not data.get('text'):
            data['text'] = extract_text_from_file(file)
            
        serializer = JobDescriptionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UploadCVView(APIView):
    def post(self, request):
        data = request.data.copy()
        file = request.FILES.get('file')
        if file and not data.get('text'):
            data['text'] = extract_text_from_file(file)

        serializer = CandidateCVSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MatchView(APIView):
    def post(self, request):
        cv_id = request.data.get('cv_id')
        jd_id = request.data.get('jd_id')
        
        try:
            cv = CandidateCV.objects.get(id=cv_id)
            jd = JobDescription.objects.get(id=jd_id)
        except (CandidateCV.DoesNotExist, JobDescription.DoesNotExist):
            return Response({"error": "CV or JD not found"}, status=status.HTTP_404_NOT_FOUND)
            
        analysis_result = analyze_match(cv.text, jd.text)
        
        match = MatchAnalysis.objects.create(
            cv=cv,
            jd=jd,
            match_score=float(analysis_result['match_score'].strip('%')),
            match_level=analysis_result['match_level'],
            analysis_json=analysis_result
        )
        
        return Response(analysis_result, status=status.HTTP_200_OK)
