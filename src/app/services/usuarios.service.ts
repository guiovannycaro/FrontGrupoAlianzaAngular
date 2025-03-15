import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { map,catchError } from 'rxjs/operators';

import {Usuarios} from '../modelos/usuarios';
import {ResponceI} from '../modelos/ResponceI';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl = "http://localhost:8090/api/alianza/AppAdmin/";
  id: number;
  constructor(private http: HttpClient) {
    this.id =0;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUsuarioPerfil(datos: string): Observable<any>{

    let direccion = this.baseUrl + "Usuarios/GetRegistroPerfil?datos="+ datos;

    let response = this.http.get<any>(direccion);

      return response;
  }


  getUsuariosList(): Observable<any>{
    let direccion = this.baseUrl + "Usuarios/ObtenerTodos";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log(response);
    return response;
  }

  createUsuarios(usuarios: Usuarios): Observable<any>{
    let direccion = this.baseUrl + "Usuarios/InsertarUsuarios";
    let response = this.http.post<any>(direccion,usuarios,this.httpOptions);

    return response;

   }



   actualizarUsuarios(usuarios: Usuarios): Observable<any>{
    let direccion = this.baseUrl + "Usuarios/actualizarUsuarios/";
    let response = this.http.post<any>(direccion,usuarios,this.httpOptions);
    console.log(response);
    return response;
   }

   eliminarusuario(data:any): Observable<any>{

    console.log("parametro a enviar " + data)
    let direccion = this.baseUrl + "Usuarios/eliminarUsuarios/dato=" + data;
    let response = this.http.delete<any>(direccion);
    console.log(response);
    return response;
   }

   getusuarioById(data:any): Observable<any>{

    console.log("parametro a enviar " + data)
    let direccion = this.baseUrl + "Usuarios/obtenerUsuariosById/" + data;
    let response = this.http.get<any>(direccion);
    console.log(response);
    return response;
   }


}
