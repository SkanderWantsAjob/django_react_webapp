from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics

from .models import Mood
from .serializers import MoodSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

class MoodListCreate(generics.ListCreateAPIView):
    serializer_class = MoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Mood.objects.filter(author=user)

    def perform_create(self, serializer=MoodSerializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class MoodDelete(generics.DestroyAPIView):
    serializer_class = MoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Mood.objects.filter(author=user)