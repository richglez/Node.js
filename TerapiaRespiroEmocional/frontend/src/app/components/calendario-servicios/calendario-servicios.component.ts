import { Component, OnInit } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PacientesService } from '../../services/pacientes.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NuevaSuplenciaDialogComponent } from '../nueva-suplencia-dialog/nueva-suplencia-dialog.component';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { Cuidador } from '../../models/cuidadores';
import { Paciente } from '../../models/pacientes';
import { Suplencia } from '../../models/suplencias';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-calendario-servicios',
  templateUrl: './calendario-servicios.component.html',
  styleUrls: ['./calendario-servicios.component.scss'],
})
export class CalendarioServiciosComponent implements OnInit {
  public events: any[] = [];
  public options: any;
  public selectedCuidador: Cuidador | null = null;
  public selectedPaciente: Paciente | null = null;
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
    public cuidadoresService: CuidadoresServiceService,
    public suplenciasService: SuplenciasServiceService
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
  }

  ngOnInit() {
    this.cuidadoresService.getCuidadores().subscribe(
      (cuidadores) => {
        this.cuidadores = cuidadores;
      },
      (err) => {
        console.error(err);
      }
    );
  
    this.pacientesService.getPacientes().subscribe(
      (pacientes) => {
        this.pacientes = pacientes;
        this.filteredPacientes = this.pacientes;
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
    this.filteredPacientes = this.pacientes.filter(paciente => paciente.id_cuidador_paciente === cuidador.id_cuidador_paciente);
    console.log(`Seleccionaste al cuidador: ${this.selectedCuidador.id_cuidador_paciente}`);
    
  }

  seleccionarPaciente(paciente: Paciente) {
    this.selectedPaciente = paciente;
    this.searchTextPacientes = `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`;
    console.log(`Seleccionaste al paciente: ${this.selectedPaciente.id_paciente}`);
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
  }

  toggleSelect2() {
    this.selectAbierto2 = !this.selectAbierto2;
  }

  buscarSuplencia() {
    const idCuidador = this.selectedCuidador?.id_cuidador_paciente;
    const idPaciente = this.selectedPaciente?.id_paciente;


    console.log(`Buscar la suplencia del cuidador: ${idCuidador}, con el paciente: ${idPaciente}`);
    // console.log(`Suplencia: ${this.suplenciasService.buscarSuplenciasPorCuidadorYPaciente(idCuidador, idPaciente )} `)
    
  
    // if (idCuidador === undefined) {
    //   console.error('El cuidador seleccionado no tiene un ID válido');
    //   return;
    // }
  
    // // Obtener todos los pacientes que son cuidados por el cuidador seleccionado
    // const pacientesDelCuidador = this.pacientes.filter(paciente => paciente.id_cuidador_paciente === idCuidador && paciente.id_cuidador_paciente !== undefined);
  
    // // Obtener las suplencias para cada paciente
    // const observables = pacientesDelCuidador.map(paciente =>
    //   paciente.id_cuidador_paciente !== undefined && paciente.id_paciente !== undefined ?
    //     this.suplenciasService.buscarSuplenciasPorCuidadorYPaciente(idCuidador, paciente.id_paciente) :
    //     []
    // );
    
  
    // // Combinar observables para esperar a que todas las solicitudes de suplencias se completen
    // forkJoin(observables).subscribe(
    //   (suplenciasPorPaciente: any[]) => {
    //     // suplenciasPorPaciente es una matriz de matrices de suplencias por cada paciente
    //     const suplencias = [].concat(...suplenciasPorPaciente); // Aplanar la matriz
  
    //     // Mostrar las suplencias en el calendario
    //     this.mostrarSuplenciasEnCalendario(suplencias);
    //   },
    //   (error: any) => {
    //     console.error('Error al obtener suplencias', error);
    //   }
    // );
  }







  
  
  
  
  mostrarSuplenciasEnCalendario(suplencias: Suplencia[]): void {
    if (!this.selectedCuidador) {
      console.error('No se ha seleccionado un cuidador');
      return;
    }
  
    this.events = suplencias.map((suplencia) => ({
      title: 'Suplencia',
      start: `${suplencia.dia_suplencia}T${suplencia.hora_inicial}`,
      end: `${suplencia.dia_suplencia}T${suplencia.hora_final}`,
      description: `Cuidador: ${this.selectedCuidador?.id_cuidador_paciente}`,
    }));
  }
  
  
  

  agregarEvento(suplencia: Suplencia): void {
    const nuevoEvento = {
      title: 'Suplencia',
      start: suplencia.dia_suplencia + 'T' + suplencia.hora_inicial,
      end: suplencia.dia_suplencia + 'T' + suplencia.hora_final,
      description: `Cuidador: ${suplencia.id_cuidador_paciente}`,
      costo: suplencia.costoGuardia,
      particular: suplencia.particular,
    };

    this.events = [...this.events, nuevoEvento];
  }
}
