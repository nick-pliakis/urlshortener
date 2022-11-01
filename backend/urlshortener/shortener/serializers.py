from rest_framework import serializers
from .models import Url

class PetSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Url
        fields = '__all__'