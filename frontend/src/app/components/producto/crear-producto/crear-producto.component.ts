import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductoI } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

// TIPO PRODUCTO
import { tipoProductoI } from 'src/app/models/tipoProducto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {

  // TIPO PRODUCTO
  public tipoProductos: tipoProductoI[] = [];

  public id: number = 0;
  public form: FormGroup = this.formBuilder.group({
    id: [''],
    nombre: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    stockmin: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],

    // TIPO PRODUCTO
    tipoProducto: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private messageService: MessageService,
    private router: Router,
    // private route: ActivatedRoute

    // TIPO PRODUCTO
    private tipoproductoService: TipoProductoService
  ) { }

  ngOnInit(): void {
    // TIPO PRODUCTO
    this.mostrarTipoProducto();
  }

  // TIPO PRODUCTO
  mostrarTipoProducto() {
    this.tipoproductoService.getAlltipoProducto().subscribe((data) => {
      this.tipoProductos = data.tipoProductos;
      console.log(this.tipoProductos)
    });
  }

  onSubmit(): void {
    const formValue: ProductoI = this.form.value;
    console.log(formValue);
    this.productoService.createProducto(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Notificación',
            detail: 'Producto Creado',
            life: 5000,
          });
        }, 0);
        this.router.navigateByUrl('productos');
      },
      (err) => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/productos');
  }

  get nombre() { return this.form.get('nombre');}
  get marca() { return this.form.get('marca'); }
  get precio() { return this.form.get('precio'); }
  get stockmin() { return this.form.get('stockMin'); }
  get cantidad() { return this.form.get('cantidad'); }
  get tipoProducto() { return this.form.get('tipoProducto'); }
  
}
