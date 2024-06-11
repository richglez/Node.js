import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importante para trabajar con formularios en Angular
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';

@Component({
  selector: 'app-new-cuidador',
  templateUrl: './new-cuidador.component.html',
  styleUrl: './new-cuidador.component.scss',
})
export class NewCuidadorComponent {
  numeroDeSuplenciasTxt: string = '0';

  constructor(public cuidadoresService: CuidadoresServiceService) {} // Constructor

  ngOnInit(): void {
    // Puedes inicializar aquí el valor del input a '0'
    this.numeroDeSuplenciasTxt = '0';
  }

  addCuidador(form: NgForm) {

    if (form.value.id_employee) {
      // si hay un registro por su id entonces actualiza
      this.cuidadoresService.updateCuidador(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.cuidadoresService.addCuidador(form.value).subscribe(
        // de cualquier manera agrega al cuidador a la base de datos
        (res) => {
          // dado de alta
          form.reset({ num_suplencias: '0' });
        },
        (err) => console.log(err)
      );
    }
  }
}
