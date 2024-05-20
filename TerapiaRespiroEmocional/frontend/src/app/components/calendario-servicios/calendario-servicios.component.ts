import { Component, OnInit } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PacientesService } from '../../services/pacientes.service';
import { Suplencia } from '../../models/suplencias';
import { MatDialog } from '@angular/material/dialog'; // Importa el servicio MatDialog si estás usando Angular Material
import { NuevaSuplenciaDialogComponent } from '../nueva-suplencia-dialog/nueva-suplencia-dialog.component';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { Cuidador } from '../../models/cuidadores';
import { Paciente } from '../../models/pacientes';


@Component({
  selector: 'app-calendario-servicios',
  templateUrl: './calendario-servicios.component.html',
  styleUrls: ['./calendario-servicios.component.scss'],
})
export class CalendarioServiciosComponent implements OnInit {
  public events: any[] = [];
  public options: any; // Usa any para opciones
  public pacienteRelacionado: Paciente | null = null;
  public selectedCuidador: string = ''; // Variable para almacenar el cuidador seleccionado
  public selectAbierto: boolean = false;
  suplencia: Suplencia[] = [];
  searchText: string = '';
  selectedPaciente: Paciente | null = null; // Variable para almacenar el paciente seleccionado
  mostrarInfoPaciente: boolean = false;
  cuidadores: any[] = [];
  pacientes: Paciente[] = [];
  searchTextCuidadores: string = '';
  searchTextPacientes: string = '';

  constructor(
    public pacientesService: PacientesService,
    public dialog: MatDialog,
    public cuidadoresService: CuidadoresServiceService
  ) {
    this.events = [
      {
        title: 'Suplencia 1',
        start: new Date(),
        cuidador: 'cuidador1', // Asigna un cuidador a la suplencia
      },
      {
        title: 'Suplencia 2',
        start: new Date(new Date().getTime() + 86400000),
        cuidador: 'cuidador2', // Asigna un cuidador a la suplencia
      },
      {
        title: 'Suplencia 3',
        start: new Date(new Date().getTime() + 86400000 * 2),
        end: new Date(new Date().getTime() + 86400000 * 3),
        cuidador: 'cuidador3', // Asigna un cuidador a la suplencia
      },
    ];

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth', // Vista inicial del calendario
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
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


  ngOnInit() {
    // Obtener la lista de cuidadores
    this.cuidadoresService.getCuidadores().subscribe(
      (cuidadores) => {
        this.cuidadores = cuidadores;
      },
      (err) => {
        console.error(err);
      }
    );
    // Obtener la lista de pacientes
    this.pacientesService.getPacientes().subscribe(
      (pacientes) => {
        this.pacientes = pacientes;
      },
      (err) => {
        console.error(err);
      }
    );
  }


  seleccionarPacienteCuidadorSuplencias(paciente: Paciente) {
    // Asigna el nombre del cuidador al campo de búsqueda
    this.searchTextPacientes = `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`;
    this.searchTextCuidadores = `${paciente.cuidadorPrimario}`

  }
  
  
   
  
  
  
  

  
  


  agregarSuplencia(): void {
    const dialogRef = this.dialog.open(NuevaSuplenciaDialogComponent, {
      width: '850px',
    });

      dialogRef.afterClosed().subscribe((result) => {
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
