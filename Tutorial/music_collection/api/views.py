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
    #When a client sends a POST request to the view, Django will automatically invoke this method
    #self: This is a reference to the instance of the class
    def post(self, request, format=None):
        #check if the user session already exists or not expired
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        #from the request, get the data
        serializer = self.serializer_class(data=request.data)
        #check if the data contains the serialised data required from the createroomseria...
        if serializer.is_valid():
            #if calid, means the 2 data s in the request
            #now we can get them using get method
            guests_can_pause =serializer.data.get("guests_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            #we get the host "Id" from the session
            host=self.request.session.session_key
            #now we get all the existing rooms created by the host
            queryset = Room.objects.filter(host=host)
            #if the host(the session or the user) has an account or active session
            if queryset.exists():
                #get the first room(most deffo will be 1 anyways)
                room = queryset[0]
                #now assign the data from the serialiser(request) to vroom details if the room exist
                room.guests_can_pause = guests_can_pause
                room.votes_to_skip = votes_to_skip
                #we want to update some fields
                room.save(update_fields=['guests_can_pause', 'votes_to_skip'])
            else:
                #if the queryset ie empty(no room with that sessio) we create a new room
                room =Room(host=host, guests_can_pause = guests_can_pause, votes_to_skip = votes_to_skip)
                room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        
class getRoom(APIView):
    serializer =RoomSerializer
    lookup_url_kwarg ='code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            #filter room objects for the room with the code in the url
            room = Room.objects.filter(code=code)
            if len(room)>0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key ==room[0].host

                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)