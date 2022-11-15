from django.urls import path
from Apps.tipoProductos.views import TipoProductoList, TipoProductoDetail


app_name = "tipoProductos"

urlpatterns = [
    path('', TipoProductoList.as_view()),
    path('<int:pk>', TipoProductoDetail.as_view()),
]
