from django.urls import path
from . import views

urlpatterns = [
    path('upload-jd/', views.upload_jd, name='upload_jd'),
    path('upload-cv/', views.upload_cv, name='upload_cv'),
    path('match/', views.match, name='match'),
]
