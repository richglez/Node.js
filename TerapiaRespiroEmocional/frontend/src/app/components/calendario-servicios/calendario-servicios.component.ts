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
import { SuplenciasServiceService } from '../../services/suplencias-service.service';

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
    public cuidadoresService: CuidadoresServiceService,
    private suplenciasService: SuplenciasServiceService
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
  }

  seleccionarPaciente(paciente: Paciente) {
    this.searchTextPacientes = `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`;
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
    if (this.selectedCuidador && this.searchTextPacientes) {
      const idCuidador = this.selectedCuidador.id_cuidador_paciente;
      const pacienteSeleccionado = this.filteredPacientes.find(paciente => 
        `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}` === this.searchTextPacientes
      );
  
      if (pacienteSeleccionado && pacienteSeleccionado.id_paciente !== undefined) {
        const idPaciente = pacienteSeleccionado.id_paciente;
        this.suplenciasService.buscarSuplenciasPorCuidadorYPaciente(idCuidador, idPaciente).subscribe(
          (suplencias: Suplencia[]) => {
            this.events = suplencias.map(suplencia => ({
              title: `Suplencia de ${this.searchTextCuidadores}`,
              start: `${suplencia.dia_suplencia}T${suplencia.hora_inicial}`,
              end: `${suplencia.dia_suplencia}T${suplencia.hora_final}`,
              description: `Costo: ${suplencia.costoGuardia}, Particular: ${suplencia.particular}`,
            }));
          },
          (error) => {
            console.error('Error fetching suplencias:', error);
          }
        );
      } else {
        console.warn('Paciente no encontrado o id_paciente es undefined');
      }
    } else {
      console.warn('Cuidador o paciente no seleccionado');
    }
  }
  
  
  
  

  agregarEvento(suplencia: any): void {
    const nuevoEvento = {
      title: `Suplencia de ${suplencia.cuidador}`,
      start: `${suplencia.dia_suplencia}T${suplencia.hora_inicial}`,
      end: `${suplencia.dia_suplencia}T${suplencia.hora_final}`,
      description: `Costo: ${suplencia.costoGuardia}, Particular: ${suplencia.particular}`,
    };

    this.events = [...this.events, nuevoEvento];
  }
}
