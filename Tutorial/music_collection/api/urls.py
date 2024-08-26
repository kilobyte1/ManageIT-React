
from django.urls import path 
from .views import RoomView
urlpatterns = [
    #endpoint
    path('room', RoomView.as_view()),
]
