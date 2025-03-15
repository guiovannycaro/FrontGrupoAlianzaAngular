import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styleUrls: ['./addusuario.component.css']
})
export class AddusuarioComponent implements OnInit{
usuarioForm!: FormGroup;

  usuarios : Usuarios = new Usuarios();

  constructor(
    private fb: FormBuilder,
    private api: UsuariosService,
    public dialogRef: MatDialogRef<AddusuarioComponent>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.usuarioForm = this.fb.group({
      idusuario: [0, Validators.required],
      nombre: ['', Validators.required],
      tipodocumento: [0, Validators.required],
      numerodocumento: [0, Validators.required],
      rol: ['', Validators.required],
      email: ['', Validators.required],
      password: [0, Validators.required]
    });

  }

  ngOnInit(): void {

  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      this.api.createUsuarios(this.usuarioForm.value).subscribe({
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
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nombre = this.usuarioForm.get('nombre')?.value;
  const tipodocumento = this.usuarioForm.get('tipodocumento')?.value;
  const numerodocumento = this.usuarioForm.get('numerodocumento')?.value;
  const rol = this.usuarioForm.get('rol')?.value;
  const email = this.usuarioForm.get('email')?.value;
  const password = this.usuarioForm.get('password')?.value;

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

  // Validación del tipo de documento
  if (!tipodocumento || tipodocumento === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe seleccionar un tipo de documento válido.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Validación del número de documento
  if (!numerodocumento || numerodocumento <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El número de documento debe ser mayor a 0.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Validación del rol
  if (!rol || rol === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe seleccionar un rol válido.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Validación del correo electrónico
  if (!email || !regexCorreo.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El correo electrónico no es válido.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Validación de la contraseña
  if (!password || password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La contraseña debe tener al menos 6 caracteres.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

    console.log(this.usuarioForm.value);
    this.guardarUsuario();
  }

  cerrarModal() {
    this.dialogRef.close();
    this.router.navigate(['dashboard/usuarios']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
