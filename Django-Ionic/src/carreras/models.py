from django.conf import settings
from django.db import models

'''
JSON -- JavaScript Object Notation
'''

def upload_carrera_image(instance, nombre):
    return "status/{codigo}/{nombre}".format(codigo=instance.codigo, nombre=nombre)


class CarreraQuerySet(models.QuerySet):
    pass


class CarreraManager(models.Manager):
    def get_queryset(self):
        return CarreraQuerySet(self.model, using=self._db)


class Status(models.Model): # fb status, instagram post, tweet, linkedin post
    codigo        = models.ForeignKey(settings.AUTH_USER_MODEL) # User instance .save()
    nombre     = models.TextField(null=True, blank=True)
    departamento       = models.ImageField(upload_to=upload_carrera_image, null=True, blank=True)  # Django Storages --> AWS S3

    objects = CarreraManager()

    def __str__(self):
        return str(self.nombre)[:50]

    class Meta:
        verbose_name = 'Status post'
        verbose_name_plural = 'Status posts'

    @property
    def owner(self):
        return self.user





