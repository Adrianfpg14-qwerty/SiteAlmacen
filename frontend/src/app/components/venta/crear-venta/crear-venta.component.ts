import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VentaI } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

// CLIENTE
import { ClienteI } from 'src/app/models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css'],
})
export class CrearVentaComponent implements OnInit {

  // CLIENTE
  public clientes: ClienteI[] = [];

  public form: FormGroup = this.formBuilder.group({
    fecha: ['', [Validators.required]],
    descuento: ['', [Validators.required]],
    total: ['', [Validators.required]],
    subtotal: ['', [Validators.required]],

    cliente: ['', [Validators.required]],
    usuario: [1]
  });

  constructor(
    private formBuilder: FormBuilder,
    private ventaService: VentaService,
    private messageService: MessageService,
    private router: Router,

    // CLIENTE
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    // CLIENTE
    this.mostrarClientes();
  }

  // CLIENTE
  mostrarClientes() {
    this.clienteService.getAllCliente().subscribe({
      next: (data) => {
        this.clientes = data.clientes;
        console.log(this.clientes)
      },
    });
  }

  onSubmit(): void {
    const formValue: VentaI = this.form.value;
    console.log(formValue);
    this.ventaService.createVenta(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Notificación',
            detail: 'Venta Creada',
            life: 5000,
          });
        }, 0);
        this.router.navigateByUrl('ventas');
      },
      (err) => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/ventas');
  }

  get fecha() { return this.form.get('fecha'); }
  get subtotal() { return this.form.get('subtotal'); }
  get descuento() { return this.form.get('descuento'); }
  get total() { return this.form.get('total'); }

  get cliente() { return this.form.get('cliente'); }

}
