import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import { Subject, of } from 'rxjs';
import * as XLSX from 'xlsx';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-base-datos',
  templateUrl: './base-datos.component.html',
  styleUrls: ['./base-datos.component.scss'],
})
export class BaseDatosComponent implements OnInit {
  searchText: string = '';
  searchTextChanged: Subject<string> = new Subject<string>();
  selectedCategory: string = 'pacientes';
  pacientes: any[] = [];
  cuidadores: any[] = [];
  suplencias: any[] = [];
  filteredPacientes: any[] = [];
  filteredCuidadores: any[] = [];
  filteredSuplencias: any[] = [];

  constructor(
    private pacientesService: PacientesService,
    private cuidadoresService: CuidadoresServiceService,
    private suplenciasService: SuplenciasServiceService
  ) {}


  ngOnInit(): void {
    this.loadCategoryData();
    this.searchTextChanged.pipe(
      debounceTime(300), // Esperar 300ms para evitar solicitudes excesivas
      distinctUntilChanged(), // Solo emitir si el texto ha cambiado
      switchMap(searchText => this.filterData(searchText)) // Filtrar los datos basados en el texto de búsqueda
    ).subscribe(filteredData => {
      this.applyFilteredData(filteredData);
    });
  }

  loadCategoryData(): void {
    if (this.selectedCategory === 'pacientes') {
      this.pacientesService.getNombreCuidadorDelPaciente().subscribe((data) => {
        this.pacientes = data;
        this.filteredPacientes = data;
      });
    } else if (this.selectedCategory === 'cuidadores') {
      this.cuidadoresService.getCuidadores().subscribe((data) => {
        this.cuidadores = data;
        this.filteredCuidadores = data;
      });
    } else if (this.selectedCategory === 'suplencias') {
      this.suplenciasService.getNombreCuidadoryPaciente().subscribe((data) => {
        this.suplencias = data;
        this.filteredSuplencias = data;
      });
    }
  }

  filterData(searchText: string) {
    const lowerSearchText = searchText.toLowerCase();
    if (this.selectedCategory === 'pacientes') {
      this.filteredPacientes = this.pacientes.filter(paciente =>
        paciente.nombre_paciente.toLowerCase().includes(lowerSearchText) ||
        paciente.apellido_paterno.toLowerCase().includes(lowerSearchText) ||
        paciente.apellido_materno.toLowerCase().includes(lowerSearchText) ||
        paciente.diagnostico.toLowerCase().includes(lowerSearchText) ||
        paciente.sexo_paciente.toLowerCase().includes(lowerSearchText)
      );
    } else if (this.selectedCategory === 'cuidadores') {
      this.filteredCuidadores = this.cuidadores.filter(cuidador =>
        cuidador.nombreCuidador.toLowerCase().includes(lowerSearchText) ||
        cuidador.apPatCuidador.toLowerCase().includes(lowerSearchText) ||
        cuidador.apMatCuidador.toLowerCase().includes(lowerSearchText) ||
        cuidador.telefonoCuidador.toLowerCase().includes(lowerSearchText)
      );
    } else if (this.selectedCategory === 'suplencias') {
      this.filteredSuplencias = this.suplencias.filter(suplencia =>
        suplencia.dia_suplencia.toLowerCase().includes(lowerSearchText) ||
        suplencia.hora_inicial.toLowerCase().includes(lowerSearchText) ||
        suplencia.hora_final.toLowerCase().includes(lowerSearchText) ||
        suplencia.particular.toLowerCase().includes(lowerSearchText) ||
        suplencia.concurrencia_anual.toLowerCase().includes(lowerSearchText)
      );
    }
    return of([]);
  }

  applyFilteredData(data: any): void {
    // No es necesario para este enfoque
  }

  onSearchChange(): void {
    this.searchTextChanged.next(this.searchText);
  }

  search(): void {
    this.loadCategoryData();
  }

  /* Default name for excel file when download */
  fileName1 = 'BaseDatosPacientes.xlsx';
  fileName2 = 'BaseDatosCuidadores.xlsx';
  fileName3 = 'BaseDatosSuplencias.xlsx';
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
      this.pacientes = this.pacientes.filter(
        (paciente) => paciente.id_paciente !== id
      );
    });
  }

  editCuidador(id: number) {
    console.log('Editar cuidador con id:', id);
    // Lógica para editar cuidador
  }

  deleteCuidador(id: number) {
    this.cuidadoresService.deleteCuidador(id).subscribe(() => {
      this.cuidadores = this.cuidadores.filter(
        (cuidador) => cuidador.id_cuidador_paciente !== id
      );
    });
  }

  editSuplencia(id: number) {
    console.log('Editar suplencia con id:', id);
    // Lógica para editar suplencia
  }

  deleteSuplencia(id: number) {
    this.suplenciasService.deleteSuplencia(id).subscribe(() => {
      this.suplencias = this.suplencias.filter(
        (suplencia) => suplencia.id_suplencia !== id
      );
    });
  }
}


