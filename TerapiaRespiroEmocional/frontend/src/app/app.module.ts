import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuDesplegableComponent } from './components/menu-desplegable/menu-desplegable.component';
import { BuscarPacienteComponent } from './components/buscar-paciente/buscar-paciente.component';
import { DarDeAltaPacienteComponent } from './components/dar-de-alta-paciente/dar-de-alta-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuDesplegableComponent,
    BuscarPacienteComponent,
    DarDeAltaPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'buscar-paciente', component: BuscarPacienteComponent },
      { path: 'dar-de-alta-paciente', component: DarDeAltaPacienteComponent },
      // Otras rutas que puedas necesitar
    ])
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
