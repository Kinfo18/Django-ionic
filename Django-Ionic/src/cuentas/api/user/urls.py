from django.conf.urls import url, include
from django.contrib import admin


from .views import UserDetailAPIView, UserCarreraAPIView
urlpatterns = [
    url(r'^(?P<usuario>\w+)/$', UserDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<usuario>\w+)/carrera/$', UserStatusAPIView.as_view(), name='carrera-list'),
]