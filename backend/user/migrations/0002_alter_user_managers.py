# Generated by Django 5.1.4 on 2024-12-31 13:25

import user.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', user.models.CustomUserManager()),
            ],
        ),
    ]
