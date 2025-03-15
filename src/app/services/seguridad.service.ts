import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  private baseUrl = "http://localhost:8090/api/alianza/AppAdmin/";

  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json'
   })
 }

 constructor(private http:HttpClient) { }

 login(datos: any): Observable<any> {
  console.log("Enviando datos al servicio de autenticación:", datos);
  const direccion = `${this.baseUrl}seguridad/Autenticacion`;

  return this.http.post<any>(direccion, datos).pipe(
    catchError((error) => {
      console.error("Error en la solicitud de login:", error);
      return throwError(() => new Error("Error en la autenticación."));
    })
  );
}



obtenerPerfil(usuario: string): Observable<any> {
  console.log("Enviando datos al servicio de autenticación:", usuario);

  let direccion = this.baseUrl+ "seguridad/GetRol?datos="+ usuario;
  let response = this.http.get<any>(direccion);
      console.log(response);
      return response;
}



}
