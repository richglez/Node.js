import { Component, OnInit } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PacientesService } from '../../services/pacientes.service';
import { Suplencia } from '../../models/suplencias';
import { MatDialog } from '@angular/material/dialog';
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
  public options: any;
  public selectedCuidador: Cuidador | null = null;
  public selectAbierto: boolean = false;
  public selectAbierto2: boolean = false;
  public suplencias: Suplencia[] = [];
  public searchTextCuidadores: string = '';
  public searchTextPacientes: string = '';
  public searchTextTotalSuplencias: string = '';
  public cuidadores: Cuidador[] = [];
  public pacientes: Paciente[] = [];
  public filteredPacientes: Paciente[] = [];

  constructor(
    public pacientesService: PacientesService,
    public dialog: MatDialog,
    public cuidadoresService: CuidadoresServiceService
  ) {
    this.events = [];
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
    };
    console.log('Constructor inicializado'); // Depuración
  }

  ngOnInit() {
    this.cuidadoresService.getCuidadores().subscribe(
      (cuidadores) => {
        this.cuidadores = cuidadores;
        console.log('Cuidadores cargados:', this.cuidadores); // Verificar cuidadores
      },
      (err) => {
        console.error(err);
      }
    );
  
    this.pacientesService.getPacientes().subscribe(
      (pacientes) => {
        this.pacientes = pacientes;
        this.filteredPacientes = this.pacientes; // Inicializar filteredPacientes con todos los pacientes
        console.log('Pacientes cargados:', this.pacientes); // Verificar pacientes
      },
      (err) => {
        console.error(err);
      }
    );
  }
  

  
  seleccionarCuidador(cuidador: Cuidador) {
    this.selectedCuidador = cuidador;
    this.searchTextCuidadores = `${cuidador.nombreCuidador} ${cuidador.apPatCuidador} ${cuidador.apMatCuidador}`;
    this.searchTextTotalSuplencias = cuidador.num_suplencias.toString();
  
    // Filtrar pacientes por id del cuidador
    console.log('ID del cuidador seleccionado:', cuidador.id_cuidador_paciente);
    this.filteredPacientes = this.pacientes.filter(paciente => {
      console.log('ID del cuidador del paciente:', paciente.id_cuidador_paciente);
      return paciente.id_cuidador_paciente === cuidador.id_cuidador_paciente;
    });
  
    console.log('Pacientes filtrados:', this.filteredPacientes); // Verificar si se filtran correctamente
    console.log('Cuidador seleccionado:', this.searchTextCuidadores); // Depuración
  }
  
  

  
  

  seleccionarPaciente(paciente: Paciente) {
    this.searchTextPacientes = `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`;
    console.log('Paciente seleccionado:', this.searchTextPacientes); // Depuración
  }

  agregarSuplencia(): void {
    const dialogRef = this.dialog.open(NuevaSuplenciaDialogComponent, {
      width: '850px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.agregarEvento(result);
      }
    });
  }

  toggleSelect() {
    this.selectAbierto = !this.selectAbierto;
    console.log('Toggle select abierto:', this.selectAbierto); // Depuración
  }
  
  toggleSelect2() {
    this.selectAbierto2 = !this.selectAbierto2;
    console.log('Toggle select2 abierto:', this.selectAbierto2); // Depuración
  }

  buscarSuplencia() {
    if (this.selectedCuidador) {
      // Filtrar la lista de pacientes antes de buscar suplencias
      this.filteredPacientes = this.pacientes.filter(paciente => paciente.id_cuidador_paciente === this.selectedCuidador!.id_cuidador_paciente);
      // Luego, puedes realizar la búsqueda de suplencias
      // ...
    }
  }

  

  agregarEvento(suplencia: any): void {
    const nuevoEvento = {
      title: 'Suplencia',
      start: suplencia.fechaInicio,
      end: suplencia.fechaFin,
      description: 'Suplencia',
      costo: suplencia.costo,
      particular: suplencia.particular,
      cuidador: suplencia.cuidador
    };

    this.events = [...this.events, nuevoEvento];
  }
}
