# Generated by Django 2.1.2 on 2018-10-15 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ec', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exceltable',
            name='name',
            field=models.CharField(max_length=45, unique=True),
        ),
    ]
