import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from './Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Cambiado de styleUrl a styleUrls
})

export class AppComponent {
  users: string[] = ['rich', 'john', 'riichh']
  name: string = 'Ricardo'
  age: number = 22
  posts: Post[] = [];




  constructor(private dataService: DataService){
    this.dataService.getData().subscribe(data => {
      console.log(data);
      this.posts = data;
      
    })
  }

  deleteUser(user: string){
    for (let i = 0; i < this.users.length; i++) {
      const usuerFind = this.users[i];
      if (user === usuerFind) {
        // usuario encontrado
        this.users.splice(i, 1);
      }
    }

  }

  addUser(txtUser: HTMLInputElement) {
    if (txtUser.value === '') {
      alert('Cadena vacia')
      txtUser.focus()
    }
    else{
      this.users.push(txtUser.value);
      txtUser.value = ''; // Limpiar el campo de entrada después de agregar el usuario
      txtUser.focus()
    }
    
    return false; // Para evitar que el formulario se envíe
  }



}
