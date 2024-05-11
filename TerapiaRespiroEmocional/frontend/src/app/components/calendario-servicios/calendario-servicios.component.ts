import { Component } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PacientesService } from '../../services/pacientes.service'
import { Paciente } from '../../models/pacientes';
import { Suplencia } from '../../models/suplencias'
import { MatDialog } from '@angular/material/dialog'; // Importa el servicio MatDialog si estás usando Angular Material
import { DialogoAgendarServicioComponent } from '../dialogo-agendar-servicio-component/dialogo-agendar-servicio-component.component';
import { NuevaSuplenciaDialogComponent } from '../nueva-suplencia-dialog/nueva-suplencia-dialog.component';




@Component({
  selector: 'app-calendario-servicios',
  templateUrl: './calendario-servicios.component.html',
  styleUrls: ['./calendario-servicios.component.scss'],
})
export class CalendarioServiciosComponent {
  public events: any[] = [];
  public options: any; // Usa any para opciones
  pacientes: Paciente[] = [];
  suplencia: Suplencia[] = [];
  searchText: string = '';
  selectedPaciente: Paciente | null = null; // Variable para almacenar el paciente seleccionado
  public selectedCuidador: string = ''; // Variable para almacenar el cuidador seleccionado
  mostrarInfoPaciente: boolean = false;
  public selectAbierto: boolean = false;


  




  

  constructor(public pacientesService: PacientesService,  public dialog: MatDialog) {
    this.events = [
      { 
        title: 'Suplencia 1', 
        start: new Date(),
        cuidador: 'cuidador1' // Asigna un cuidador a la suplencia
      },
      { 
        title: 'Suplencia 2', 
        start: new Date(new Date().getTime() + 86400000),
        cuidador: 'cuidador2' // Asigna un cuidador a la suplencia
      },
      { 
        title: 'Suplencia 3', 
        start: new Date(new Date().getTime() + (86400000 * 2) ),
        end: new Date(new Date().getTime() + (86400000 * 3) ),
        cuidador: 'cuidador3' // Asigna un cuidador a la suplencia
      }
    ];

    

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth', // Vista inicial del calendario
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
        
      }
    };
  }



  // buscarPacienteDB(): void {  // buscar a todos los registros de pacientes en la base de datos, para poder seleccionarlo
  //   this.pacientesService.searchAllPacientes(this.searchText).subscribe((pacientes: Paciente[]) => { // auto completado en el input?
  //     this.pacientes = pacientes;
  //   });
  // }

  // seleccionarPaciente(paciente: Paciente) {
  //   // Asigna el nombre del paciente al campo de búsqueda
  //   this.searchText = paciente.nombre_paciente;
  
  //   // Verifica si id_paciente tiene un valor antes de usarlo
  //   if (paciente.id_paciente !== undefined) {
  //     // Busca los detalles del paciente por su ID y asigna los detalles al paciente seleccionado
  //     this.pacientesService.getPacienteById(paciente.id_paciente).subscribe((pacienteData: Paciente) => {
  //       this.selectedPaciente = pacienteData;
  //       // Aquí puedes hacer lo que necesites con el paciente seleccionado, por ejemplo, mostrar los detalles en la ficha del paciente.
  //         // Mostrar el contenedor de información del paciente
  //         this.mostrarInfoPaciente = true;
  //     });
  //   } else {
  //     console.error('El paciente seleccionado no tiene un ID válido.');
  //   }
  // }


  agregarSuplencia(): void {
    const dialogRef = this.dialog.open(NuevaSuplenciaDialogComponent, {
      width: '850px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Agregar el evento al calendario
        // this.agregarEvento(result);
      }
    });
  }


  toggleSelect() {
    this.selectAbierto = !this.selectAbierto;
  }
  


  // agregarEvento(suplencia: any): void {
  //   const nuevoEvento = {
  //     title: 'Suplencia', // Puedes modificar este título según tus necesidades
  //     start: suplencia.fechaInicio,
  //     end: suplencia.fechaFin,
  //     description: 'Suplencia', // Puedes modificar esta descripción según tus necesidades
  //     costo: suplencia.costo,
  //     particular: suplencia.particular,
  //     cuidador: suplencia.cuidador
  //   };
  
  
  // Agregar el nuevo evento a la lista de eventos
  // this.events = [...this.events, nuevoEvento];
  

}
