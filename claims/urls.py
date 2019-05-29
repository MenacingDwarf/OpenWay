from django.urls import path
from . import views

urlpatterns = [
    path('', views.start, name="start"),
    path('claim/', views.claim, name="claim"),
    path('claim/admin/', views.admin, name="claim_admin")
]
