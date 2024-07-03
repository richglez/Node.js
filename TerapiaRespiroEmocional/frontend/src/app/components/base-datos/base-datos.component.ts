import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';

@Component({
  selector: 'app-base-datos',
  templateUrl: './base-datos.component.html',
  styleUrls: ['./base-datos.component.scss']
})
export class BaseDatosComponent implements OnInit {
  searchText: string = '';
  selectedCategory: string = 'pacientes';
  selectedStatus: string = 'activo';
  pacientes: any[] = [];
  cuidadores: any[] = [];
  suplencias: any[] = [];

  constructor(
    private pacientesService: PacientesService,
    private cuidadoresService: CuidadoresServiceService,
    private suplenciasService: SuplenciasServiceService
  ) {}

  ngOnInit(): void {}

  search() {
    if (this.selectedCategory === 'pacientes') {
      this.pacientesService.searchAllPacientes(this.searchText).subscribe(data => {
        this.pacientes = data;
      });
    } else if (this.selectedCategory === 'cuidadores') {
      this.cuidadoresService.searchAllCuidadores(this.searchText).subscribe(data => {
        this.cuidadores = data;
      });
    } else if (this.selectedCategory === 'suplencias') {
      // Aquí podrías agregar lógica similar para buscar suplencias
      // this.suplenciasService.searchAllSuplencias(this.searchText).subscribe(data => {
      //   this.suplencias = data;
      // });
    }
  }

  editPaciente(id: number) {
    console.log('Editar paciente con id:', id);
    // Lógica para editar paciente
  }

  deletePaciente(id: number) {
    this.pacientesService.deletePaciente(id).subscribe(() => {
      this.pacientes = this.pacientes.filter(paciente => paciente.id_paciente !== id);
    });
  }

  editCuidador(id: number) {
    console.log('Editar cuidador con id:', id);
    // Lógica para editar cuidador
  }

  deleteCuidador(id: number) {
    this.cuidadoresService.deleteCuidador(id).subscribe(() => {
      this.cuidadores = this.cuidadores.filter(cuidador => cuidador.id_cuidador_paciente !== id);
    });
  }

  editSuplencia(id: number) {
    console.log('Editar suplencia con id:', id);
    // Lógica para editar suplencia
  }

  deleteSuplencia(id: number) {
    this.suplenciasService.deleteSuplencia(id).subscribe(() => {
      this.suplencias = this.suplencias.filter(suplencia => suplencia.id_suplencia !== id);
    });
  }
}
