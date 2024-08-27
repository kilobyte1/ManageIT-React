from django.shortcuts import render
from rest_framework import generics,status
from .models import Room
from .serializer import RoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.


class RoomView(generics.ListCreateAPIView):
    #get all the rooms
    queryset =Room.objects.all()
    #return in the format specified in the serialiser
    #remember serialiser helps to convert data in a different format to send to the view
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guests_can_pause =serializer.data.get("guests_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            host=self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guests_can_pause = guests_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guests_can_pause', 'votes_to_skip'])
            else:
                room =Room(host=host, guests_can_pause = guests_can_pause, votes_to_skip = votes_to_skip)
                room.save()

            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        