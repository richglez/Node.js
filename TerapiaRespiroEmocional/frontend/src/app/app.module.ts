import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

// Importa los componentes
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SearchPacienteComponent } from './components/search-paciente/search-paciente.component';
import { NewPacienteComponent } from './components/new-paciente/new-paciente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarioServiciosComponent } from './components/calendario-servicios/calendario-servicios.component';
import { ExpedienteElectronicoComponent } from './components/expediente-electronico/expediente-electronico.component';
import { BaseDatosComponent } from './components/base-datos/base-datos.component';
import { EvaluacionCuidadorComponent } from './components/evaluacion-cuidador/evaluacion-cuidador.component';
import { ExitComponent } from './components/exit/exit.component';
import { BodyComponent } from './components/body/body.component';
import { DialogoAgendarServicioComponent } from './components/dialogo-agendar-servicio-component/dialogo-agendar-servicio-component.component';
import { ConfirmarEliminarDialogComponent } from './components/confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';
import { ActualizarDialogComponent } from './components/actualizar-dialog/actualizar-dialog.component';
import { NuevaSuplenciaDialogComponent } from './components/nueva-suplencia-dialog/nueva-suplencia-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SearchPacienteComponent,
    NewPacienteComponent,
    DashboardComponent,
    CalendarioServiciosComponent,
    ExpedienteElectronicoComponent,
    BaseDatosComponent,
    EvaluacionCuidadorComponent,
    ExitComponent,
    BodyComponent,
    DialogoAgendarServicioComponent,
    ConfirmarEliminarDialogComponent,
    ActualizarDialogComponent,
    NuevaSuplenciaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    MatDialogModule,
    BrowserAnimationsModule // Agrega BrowserAnimationsModule a la lista de imports
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
