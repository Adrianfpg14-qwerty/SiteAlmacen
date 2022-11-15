import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VentaI } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-actualizar-venta',
  templateUrl: './actualizar-venta.component.html',
  styleUrls: ['./actualizar-venta.component.css'],
})
export class ActualizarVentaComponent implements OnInit {
  public id: number = 0;
  public form: FormGroup = this.formBuilder.group({
    id: [''],
    fecha: ['', [Validators.required]],
    subtotal: ['', [Validators.required]],
    descuento: ['', [Validators.required]],
    total: ['', [Validators.required]],

    usuario: [1]
  });

  constructor(
    private formBuilder: FormBuilder,
    private ventaService: VentaService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // let idventa = this.route.snapshot.paramMap.get("id");
    this.getVenta(this.id);
  }

  getVenta(id: number) {
    this.ventaService.getOneVenta(id).subscribe({
      next: (data) => {
        this.form.setValue(data.venta);
        console.log(data.venta)
      },
    });
  }

  onSubmit(): void {
    const formValue: VentaI = this.form.value;
    const id: number = this.form.value.id;
    this.ventaService.updateVenta(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Notificación',
            detail: 'Venta Actualizada',
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

}
