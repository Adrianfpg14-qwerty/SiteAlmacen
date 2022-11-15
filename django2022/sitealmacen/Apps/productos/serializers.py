from dataclasses import field
from statistics import mode

from rest_framework import serializers
from Apps.productos.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = "__all__"
        