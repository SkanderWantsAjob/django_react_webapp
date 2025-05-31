

from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CreateUserView, MoodDelete, MoodListCreate

auth_urls = [
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls"))
]

mood_urls=[
    path("api/mood/", MoodListCreate.as_view(), name="mood-list"),
    path("api/mood/delete/<int:pk>/", MoodDelete.as_view(), name="delete-mood"),
    
]

urlpatterns = auth_urls + mood_urls