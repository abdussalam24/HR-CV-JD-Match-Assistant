from django.urls import path
from .views import UploadJDView, UploadCVView, MatchView

urlpatterns = [
    path('upload-jd/', UploadJDView.as_view(), name='upload-jd'),
    path('upload-cv/', UploadCVView.as_view(), name='upload-cv'),
    path('match/', MatchView.as_view(), name='match'),
]
