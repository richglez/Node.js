import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import * as XLSX from 'xlsx';

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

  ngOnInit(): void {
    if (this.selectedCategory === 'pacientes') {
      this.pacientesService.getNombreCuidadorDelPaciente().subscribe(data => {
        this.pacientes = data;
      });
    }
  }

  search() {
    if (this.selectedCategory === 'pacientes') {
      this.pacientesService.getPacientes().subscribe(data => {
        this.pacientes = data;
      });
    } else if (this.selectedCategory === 'cuidadores') {
      this.cuidadoresService.getCuidadores().subscribe(data => {
        this.cuidadores = data;
      });
    } else if (this.selectedCategory === 'suplencias') {
      this.suplenciasService.getSuplencias().subscribe(data => {
        this.suplencias = data;
      });
    }
  }

  /* Default name for excel file when download */ 
  fileName1 = "BaseDatosPacientes.xlsx";
  fileName2 = "BaseDatosCuidadores.xlsx";
  fileName3 = "BaseDatosSuplencias.xlsx";
  exportExcel() {
    let data;
    let fileName;
    switch (this.selectedCategory) {
      case 'pacientes':
        data = document.getElementById('BaseDatosPacientes');
        fileName = this.fileName1;
        break;
      case 'cuidadores':
        data = document.getElementById('BaseDatosCuidadores');
        fileName = this.fileName2;
        break;
      case 'suplencias':
        data = document.getElementById('BaseDatosSuplencias');
        fileName = this.fileName3;
        break;
      default:
        return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
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
