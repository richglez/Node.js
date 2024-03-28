import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PacientesService } from './services/pacientes.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

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
    BodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Agrega HttpClientModule a la lista de imports
    FormsModule // Añade FormsModule a la lista de imports
  ],
  providers: [PacientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
