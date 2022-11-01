from django.db import models

# Create your models here.
class Url(models.Model):
    url = models.CharField(max_length=500)
    shortened_url = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)