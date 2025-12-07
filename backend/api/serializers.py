from rest_framework import serializers
from .models import JobDescription, CandidateCV, MatchAnalysis

class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDescription
        fields = '__all__'

class CandidateCVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateCV
        fields = '__all__'

class MatchAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchAnalysis
        fields = '__all__'
