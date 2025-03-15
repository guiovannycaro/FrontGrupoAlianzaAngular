import { Component , Inject,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Perfil } from '../../modelos/perfil';
import { SeguridadService } from '../../services/seguridad.service';
import { perfilUsuario } from '../../modelos/perfilUsuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  perfil: string = "";
  perfild: Perfil = new Perfil();

  perusu: perfilUsuario[] = [];
  perusud: perfilUsuario = new perfilUsuario();

  public estado: number | undefined;
  public nombre: string | undefined;
  public rol: boolean = false;
  public menuItems: any[] = [];
  public secciontems: any[] = [];
  usuario: string | null = '';

  constructor(
    private _fb:FormBuilder,
    private api:SeguridadService,private router:Router,private uapi:UsuariosService ) {
    }

    ngOnInit() {

      this.usuario = sessionStorage.getItem('email');
      console.log('Usuario recuperado dasboard:', this.usuario);

      this.obtenerDatosUsuario(this.usuario);
    }

    private obtenerPerfilUsuario(usuario: any){

      this.api.obtenerPerfil(usuario).subscribe(data=>{


        this.perfil =String(data.perfil);

       },error=> console.log(error));
    }

    private obtenerDatosUsuario(usuario: any){

      console.log ("averiguar datos perfil de " + usuario);
      this.uapi.getUsuarioPerfil(usuario).subscribe(data=>{

        this.perusu =data;

       },error=> console.log(error));
    }

    esPerfilPermitido(): boolean {
      if (this.perusu.length > 0) {
          const rol = this.perusu[0].rol;
          // Solo permitir si el rol es 3 y no es admin
          return rol === 3;
      }
      return false;
  }

  esPermitidoAdmin(): boolean {
    if (this.perusu.length > 0) {
        const rol = this.perusu[0].rol;
        // Permitir solo si el rol es 1 o 2 (admin)
        return rol === 1 || rol === 2;
    }
    return false;
}

     logout() {
       location.href = 'login'; // Redirige al login
     }




}
