# Generated by Django 3.2.16 on 2022-10-30 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shortener', '0003_alter_url_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url',
            name='shortened_url',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]