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
    ExitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
