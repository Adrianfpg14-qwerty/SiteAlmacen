from django.urls import path
from Apps.productos.views import ProductoList, ProductoDetail


app_name = "productos"

urlpatterns = [
    path('', ProductoList.as_view()),
    path('<int:pk>', ProductoDetail.as_view()),
]
