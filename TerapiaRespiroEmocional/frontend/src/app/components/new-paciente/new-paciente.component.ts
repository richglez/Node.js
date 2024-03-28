import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importante para trabajar con formularios en Angular
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/pacientes';


@Component({
  selector: 'app-new-paciente',
  templateUrl: './new-paciente.component.html',
  styleUrls: ['./new-paciente.component.scss']
})


export class NewPacienteComponent implements OnInit {
  fechaActual: string = '';
  textoConAcentos: string = '';
  

  constructor(public pacienteService: PacientesService) { } // Constructor 

  ngOnInit() {
  }

  addPaciente(form: NgForm) {
    if (!form.valid) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }

    if (form.value.id_employee) {
      this.pacienteService.updatePaciente(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.pacienteService.addPaciente(form.value).subscribe(
        (res) => {
          // this.getPaciente();
          form.reset();
        },
        (err) => console.log(err)
      );
    }
  }

}
