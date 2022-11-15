from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import status

from Apps.ventas.models import Venta
from Apps.ventas.serializers import VentaSerializer

# Create your views here.


class VentaList(APIView):
    """
    Lista de Ventas
    """

    def get(self, request, format=None):
        ventas = Venta.objects.all()
        serializer = VentaSerializer(ventas, many=True)
        return Response({"ventas":serializer.data})

    def post(self, request, format=None):
        serializer = VentaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VentaDetail(APIView):
    """
    Retrieve, update or delete de los ventas por pk
    """
    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return Venta.objects.get(pk=pk)
        except Venta.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        venta = self.get_object(pk)
        serializer = VentaSerializer(venta)
        return Response({"venta":serializer.data})

    def put(self, request, pk, format=None):
        venta = self.get_object(pk)
        serializer = VentaSerializer(venta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        venta = self.get_object(pk)
        serializer = VentaSerializer(venta,
                                           data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        venta = self.get_object(pk)
        venta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

