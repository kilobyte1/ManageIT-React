from .views import index
from django.urls import path


urlpatterns = [
    #whenever we create a new page, we have to add the path to django and react 
    path('', index),
    path('join', index),
    path('create', index),
    #< means after the url there will be a of type string
    path('room/<str:roomCode>', index)
    
]