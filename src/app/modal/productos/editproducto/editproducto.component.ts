import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

import { Productos } from '../../../modelos/productos';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-editproducto',
  templateUrl: './editproducto.component.html',
  styleUrls: ['./editproducto.component.css']
})
export class EditproductoComponent implements OnInit {
  productoForm!: FormGroup;
  productos : Productos= new  Productos();
  productosar: Productos [] =[];


  constructor(
    private fb: FormBuilder,
    private api: ProductosService,
    public dialogRef: MatDialogRef<EditproductoComponent>,
    private cdr: ChangeDetectorRef,
    private routera: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Datos recibidos en el modal:', this.data);

    this.productoForm = this.fb.group({
      idproducto: [data?.idproducto ?? 0, Validators.required],
      nombre: [data?.nombre ?? '', Validators.required],
      descripcion: [data?.descripcion ?? '', Validators.required],
      precio: [data?.precio ?? 0, Validators.required],
      stock: [data?.stock ?? 0, Validators.required]
    });
  }

  ngOnInit(): void {

    this.productoForm.patchValue(this.data);

    const id = Number(this.data?.are_idcarea);
      console.log('envio parametros al update ',this.data);
      console.log('numero envio ',id);
        this.obtProductosById(id);


  }

  obtProductosById(id: number) {
    if (!id || isNaN(id)) {
      console.error('ID no válido:', id);
      return;
    }

    console.log('🔹 Enviando ID a la API:', id);

    this.api.getProductosById(id).subscribe({
      next: (response) => {
        console.log(' Respuesta de la API:', response);
         this.productosar = response;
      },
      error: (err) => {
        console.error(' Error obteniendo área:', err);
      }
    });
  }



  editarProducto(data: any) {






    this.api.actualizarProductos(data).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El registro se actualizó correctamente',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.dialogRef.close(true);
          window.location.reload();
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el registro',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  onSubmit() {

    const regexEspeciales = /[^a-zA-Z0-9\s]/;

    for (const area of this.productosar) {

      if (!area.nombre || area.nombre.trim().length === 0) {


        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre no puede estar vacío',
          confirmButtonText: 'Aceptar'
        });

        return;
      }

      if (regexEspeciales.test(area.nombre)) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre no debe contener caracteres especiales.',
          confirmButtonText: 'Aceptar'
        });

        return;
      }

      if (!area.descripcion || area.descripcion.trim().length === 0) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La descripción no puede estar vacía.',
          confirmButtonText: 'Aceptar'
        });


        return;
      }

      if (regexEspeciales.test(area.descripcion)) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La descripción no debe contener caracteres especiales.',
          confirmButtonText: 'Aceptar'
        });


        return;
      }

      if (!area.precio || area.precio <= 0) {



        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El precio debe ser un valor numérico positivo.',
          confirmButtonText: 'Aceptar'
        });



        return;
      }

      if (area.precio.toString().length < 4) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El precio debe tener al menos cuatro dígitos.',
          confirmButtonText: 'Aceptar'
        });


        return;
      }

      if (area.stock == null || area.stock <= 0) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El stock debe ser un valor numérico positivo.',
          confirmButtonText: 'Aceptar'
        });

        return;
      }

      if (area.stock.toString().length < 1) {


        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El stock debe tener al menos un dígitos.',
          confirmButtonText: 'Aceptar'
        });



        return;
      }
    }

    this.productosar.forEach((area, index) => {
      console.log(`Areas ${index + 1}:`, area);

      this.editarProducto(area);
    });


  }

  closeDialog() {
    this.dialogRef.close();
  }

}
