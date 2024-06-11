import { Component } from '@angular/core';

@Component({
  selector: 'app-base-datos',
  templateUrl: './base-datos.component.html',
  styleUrl: './base-datos.component.scss'
})
export class BaseDatosComponent {
  search() {
    // Aquí puedes agregar la lógica para realizar la búsqueda
    console.log('Buscar...');
  }
}
