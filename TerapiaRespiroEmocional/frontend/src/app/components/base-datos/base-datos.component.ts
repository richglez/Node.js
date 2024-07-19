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
  selectedSexo: string = ''; // Añadido para filtrar por sexo, POR DEFAILT TODOS LOS TIPOS DE SEXO
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
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchText => this.filterData(searchText))
    ).subscribe(filteredData => {
      this.applyFilteredData(filteredData);
    });
  }

  loadCategoryData(): void {
    if (this.selectedCategory === 'pacientes') {
      this.pacientesService.getNombreCuidadorDelPaciente().subscribe((data) => {
        console.log('Datos de pacientes:', data);
        this.pacientes = data;
        this.filteredPacientes = data;
      }, error => {
        console.error('Error al cargar pacientes:', error);
      });
    } else if (this.selectedCategory === 'cuidadores') {
      this.cuidadoresService.getCuidadores().subscribe((data) => {
        console.log('Datos de cuidadores:', data);
        this.cuidadores = data;
        this.filteredCuidadores = data;
      }, error => {
        console.error('Error al cargar cuidadores:', error);
      });
    } else if (this.selectedCategory === 'suplencias') {
      this.suplenciasService.getNombreCuidadoryPaciente().subscribe((data) => {
        console.log('Datos de suplencias:', data);
        this.suplencias = data;
        this.filteredSuplencias = data;
      }, error => {
        console.error('Error al cargar suplencias:', error);
      });
    }
  }

  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  
  filterBySexo(data: any[]): any[] { //filtrar los datos en función del sexo seleccionado.
    if (!this.selectedSexo) { // para capturar el valor seleccionado en el filtro de sexo.
      return data;
    }
    return data.filter(item => item.sexo_paciente === this.selectedSexo || item.sexoCuidador === this.selectedSexo);
  }

  filterData(searchText: string) {
    const lowerSearchText = searchText.toLowerCase();
    let filteredData: any[] = [];
    
    if (this.selectedCategory === 'pacientes') {
      const normalizedSearchText = this.removeAccents(lowerSearchText);
    
      filteredData = this.pacientes.filter(paciente =>
        this.removeAccents(paciente.nombre_paciente.toLowerCase()).includes(normalizedSearchText) ||
        this.removeAccents(paciente.apellido_paterno.toLowerCase()).includes(normalizedSearchText) ||
        this.removeAccents(paciente.apellido_materno.toLowerCase()).includes(normalizedSearchText) ||
        this.removeAccents(paciente.alcaldia_municipio.toLowerCase()).includes(normalizedSearchText) ||
        this.removeAccents(paciente.entidadFederativa.toLowerCase()).includes(normalizedSearchText) ||
        this.removeAccents(paciente.sexo_paciente.toLowerCase()).includes(normalizedSearchText) ||
        this.removeAccents(paciente.tipoPrograma.toLowerCase()).includes(normalizedSearchText)
      );
      
      // Aplica el filtro por sexo
      filteredData = this.filterBySexo(filteredData);
    } else if (this.selectedCategory === 'cuidadores') {
      filteredData = this.cuidadores.filter(cuidador =>
        this.removeAccents(cuidador.nombreCuidador.toLowerCase()).includes(lowerSearchText) ||
        this.removeAccents(cuidador.apPatCuidador.toLowerCase()).includes(lowerSearchText) ||
        this.removeAccents(cuidador.apMatCuidador.toLowerCase()).includes(lowerSearchText) ||
        this.removeAccents(cuidador.telefonoCuidador.toLowerCase()).includes(lowerSearchText)
      );
      
      // Aplica el filtro por sexo
      filteredData = this.filterBySexo(filteredData);
    } else if (this.selectedCategory === 'suplencias') {
      filteredData = this.suplencias.filter(suplencia =>
        this.removeAccents(suplencia.dia_suplencia.toLowerCase()).includes(lowerSearchText) ||
        this.removeAccents(suplencia.hora_inicial.toLowerCase()).includes(lowerSearchText) ||
        this.removeAccents(suplencia.hora_final.toLowerCase()).includes(lowerSearchText) ||
        this.removeAccents(suplencia.particular.toLowerCase()).includes(lowerSearchText) ||
        this.removeAccents(suplencia.concurrencia_anual.toLowerCase()).includes(lowerSearchText)
      );
    }
    
    return of(filteredData);
  }
  
  

  applyFilteredData(filteredData: any): void {
    if (this.selectedCategory === 'pacientes') {
      this.filteredPacientes = filteredData;
    } else if (this.selectedCategory === 'cuidadores') {
      this.filteredCuidadores = filteredData;
    } else if (this.selectedCategory === 'suplencias') {
      this.filteredSuplencias = filteredData;
    }
  }
  

  onSearchChange(): void { //para recargar los datos cuando cambie la selección DE BUSQUEDA.
    this.searchTextChanged.next(this.searchText);
  }

  onSexoChange(): void {  //para recargar los datos cuando cambie la selección de sexo.
    this.loadCategoryData();
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

}


