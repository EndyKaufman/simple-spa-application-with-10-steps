from __future__ import unicode_literals
from django.db import models
from rest_framework import routers, serializers, viewsets

class Detail(models.Model):
    title = models.TextField(max_length=512)
    image = models.ImageField(upload_to='images')

class Master(models.Model):
    title = models.TextField(max_length=512)
    details = models.ManyToManyField(Detail, blank=True)

class DetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Detail
        fields = ('title', 'image')

class DetailViewSet(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer

class MasterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Master
        fields = ('title', 'details')
        
class MasterViewSet(viewsets.ModelViewSet):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer