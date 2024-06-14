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
import { DatePipe } from '@angular/common';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { CalendarOptions, EventClickArg, EventDropArg } from '@fullcalendar/core';
import Swal from 'sweetalert2';

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
  fechaFormateada: string = '';

  constructor(
    public pacientesService: PacientesService,
    public dialog: MatDialog,
    public cuidadoresService: CuidadoresServiceService,
    public suplenciasService: SuplenciasServiceService
  ) {
    this.events = [];
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      eventResizableFromStart: true,
      eventDrop: this.handleEventDrop.bind(this),
      eventClick: this.handleEventClick.bind(this),
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      eventContent: this.renderEventContent.bind(this),
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

  handleEventDrop(eventDropInfo: EventDropArg) {
    const event = eventDropInfo.event;
    if (!event.start) return; // Verificamos que event.start no sea nulo

    const suplencia = {
      id_suplencia: Number(event.id),
      dia_suplencia: event.start.toISOString().split('T')[0],
      hora_inicial: event.start.toISOString().split('T')[1].substr(0, 5),
      hora_final: event.end ? event.end.toISOString().split('T')[1].substr(0, 5) : event.start.toISOString().split('T')[1].substr(0, 5),
      costoGuardia: 0, // Completar con un valor válido
      particular: '', // Completar con un valor válido
      concurrencia_anual: '', // Completar con un valor válido
      id_cuidador_paciente: 0, // Completar con un valor válido
      id_paciente: 0, // Completar con un valor válido
    };

    this.suplenciasService.updateSuplencia(suplencia).subscribe(
      (response) => {
        alert('¡Suplencia actualizada exitosamente!');
        console.log('Suplencia actualizada exitosamente', response);
      },
      (error) => {
        console.error('Error al actualizar suplencia', error);
      }
    );
  }

  handleEventClick(info: EventClickArg) {
    const event = info.event;
    if (!event || typeof event.id !== 'string') return;

    const eventId = typeof event.id === 'number' ? event.id : parseInt(event.id, 10);

    Swal.fire({
      title: '¿Estás seguro de eliminar esta suplencia?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.suplenciasService.deleteSuplencia(eventId).subscribe(() => {
          info.event.remove();
          Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
        });
      }
    });
  }


  renderEventContent(eventInfo: any) {
    return {
      html: `
        <div>
          <strong>${eventInfo.timeText}</strong>
          <br>
          <span>${eventInfo.event.title}</span>
          <br>
          <button onclick="deleteEvent(${eventInfo.event.id})">🗑️</button>
        </div>
      `
    };
  }

  deleteEvent(eventId: number) {
    this.suplenciasService.deleteSuplencia(eventId).subscribe(
      (response) => {
        alert('¡Suplencia eliminada exitosamente!');
        console.log('Suplencia eliminada exitosamente', response);
        this.events = this.events.filter(event => event.id !== eventId);
      },
      (error) => {
        console.error('Error al eliminar suplencia', error);
      }
    );
  }

  seleccionarCuidador(cuidador: Cuidador) {
    this.selectedCuidador = cuidador;
    this.searchTextCuidadores = `${cuidador.nombreCuidador} ${cuidador.apPatCuidador} ${cuidador.apMatCuidador}`;
    this.searchTextTotalSuplencias = cuidador.num_suplencias.toString();
    this.filteredPacientes = this.pacientes.filter(
      (paciente) =>
        paciente.id_cuidador_paciente === cuidador.id_cuidador_paciente
    );
    console.log(
      `Seleccionaste al cuidador: ${this.selectedCuidador.id_cuidador_paciente}`
    );
  }

  seleccionarPaciente(paciente: Paciente) {
    this.selectedPaciente = paciente;
    this.searchTextPacientes = `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`;
    console.log(
      `Seleccionaste al paciente: ${this.selectedPaciente.id_paciente}`
    );
  }

  agregarSuplencia(): void {
    const dialogRef = this.dialog.open(NuevaSuplenciaDialogComponent, {
      width: '850px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.agregarEvento(result);
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

    if (idCuidador && idPaciente) {
      this.suplenciasService
        .buscarSuplenciasPorCuidadorYPaciente(idCuidador, idPaciente)
        .subscribe(
          (suplencias) => {
            this.suplencias = suplencias;
            this.mostrarSuplenciasEnCalendario(suplencias);
          },
          (err) => {
            console.error('Error al buscar suplencias:', err);
          }
        );
    } else {
      console.error('Debes seleccionar un cuidador y un paciente.');
    }

    console.log(
      `Buscar la suplencia del cuidador: ${idCuidador}, con el paciente: ${idPaciente}`
    );
  }

 

  mostrarSuplenciasEnCalendario(suplencias: Suplencia[]): void {
    if (!this.selectedCuidador) {
      console.error('No se ha seleccionado un cuidador');
      return;
    }
  
    this.events = suplencias.map((suplencia) => {
      const fecha = suplencia.dia_suplencia.split('-');
      const horaInicial = suplencia.hora_inicial.split(':');
      const horaFinal = suplencia.hora_final.split(':');
  
      const start = new Date(
        parseInt(fecha[0]), // Año
        parseInt(fecha[1]) - 1, // Mes (restamos 1 porque los meses van de 0 a 11 en JavaScript)
        parseInt(fecha[2]), // Día
        parseInt(horaInicial[0]), // Hora
        parseInt(horaInicial[1]) // Minutos
      );
  
      const end = new Date(
        parseInt(fecha[0]), // Año
        parseInt(fecha[1]) - 1, // Mes
        parseInt(fecha[2]), // Día
        parseInt(horaFinal[0]), // Hora
        parseInt(horaFinal[1]) // Minutos
      );
  
      return {
        title: `Suplencia`,
        start,
        end,
        description: `Cuidador: ${this.selectedCuidador?.id_cuidador_paciente}`,
        allDay: false,
        // Aquí puedes agregar lógica adicional para manejar eventos recurrentes si es necesario
      };
    });
  
    console.log('Eventos actualizados:', this.events);
  }

}
