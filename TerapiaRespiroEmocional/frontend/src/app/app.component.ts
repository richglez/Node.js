import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C CUIDARTE - Respiro Emocional';
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
