import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Usar styleUrls en lugar de styleUrl
})
export class AppComponent {
  title = 'C CUIDARTE - Respiro Emocional';
  showDropdown = false;  //  es una variable en el componente que controla si el menú desplegable se muestra o no
}
