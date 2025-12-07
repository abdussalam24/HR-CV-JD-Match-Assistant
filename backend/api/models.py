from django.db import models

class JobDescription(models.Model):
    title = models.CharField(max_length=255, blank=True)
    text = models.TextField(blank=True)
    file = models.FileField(upload_to='jds/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"JD {self.id}"

class CandidateCV(models.Model):
    name = models.CharField(max_length=255, blank=True)
    text = models.TextField(blank=True)
    file = models.FileField(upload_to='cvs/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name or f"CV {self.id}"

class MatchAnalysis(models.Model):
    cv = models.ForeignKey(CandidateCV, on_delete=models.CASCADE)
    jd = models.ForeignKey(JobDescription, on_delete=models.CASCADE)
    match_score = models.FloatField()
    match_level = models.CharField(max_length=50)
    analysis_json = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Match {self.cv} vs {self.jd}: {self.match_score}%"
