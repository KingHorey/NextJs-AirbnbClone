# Generated by Django 5.1.4 on 2025-02-09 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amenities', '0002_alter_amenity_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='amenity',
            name='description',
            field=models.TextField(help_text='Provide a brief description of the amenity.', null=True),
        ),
    ]
