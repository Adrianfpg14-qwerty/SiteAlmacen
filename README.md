# SITE ALMACEN
Aplicación Web Básica para realizar registros en un almacén,


## Técnologías implementadas
* Django  [Backend]
* Angular [Fronted]
* MySql	  [DB]


## Instalaciones Previas
* Linux o Windows Subsystem for Linux (Si estas en Windows)
* Python, pip, and venv
* Node.js
* MySQL
* Angular



## RUN BACKEND
En el archivo [django2022/sitealmacen/sitealmacen/settings.py]  
Modifica [*'PASSWORD': 'dev'*] por la contraseña que utilizas para acceder a MySQL
```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'almacen2022_mysql',
        'USER': 'root',
        'PASSWORD': 'dev',
        'HOST': 'localhost',
        'PORT': '3306'        
    }
}
```

Crea la base de datos
```console
sudo /etc/init.d/mysql start
sudo mysql -u root -p
create database almacen2022_mysql;
exit;
```

Entorno virtual y herramientas
```console
cd django2022
rm -R .venv
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install django
python3 -m pip install mysqlclient
pip install django-cors-headers
pip install djangorestframework
cd sitealmacen
```

Migraciones y levantar servidor de Backend
```console
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```


## RUN FRONTEND
cd frontend  
npm i  
ng serve  


## URLs/RUTAS
[Backend]  
localhost:8000/clientes  
localhost:8000/ventas  
localhost:8000/productos  
localhost:8000/tipoProductos  

[Frontend]  
localhost:4200/clientes  
localhost:4200/ventas  
localhost:4200/productos  
localhost:4200/tipoProductos  


## CONSIDERACIONES
Django está configurado para correr en el puerto [8000]  
Angular está configurado para correr en el puerto [4200]  

```console
LIBERA LOS PUERTOS:
fuser -k 8000/tcp
fuser -k 4200/tcp
```
