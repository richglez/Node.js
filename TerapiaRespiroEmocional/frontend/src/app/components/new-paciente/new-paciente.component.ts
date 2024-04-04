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
  expediente: string = '';
  fechaActual: string = '';
  textoConAcentos: string = '';
  

  constructor(public pacientesService: PacientesService) { } // Constructor 

  ngOnInit() {
    const year = new Date().getFullYear().toString().slice(-2);  //2024 a 24 nadamas
    const padding = '000';
    const nroRegistro = '1'; // Aquí debes obtener el número de registro de tu base de datos
    const nroRegistroPadded = (padding + nroRegistro).slice(-padding.length);

    this.expediente = `${year}/${nroRegistroPadded}`;
    this.fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
  }
  
  



  addPaciente(form: NgForm) {
    if (!form.valid) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }

    if (form.value.id_employee) {
      this.pacientesService.updatePaciente(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.pacientesService.addPaciente(form.value).subscribe(
        (res) => {
          // this.getEmployees();
          form.reset();
        },
        (err) => console.log(err)
      );
    }
  }
  

}