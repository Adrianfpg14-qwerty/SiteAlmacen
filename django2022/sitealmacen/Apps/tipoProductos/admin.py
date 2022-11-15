from django.contrib import admin
from Apps.tipoProductos.models import TipoProducto


# Register your models here.

class TipoProductoAdmin(admin.ModelAdmin):
    pass

admin.site.register(TipoProducto, TipoProductoAdmin)
