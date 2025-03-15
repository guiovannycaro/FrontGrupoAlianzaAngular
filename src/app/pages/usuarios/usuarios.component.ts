import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Usuarios } from '../../modelos/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { AddusuarioComponent } from 'src/app/modal/usuarios/addusuario/addusuario.component';
import { EditusuarioComponent } from 'src/app/modal/usuarios/editusuario/editusuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['id', 'Nombre','TipoDocumento', 'NumeroDocumento','Rol','email','Acciones'];
  dataSource = new MatTableDataSource<Usuarios>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: UsuariosService,
    private router: Router,
    public dialog: MatDialog

  ) {

}


ngOnInit(): void {
  this.obtenerUsuarios();
}



private obtenerUsuarios() {
  this.api.getUsuariosList().subscribe({
    next: (dato) => {
      console.log("Datos recibidos del backend:", dato);
      this.dataSource = new MatTableDataSource(dato);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    },
    error: (x) => {
      console.error("Error al obtener productos:", x);
      Swal.fire("Error", "No se pudo obtener la lista de productos.", "error");
    }
  });
}

openAddProForm() {
  this.dialog.open(AddusuarioComponent);

}

  openEditProForm(id: number) {
    if (!id) {
      console.error("Error: ID es undefined o null");
      return;
    }

    this.dialog.open(EditusuarioComponent, {
      data: { are_idcarea: id },
      width: '500px'
    });
  }

  openDropProForm(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.eliminarusuario(id).subscribe({
          next: (data) => {
            console.log('usuario eliminada:', data);
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminada.', 'success');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
