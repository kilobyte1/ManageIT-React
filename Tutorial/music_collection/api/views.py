from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializer import RoomSerializer


# Create your views here.


class RoomView(generics.ListAPIView):
    #get all the rooms
    queryset =Room.objects.all()
    #return in the format specified in the serialiser
    #remember serialiser helps to convert data in a different format to send to the view
    serializer_class = RoomSerializer
