"""
URL configuration for music_collection project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
        
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    #using 'include('api.urls')' means all the url paths in the api.url will be avialable to the project
    #Instead of putting all URL patterns in the main urls.py file 
        #(usually located in the project directory) (here), we will delegate some of them to individual apps.
     #<<<include() allows you to include these app-specific URL configurations in the main urls.py. 
     #This makes the project easier to maintain and organise.>>>
    path('', include('api.urls')),
       
    
]
