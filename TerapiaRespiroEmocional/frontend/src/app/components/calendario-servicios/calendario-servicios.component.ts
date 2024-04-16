import { Component } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PacientesService } from '../../services/pacientes.service'
import { Paciente } from '../../models/pacientes';
import { MatDialog } from '@angular/material/dialog'; // Importa el servicio MatDialog si estás usando Angular Material
import { DialogoAgendarServicioComponent } from '../dialogo-agendar-servicio-component/dialogo-agendar-servicio-component.component';



@Component({
  selector: 'app-calendario-servicios',
  templateUrl: './calendario-servicios.component.html',
  styleUrls: ['./calendario-servicios.component.scss'],
})
export class CalendarioServiciosComponent {
  public events: any[] = [];
  public options: any; // Usa any para opciones
  pacientes: Paciente[] = [];
  searchText: string = '';
  selectedPaciente: Paciente | null = null; // Variable para almacenar el paciente seleccionado
  mostrarInfoPaciente: boolean = false;




  

  constructor(public pacientesService: PacientesService,  public dialog: MatDialog) {
    this.events = [
      { 
        title: 'Evento 1', 
        start: new Date(),
        description: "Evento 1"
      },
      { 
        title: 'Evento 2', 
        start: new Date(new Date().getTime() + 86400000),
        description: "Evento 2"
      },
      { 
        title: 'Evento 3', 
        start: new Date(new Date().getTime() + (86400000 * 2) ),
        end: new Date(new Date().getTime() + (86400000 * 3) ),
        description: "Evento 3"
      }
    ];

    

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth', // Vista inicial del calendario
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }
    };
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
          // Mostrar el contenedor de información del paciente
          this.mostrarInfoPaciente = true;
      });
    } else {
      console.error('El paciente seleccionado no tiene un ID válido.');
    }
  }

  agendarServicio(): void {
    const dialogRef = this.dialog.open(DialogoAgendarServicioComponent, {
      width: '250px',
      data: { paciente: this.selectedPaciente }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró y el resultado es:', result);
      // Aquí puedes procesar la información del servicio agendado, por ejemplo, agregarlo al calendario.
    });
  }


}
