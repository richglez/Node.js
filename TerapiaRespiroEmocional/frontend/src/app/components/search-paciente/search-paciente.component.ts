import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/pacientes';
import { MatDialog } from '@angular/material/dialog'; // Importa solo MatDialog
import { ConfirmarEliminarDialogComponent } from '../confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';
import { ActualizarDialogComponent } from '../actualizar-dialog/actualizar-dialog.component';

@Component({
  selector: 'app-search-paciente',
  templateUrl: './search-paciente.component.html',
  styleUrls: ['./search-paciente.component.scss']
})
export class SearchPacienteComponent {

  pacientes: Paciente[] = [];
  searchText: string = '';
  selectedPaciente: Paciente | null = null; // Variable para almacenar el paciente seleccionado




  constructor(public pacientesService: PacientesService, private dialog: MatDialog) {
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



  // ELIMINAR PACIENTE

  deletePacienteDialog() {
    const dialogRef = this.dialog.open(ConfirmarEliminarDialogComponent, {
      width: '250px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedPaciente && this.selectedPaciente.id_paciente) {
          this.pacientesService.deletePaciente(this.selectedPaciente.id_paciente).subscribe(() => {
            // Eliminación exitosa
            this.selectedPaciente = null; // Reiniciar selectedPaciente a null para restablecer los campos en el HTML
          });
        } else {
          console.error('No se ha seleccionado un paciente válido para eliminar.');
        }
      }
    });
  }
  
  







    // ACTULIZAR DATOS DEL PACIENTE

  editPaciente(){
    //poder editar los datos, convertir readonly a escritura libre
    const inputs = document.querySelectorAll('.container-data-paciente input');
    inputs.forEach((input: Element) => {
      if (input instanceof HTMLInputElement) {
        input.readOnly = false;
      }
    });
  }


  updatePacienteDialog() {
    const dialogRef = this.dialog.open(ActualizarDialogComponent, {
      width: '250px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Verificar que los campos necesarios no sean nulos
        if (
          this.selectedPaciente &&
          this.selectedPaciente.id_paciente !== undefined &&
          this.selectedPaciente.expediente_paciente !== null &&  
          this.selectedPaciente.nombre_paciente !== null 
        ) {
          this.pacientesService.updatePaciente(this.selectedPaciente) //PACIENTE SELECCIONADO
            .subscribe(() => {
              // Aquí puedes añadir lógica adicional después de la actualización
            });
        }
      }
    });
  }

  


  








  // OTRAS FUNCIONES 


  undoPaciente(){
    //Deshacer cambios realizados
  }
  

  
  
  

  
  

}
