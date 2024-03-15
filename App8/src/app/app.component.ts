import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Cambiado de styleUrl a styleUrls
})

export class AppComponent {
  users: string[] = ['rich', 'john', 'riichh']

  sayHello(){
    alert('Hello!')
  }
}
