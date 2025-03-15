import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Productos } from '../../modelos/productos';
import { ProductosService } from '../../services/productos.service';
import { AddproductoComponent } from 'src/app/modal/productos/addproducto/addproducto.component';
import { EditproductoComponent } from 'src/app/modal/productos/editproducto/editproducto.component';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements AfterViewInit,OnInit{

  displayedColumns: string[] = ['id', 'Nombre','Descripcion', 'Precio','Stock','Acciones'];
  dataSource = new MatTableDataSource<Productos>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ProductosService,
    private router: Router,
    public dialog: MatDialog

  ) {

}


ngOnInit(): void {
  this.obtenerProductos();
}



private obtenerProductos() {
  this.api.getProductosList().subscribe({
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
  this.dialog.open(AddproductoComponent);

}

  openEditProForm(id: number) {
    if (!id) {
      console.error("Error: ID es undefined o null");
      return;
    }

    this.dialog.open(EditproductoComponent, {
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
        this.api.eliminarProductos(id).subscribe({
          next: (data) => {
            console.log('Producto eliminada:', data);
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminada.', 'success');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar producto:', error);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
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
