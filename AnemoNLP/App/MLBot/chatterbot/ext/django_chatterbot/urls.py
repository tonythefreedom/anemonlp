from django.conf.urls import url
from .views import ChatterBotView
from . import views


urlpatterns = [
    url( r'^$', ChatterBotView.as_view(), name='chatterbot'),
]
