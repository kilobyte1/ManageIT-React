
from django.urls import path 
from .views import RoomView, CreateRoomView
urlpatterns = [
    #endpoint
    path('create-room', CreateRoomView.as_view()),
]
