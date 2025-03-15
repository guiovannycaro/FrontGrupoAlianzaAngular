import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule,FormsModule} from  '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AddproductoComponent } from './modal/productos/addproducto/addproducto.component';
import { EditproductoComponent } from './modal/productos/editproducto/editproducto.component';
import { EditusuarioComponent } from './modal/usuarios/editusuario/editusuario.component';
import { AddusuarioComponent } from './modal/usuarios/addusuario/addusuario.component';


@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent,



    NavbarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SidebarComponent,

    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    AddproductoComponent,
    EditproductoComponent,
    EditusuarioComponent,
    AddusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
