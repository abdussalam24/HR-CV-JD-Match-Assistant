from django.db import models


class JobDescription(models.Model):
    text = models.TextField(blank=True, default='')
    file = models.FileField(upload_to='jds/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"JD {self.id} - {self.created_at.strftime('%Y-%m-%d')}"


class CV(models.Model):
    text = models.TextField(blank=True, default='')
    file = models.FileField(upload_to='cvs/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CV {self.id} - {self.created_at.strftime('%Y-%m-%d')}"
