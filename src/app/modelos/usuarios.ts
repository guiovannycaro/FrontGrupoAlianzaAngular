export class Usuarios{
  idusuario: number;
  nombre:string;
  tipodocumento: number;
  numerodocumento: number;
  rol:number;
  email:string;
  password:string;

  constructor(){
  this.idusuario= 0;
  this.nombre="";
  this.tipodocumento= 0;
  this.numerodocumento=0;
  this.rol= 0;
  this.email="";
  this.password="";
  }

}
