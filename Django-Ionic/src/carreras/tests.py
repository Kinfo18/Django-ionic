from django.test import TestCase

from django.contrib.auth import get_user_model

from .models import Carrera
carrera = get_codigo_model()


class StatusTestCase(TestCase): 
    def setUp(self): 
        codigo =  carrera.objects.create(username='cfe', email='Hola, Bienvenido')
        codigo.set_password("123456")
        codigo.save()

    def test_creating_status(self):
        user = carrera.objects.get(username='cfe')
        obj = Carrera.objects.create(user=codigo, content='Un contenido nuevo y genial')
        self.assertEqual(obj.id, 1)
        qs = Carrera.objects.all()
        self.assertEqual(qs.count(), 1)
