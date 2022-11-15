from django.db import models

# Create your models here.


class TipoProducto(models.Model):
    nombre = models.CharField(max_length=100, help_text="Ingrese el Nombre del Tipo de Producto")
    created = models.DateTimeField(auto_now=True, verbose_name="Fecha de Creacion")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de Edicion")

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "tipoProducto"
        verbose_name_plural = "tipoProductos"

