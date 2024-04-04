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

  buscarPacienteDB(): void {  // buscar a todos los registros de pacientes en la base de datos, para poder seleccionarlo
    this.pacientesService.searchAllPacientes(this.searchText).subscribe((pacientes: Paciente[]) => { // auto completado en el input?
      this.pacientes = pacientes;
    });
  }

  seleccionarPaciente(paciente: Paciente) {
    // Asigna el nombre del paciente al campo de búsqueda
    this.searchText = paciente.nombre_paciente;
  
    // Verifica si id_paciente tiene un valor antes de usarlo
    if (paciente.id_paciente !== undefined) {
      // Busca los detalles del paciente por su ID y asigna los detalles al paciente seleccionado
      this.pacientesService.getPacienteById(paciente.id_paciente).subscribe((pacienteData: Paciente) => {
        this.selectedPaciente = pacienteData;
        // Aquí puedes hacer lo que necesites con el paciente seleccionado, por ejemplo, mostrar los detalles en la ficha del paciente.
      });
    } else {
      console.error('El paciente seleccionado no tiene un ID válido.');
    }
  }
  

  
  
  

  
  

}
