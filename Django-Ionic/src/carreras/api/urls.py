from django.conf.urls import url

from .views import (
    CarreraAPIView, 
    CarreraAPIDetailView,
    )

urlpatterns = [
    url(r'^$', CarreraAPIView.as_view(), name='list'),
    url(r'^(?P<id>\d+)/$', CarreraAPIDetailView.as_view(), name='detail'),
]
