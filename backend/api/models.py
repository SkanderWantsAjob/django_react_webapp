from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Mood(models.Model):
    MOOD_CHOICES = [
        ('excited', 'Excited'),
        ('loved', 'Loved'),
        ('happy', 'Happy'),
        ('neutral', 'Neutral'),
        ('anxious', 'Anxious'),
        ('sad', 'Sad'),
        ('angry', 'Angry'),
        ('tired', 'Tired'),
        ('surprised', 'Surprised'),
    ]
    
    # Core Fields
    mood_type = models.CharField(
        max_length=10,
        choices=MOOD_CHOICES,
        default='neutral'
    )
    title=models.TextField(
        default="today's mood",
        blank=False,
        null=False,
        help_text="Title of the moodNote"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Optional context about the mood"
    )
    # Metadata
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="mood_entries"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Mood Entries"
    
    def __str__(self):
        return f"{self.author.username} - {self.get_mood_type_display()} ({self.created_at.date()})"