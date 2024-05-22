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
  public selectedCuidador: Cuidador | null = null;
  public cuidadorSeleccionado: Cuidador | null = null;
  public selectAbierto: boolean = false;
  public selectAbierto2: boolean = false;
  suplencia: Suplencia[] = [];
  searchText: string = '';
  selectedPaciente: Paciente | null = null; // Variable para almacenar el paciente seleccionado
  mostrarInfoPaciente: boolean = false;
  cuidadores: any[] = [];
  pacientes: Paciente[] = [];
  searchTextCuidadores: string = '';
  searchTextPacientes: string = '';
  searchTextTotalSuplencias: string = '';

  constructor(
    public pacientesService: PacientesService,
    public dialog: MatDialog,
    public cuidadoresService: CuidadoresServiceService
  ) {
    // Inicializa el calendario sin eventos
    this.events = [];

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

  seleccionarCuidador(cuidador: Cuidador) {
    this.searchTextCuidadores = `${cuidador.nombreCuidador} ${cuidador.apPatCuidador} ${cuidador.apMatCuidador}`;
    this.searchTextTotalSuplencias = cuidador.num_suplencias.toString();
  }
  
  

  
  
  
  seleccionarPaciente(paciente: Paciente) {
    this.searchTextPacientes = `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`
  };
  
  
  
  
  

  agregarSuplencia(): void {
    const dialogRef = this.dialog.open(NuevaSuplenciaDialogComponent, {
      width: '850px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Agregar el evento al calendario
        this.agregarEvento(result);
      }
    });
  }

  toggleSelect() {
    this.selectAbierto = !this.selectAbierto;
  }

  toggleSelect2() {
    this.selectAbierto2 = !this.selectAbierto2;
  }

  buscarSuplencia() {
    if (this.selectedCuidador) {
      // Filtrar la lista de pacientes antes de buscar suplencias
      this.pacientes = this.pacientes.filter(paciente => paciente.id_cuidador_paciente === this.selectedCuidador!.id_cuidador_paciente);
      // Luego, puedes realizar la búsqueda de suplencias
      // ...
    }
  }
  

  agregarEvento(suplencia: any): void {
    const nuevoEvento = {
      title: 'Suplencia', // Puedes modificar este título según tus necesidades
      start: suplencia.fechaInicio,
      end: suplencia.fechaFin,
      description: 'Suplencia', // Puedes modificar esta descripción según tus necesidades
      costo: suplencia.costo,
      particular: suplencia.particular,
      cuidador: suplencia.cuidador
    };

    // Agregar el nuevo evento a la lista de eventos
    this.events = [...this.events, nuevoEvento];
  }



  
}
