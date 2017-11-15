from django.conf.urls import include, url
from django.contrib import admin
from chatterbot.ext.django_chatterbot import urls as chatterbot_urls
from example_app.views import ChatterBotAppView


urlpatterns = [
    url(r'^admin/', include(admin.site.urls), name='admin'),
    url(r'^chatterbot', ChatterBotAppView.as_view(), name='main'),
    url(r'^api/chatterbot/', include(chatterbot_urls, namespace='chatterbot')),
    url(r'^', include('learningdata_app.urls'), name = 'index'),
    url(r'^learningdata', include('learningdata_app.urls'), name = 'learning'),
]
