from dataclasses import field
from statistics import mode

from rest_framework import serializers
from Apps.tipoProductos.models import TipoProducto

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = "__all__"
