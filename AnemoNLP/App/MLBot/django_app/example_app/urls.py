from django.conf.urls import include, url
from django.contrib import admin
from views import ChatterBotView


urlpatterns = [
    url(r'^admin/', include(admin.site.urls), name='admin'),
    url(r'^chatterbot', ChatterBotView.as_view(), name='main'),
    url(r'^', include('learningdata_app.urls'), name = 'index'),
    url(r'^learningdata', include('learningdata_app.urls'), name = 'learning'),
]
