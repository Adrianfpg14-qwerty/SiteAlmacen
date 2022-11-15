import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ProductoI } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.css'],
})
export class MostrarProductoComponent implements OnInit {
  public productos: ProductoI[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarProductos();
  }

  mostrarProductos() {
    this.productoService.getAllProducto().subscribe({
      next: (data) => {
        this.productos = data.productos;
        console.log(this.productos);
      },
    });
  }

  eliminar(id: number): void {
    this.router.navigateByUrl('/productos');
    this.productoService.deleteProducto(id).subscribe(
      () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Notificación',
          detail: 'Producto Eliminado',
          life: 5000,
        });
        this.mostrarProductos();
      },
      (err) => {
        console.log('error');
        this.router.navigateByUrl('/productos');
      }
    );
  }

  imprimir(id: number) { }
}
