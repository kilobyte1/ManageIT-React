# Generated by Django 5.1 on 2024-08-25 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_room_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default='', max_length=8),
        ),
    ]
