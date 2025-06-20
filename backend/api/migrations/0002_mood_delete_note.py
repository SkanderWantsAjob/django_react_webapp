# Generated by Django 5.2.1 on 2025-05-30 22:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Mood',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mood_type', models.CharField(choices=[('excited', 'Excited'), ('loved', 'Loved'), ('happy', 'Happy'), ('neutral', 'Neutral'), ('anxious', 'Anxious'), ('sad', 'Sad'), ('angry', 'Angry'), ('tired', 'Tired'), ('surprised', 'Surprised')], default='neutral', max_length=10)),
                ('description', models.TextField(blank=True, help_text='Optional context about the mood', null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mood_entries', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Mood Entries',
                'ordering': ['-created_at'],
            },
        ),
        migrations.DeleteModel(
            name='Note',
        ),
    ]
