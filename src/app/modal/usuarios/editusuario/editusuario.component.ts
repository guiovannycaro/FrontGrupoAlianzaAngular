import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuarios } from '../../../modelos/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';


@Component({
  selector: 'app-editusuario',
  templateUrl: './editusuario.component.html',
  styleUrls: ['./editusuario.component.css']
})
export class EditusuarioComponent  implements OnInit {

  usuarioForm!: FormGroup;
  usuarios : Usuarios= new  Usuarios();
  usuariosar: Usuarios [] =[];


    constructor(
      private fb: FormBuilder,
      private api: UsuariosService,
      public dialogRef: MatDialogRef<EditusuarioComponent>,
      private cdr: ChangeDetectorRef,
      private routera: ActivatedRoute,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      console.log('Datos recibidos en el modal:', this.data);

      this.usuarioForm = this.fb.group({
        idusuario: [data?.idproducto ?? 0, Validators.required],
        nombre: [data?.nombre ?? '', Validators.required],
        tipodocumento: [data?.tipodocumento ?? '', Validators.required],
        numerodocumento: [data?.numerodocumento ?? 0, Validators.required],
        rol: [data?.rol ?? 0, Validators.required],
        email: [data?.email ?? '', Validators.required],
        password: [data?.password ?? '', Validators.required]
      });
    }

    ngOnInit(): void {

      this.usuarioForm.patchValue(this.data);

      const id = Number(this.data?.are_idcarea);
        console.log('envio parametros al update ',this.data);
        console.log('numero envio ',id);
          this.obtUsuariosById(id);


    }

    obtUsuariosById(id: number) {
      if (!id || isNaN(id)) {
        console.error('ID no válido:', id);
        return;
      }

      console.log('🔹 Enviando ID a la API:', id);

      this.api.getusuarioById(id).subscribe({
        next: (response) => {
          console.log(' Respuesta de la API:', response);
           this.usuariosar = response;
        },
        error: (err) => {
          console.error(' Error obteniendo área:', err);
        }
      });
    }


     editarUsuario(data: any) {
        this.api.actualizarUsuarios(data).subscribe({
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

          for (const area of this.usuariosar) {

             if (!area.nombre || regexEspeciales.test(area.nombre)) {


                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'El nombre  no puede estar vacío ni contener caracteres especiales.',
                      confirmButtonText: 'Aceptar'
                    });

                    return;
             }


             if (!area.tipodocumento || area.tipodocumento === 0) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar un tipo de documento válido.',
                confirmButtonText: 'Aceptar'
              });
              return;
            }


            if (!area.numerodocumento || area.numerodocumento <= 0) {


              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El número de documento en el usuario debe ser mayor a 0.' ,
                confirmButtonText: 'Aceptar'
              });
              return;
            }


            if (!area.email || !this.validarCorreo(area.email)) {


              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El correo electrónico en el usuario no es válido' ,
                confirmButtonText: 'Aceptar'
              });
              return;
            }

            if (!area.password || area.password.length < 6) {

              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña en el usuario debe tener al menos 6 caracteres.' ,
                confirmButtonText: 'Aceptar'
              });

              return;
            }


            if (!area.rol || area.rol <= 0) {


              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El rol en el usuario debe ser un valor válido.' ,
                confirmButtonText: 'Aceptar'
              });

              return;
            }

          }


          this.usuariosar.forEach((area, index) => {
            console.log(`Areas ${index + 1}:`, area);

            this.editarUsuario(area);
          });


        }

        closeDialog() {
          this.dialogRef.close();
        }

        validarCorreo(correo: string): boolean {
          const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regexCorreo.test(correo);
        }

}
