from django.contrib import admin
# from Apps.productos.models import Producto, TipoProducto

from Apps.productos.models import Producto
# Register your models here.

class ProductoAdmin(admin.ModelAdmin):
    pass

# admin.site.register(TipoProducto)
# admin.site.register(Producto, ClienteAdmin)

admin.site.register(Producto, ProductoAdmin)
