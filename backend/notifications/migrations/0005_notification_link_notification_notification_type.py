# Generated by Django 5.1.4 on 2025-01-16 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0004_rename_id_deleted_notification_is_deleted'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='link',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='notification',
            name='notification_type',
            field=models.CharField(choices=[('review', 'Review'), ('booking', 'Booking'), ('payment', 'Payment'), ('amenity', 'Amenity')], default='review', max_length=50),
            preserve_default=False,
        ),
    ]