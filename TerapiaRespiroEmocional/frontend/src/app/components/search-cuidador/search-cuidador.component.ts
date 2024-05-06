import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { MatDialog } from '@angular/material/dialog'; // Importa solo MatDialog
import { Cuidador } from '../../models/cuidadores';


@Component({
  selector: 'app-search-cuidador',
  templateUrl: './search-cuidador.component.html',
  styleUrls: ['./search-cuidador.component.scss']
})
export class SearchCuidadorComponent {

  cuidadores: Cuidador[] = [];
  searchTextCuidador: string = '';
  selectedCuidador: Cuidador | null = null; // Variable para almacenar el paciente seleccionado



  constructor(public cuidadoresService: CuidadoresServiceService, private dialog: MatDialog) {
    //instancia, poder tener todos los metodos
    
  }


  buscarCuidadorDB(): void {  // buscar a todos los registros de pacientes en la base de datos, para poder seleccionarlo
    this.cuidadoresService.searchAllCuidadores(this.searchTextCuidador).subscribe((todosCuidadores: Cuidador[]) => { // auto completado en el input?
      this.cuidadores = todosCuidadores;
    });
  }


  seleccionarCuidador(cuidador: Cuidador) {
    // Asigna el nombre del paciente al campo de búsqueda
    this.searchTextCuidador = cuidador.nombreCuidador;
  
    // Verifica si id_cuidador_paciente tiene un valor antes de usarlo
    if (cuidador.id_cuidador_paciente !== undefined) {
      // Busca los detalles del cuidador por su ID y asigna los detalles al paciente seleccionado
      this.cuidadoresService.getCuidadorById(cuidador.id_cuidador_paciente).subscribe((cuidadorData: Cuidador) => {
        this.selectedCuidador = cuidadorData;
        // Aquí puedes hacer lo que necesites con el paciente seleccionado, por ejemplo, mostrar los detalles en la ficha del paciente.
      });
    } else {
      console.error('El paciente seleccionado no tiene un ID válido.');
    }
  }
}
