
from django.urls import path 
from .views import RoomView, CreateRoomView, getRoom, JoinRoom
urlpatterns = [
    #endpoint
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', getRoom.as_view()),
    path('join-room', JoinRoom.as_view())
]
