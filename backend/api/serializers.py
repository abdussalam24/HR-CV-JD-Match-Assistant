from rest_framework import serializers
from .models import JobDescription, CV


class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDescription
        fields = ['id', 'text', 'file', 'created_at']


class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = ['id', 'text', 'file', 'created_at']
