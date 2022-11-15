from dataclasses import field
from statistics import mode

from rest_framework import serializers
from Apps.ventas.models import Venta

class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = "__all__"
