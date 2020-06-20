from django.contrib import admin

from .forms import CarreraForm
from .models import Carrera


class StatusAdmin(admin.ModelAdmin):
    list_display = ['user', '__str__', 'image']
    form = StatusForm
    # class Meta:
    #     model = Carrera


admin.site.register(Carrera, StatusAdmin)