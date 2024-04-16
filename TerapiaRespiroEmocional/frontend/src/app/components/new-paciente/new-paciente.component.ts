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
  expediente_paciente: string = '';
  fechaActual: Date = new Date();
  textoConAcentos: string = '';
  txtFechaIngreso: string = '';
  

  constructor(public pacientesService: PacientesService) { } // Constructor 

  ngOnInit() {
    const year = new Date().getFullYear().toString().slice(-2);  //2024 a 24 nadamas
    const padding = '000';
    const nroRegistro = '1'; // Aquí debes obtener el número de registro de tu base de datos
    const nroRegistroPadded = (padding + nroRegistro).slice(-padding.length);

    this.expediente_paciente = `${year}/${nroRegistroPadded}`;
    this.txtFechaIngreso = this.fechaActual.toISOString().split('T')[0]; // No es necesario convertir a ISO


  }
  
  



  addPaciente(form: NgForm) {
    if (!form.valid) { //si no hay nada en el form
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }

    if (form.value.id_employee) { // si hay un registro por su id entonces actualiza
      this.pacientesService.updatePaciente(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.pacientesService.addPaciente(form.value).subscribe( // de cualquier manera agrega al paciente a la base de datos
        (res) => {
          // this.getEmployees();
          form.reset();
        },
        (err) => console.log(err)
      );
    }
  }
  

}
