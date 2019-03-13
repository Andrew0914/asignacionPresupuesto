import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
/** MATERIAL MODULES **/
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';


/** COMPONENTES */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { AgregarEmpleadoComponent } from './components/agregar-empleado/agregar-empleado.component';
import { ConfirmaQuitarComponent } from './components/confirma-quitar/confirma-quitar.component';
import { TotalPresupuestoComponent } from './components/total-presupuesto/total-presupuesto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EmpleadoComponent,
    AgregarEmpleadoComponent,
    ConfirmaQuitarComponent,
    TotalPresupuestoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule
  ],
  entryComponents: [
    AgregarEmpleadoComponent,
    ConfirmaQuitarComponent,
    TotalPresupuestoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
