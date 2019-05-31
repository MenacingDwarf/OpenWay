from django.urls import path
from . import views

urlpatterns = [
    path('', views.start, name="start"),
    path('claim/', views.claim, name="claim"),
    path('claim/admin/', views.admin, name="claim_admin"),
    path('login/', views.log_in, name="login"),
    path('register/', views.register, name="register"),
    path('get_user/', views.get_user, name="get_user"),
    path('logout/', views.log_out, name="logout"),
    path('change_admin/', views.change_admin, name="change_admin")
]
