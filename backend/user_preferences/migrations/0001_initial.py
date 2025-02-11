# Generated by Django 5.1.4 on 2025-02-03 01:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPreferences',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booking_type', models.CharField(choices=[('instant', 'INSTANT'), ('booking', 'BOOKING')], default='booking', max_length=7)),
                ('language', models.CharField(choices=[('en', 'English'), ('fr', 'French'), ('es', 'Spanish'), ('de', 'German'), ('it', 'Italian'), ('zh', 'Chinese'), ('ja', 'Japanese'), ('hi', 'Hindi'), ('ru', 'Russian'), ('ar', 'Arabic')], default='en', max_length=20)),
                ('email_notifications', models.BooleanField(default=True)),
                ('timezone', models.CharField(default='UTC', max_length=50)),
                ('currency', models.CharField(choices=[('USD', 'US Dollar'), ('EUR', 'Euro'), ('NGN', 'Naira')], default='USD', max_length=10)),
                ('promotional_emails', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='preferences', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
