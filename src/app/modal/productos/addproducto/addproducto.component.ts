import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Productos } from '../../../modelos/productos';
import { ProductosService } from '../../../services/productos.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addproducto',
  templateUrl: './addproducto.component.html',
  styleUrls: ['./addproducto.component.css']
})
export class AddproductoComponent implements OnInit{
  productoForm!: FormGroup;

  productos : Productos = new Productos();

  constructor(
    private fb: FormBuilder,
    private api: ProductosService,
    public dialogRef: MatDialogRef<AddproductoComponent>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.productoForm = this.fb.group({
      idproducto: [0, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, Validators.required],
      stock: [0, Validators.required]
    });

  }

  ngOnInit(): void {

  }

  guardarProducto() {
    if (this.productoForm.valid) {
      this.api.createProductos(this.productoForm.value).subscribe({
        next: (response) => {
          console.log(response);

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El registro se ingresó correctamente',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.dialogRef.close(true);
            window.location.reload(); // Recarga la página
          });
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al ingresar el registro',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Completa los campos requeridos.',
        confirmButtonText: 'Aceptar'
      });
    }
  }


  onSubmit() {

    const regexEspeciales = /[^a-zA-Z0-9\s]/;

    const nombre = this.productoForm.get('nombre')?.value;
    const descripcion = this.productoForm.get('descripcion')?.value;
    const precio = this.productoForm.get('precio')?.value;
    const stock = this.productoForm.get('stock')?.value;

    // Validación del nombre
    if (!nombre || regexEspeciales.test(nombre)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacío ni contener caracteres especiales.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Validación de la descripción
    if (!descripcion || regexEspeciales.test(descripcion)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La descripción no puede estar vacía ni contener caracteres especiales.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Validación del precio
    if (!precio || precio <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El precio debe ser un número mayor a 0.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Validación del stock
    if (!stock || stock <= 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El stock debe ser un número mayor a 1.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    console.log(this.productoForm.value);
    this.guardarProducto();
  }

  cerrarModal() {
    this.dialogRef.close();
    this.router.navigate(['dashboard/productos']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
