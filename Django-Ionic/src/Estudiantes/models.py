import json

from django.core.serializers import serialize
from django.conf import settings
from django.db import models

def upload_update_image(instance, filename):
    return "updates/{user}/{filename}".format(user=instance.user, filename=filename)



class UpdateQuerySet(models.QuerySet):

    def serialize(self):
        list_values = list(self.values("user", "content", "image", "id"))
        return json.dumps(list_values)


class UpdateManager(models.Manager):
    def get_queryset(self):
        return UpdateQuerySet(self.model, using=self._db)


class Update(models.Model):
    documento            = models.ForeignKey(settings.AUTH_USER_MODEL)
    nombre         = models.TextField(blank=True, null=True)
    apellido         = models.TextField(blank=True, null=True)
    email       = models.TextField(blank=True, null=True)

    objects = UpdateManager()

    def __str__(self):
        return self.nombre or ""

    def serialize(self):
        try:
            image = self.image.url
        except:
            image = ""            
        data = {
            "documento": self.documento,
            "nombre": self.nombre,
            "user": self.user.documento,
        }
        data = json.dumps(data)
        return data


