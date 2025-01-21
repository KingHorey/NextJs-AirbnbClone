from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0011_alter_address_town'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='address',
            options={'verbose_name_plural': 'Addresses'},
        ),
    ]
