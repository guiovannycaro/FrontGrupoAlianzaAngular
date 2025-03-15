import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';

import {ResponceI} from '../modelos/ResponceI';
import {Productos} from '../modelos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

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

  getProductosList(): Observable<any>{
    let direccion = this.baseUrl + "Productos/ObtenerTodos";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

  createProductos(areas: Productos): Observable<any>{

    let direccion = this.baseUrl + "Productos/InsertarProductos";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

    actualizarProductos(areas: Productos): Observable<any>{
       let direccion = this.baseUrl + "Productos/actualizarProductos";
       let response = this.http.post<any>(direccion,areas,this.httpOptions);
       console.log(response);
       return response;
      }

      eliminarProductos(data:number): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Productos/eliminarProducto/" + data;
        let response = this.http.delete<any>(direccion);
        console.log(response);
        return response;
       }


       getProductosByName(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Productos/obtenerProductosByNombre/" + data;
        let response = this.http.get<any>(direccion);
        console.log(response);
        return response;
       }


       getProductosById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Productos/obtenerProductosById/" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log("✅ Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }




}
