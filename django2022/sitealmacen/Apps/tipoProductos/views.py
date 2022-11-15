from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import status

from Apps.tipoProductos.models import TipoProducto
from Apps.tipoProductos.serializers import TipoProductoSerializer

# Create your views here.


class TipoProductoList(APIView):
    """
    Lista de TipoProductos
    """

    def get(self, request, format=None):
        tipoProductos = TipoProducto.objects.all()
        serializer = TipoProductoSerializer(tipoProductos, many=True)
        return Response({"tipoProductos":serializer.data})

    def post(self, request, format=None):
        serializer = TipoProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TipoProductoDetail(APIView):
    """
    Retrieve, update or delete de los tipoProductos por pk
    """
    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return TipoProducto.objects.get(pk=pk)
        except TipoProducto.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tipoProducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoProducto)
        return Response({"tipoProducto":serializer.data})

    def put(self, request, pk, format=None):
        tipoProducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoProducto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        tipoProducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoProducto,
                                           data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        tipoProducto = self.get_object(pk)
        tipoProducto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
