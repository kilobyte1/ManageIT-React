from .views import index
from django.urls import path


urlpatterns = [
    #whenever we create a new page, we have to add the path to django and react 
    path('', index),
    path('join', index),
    path('create-room', index)
    
]