import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styleUrls: ['./menu-desplegable.component.css']
})
export class MenuDesplegableComponent {
  // Propiedad para controlar el estado del menú desplegable
  showDropdown: boolean = false;
  isPacientesOperaciones: boolean = false;

  // Método para cambiar el estado del menú desplegable
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Método para cambiar el estado del submenú de pacientes
  togglePacientesOperaciones() {
    this.isPacientesOperaciones = !this.isPacientesOperaciones;
  }
}
