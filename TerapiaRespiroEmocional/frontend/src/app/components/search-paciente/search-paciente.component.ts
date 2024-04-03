import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/pacientes';

@Component({
  selector: 'app-search-paciente',
  templateUrl: './search-paciente.component.html',
  styleUrls: ['./search-paciente.component.scss']
})
export class SearchPacienteComponent {

  pacientes: Paciente[] = [];
  searchText: string = '';
  selectedPaciente: Paciente | null = null; // Variable para almacenar el paciente seleccionado



  constructor(public pacientesService: PacientesService) {
    //instancia, poder tener todos los metodos
  }

  buscarPaciente(): void {
    this.pacientesService.searchPaciente(this.searchText).subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes;
    });
  }

  seleccionarPaciente(paciente: Paciente) {
    this.searchText = paciente.nombre_paciente;
    this.selectedPaciente = paciente; // Asigna el paciente seleccionado a selectedPaciente
  }

}
