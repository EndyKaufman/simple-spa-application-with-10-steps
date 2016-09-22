from __future__ import unicode_literals
from django.db import models
from rest_framework import routers, serializers, viewsets

from rest_framework import filters
from rest_framework import generics

class Detail(models.Model):
    title = models.TextField(max_length=512)
    image = models.ImageField(upload_to='images')

class Master(models.Model):
    title = models.TextField(max_length=512)
    details = models.ManyToManyField(Detail, blank=True)

class DetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Detail
        fields = ('id','title', 'image')

class DetailViewSet(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer

class DetailListView(generics.ListAPIView):
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer
    filter_backends = (filters.DjangoFilterBackend)

class MasterSerializer(serializers.HyperlinkedModelSerializer):
    details = DetailSerializer(many=True)

    class Meta:
        model = Master
        fields = ('id','title', 'details')

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        master = Master.objects.create(**validated_data)
        for details_data in details_data:
            Detail.objects.create(master=master, **details_data)
        return master
        
class MasterViewSet(viewsets.ModelViewSet):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer

class MasterListView(generics.ListAPIView):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer
    filter_backends = (filters.DjangoFilterBackend)