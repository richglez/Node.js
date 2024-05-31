import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { PacientesService } from '../../services/pacientes.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Cuidador } from '../../models/cuidadores';
import { Paciente } from '../../models/pacientes';

@Component({
  selector: 'app-nueva-suplencia-dialog',
  templateUrl: './nueva-suplencia-dialog.component.html',
  styleUrls: ['./nueva-suplencia-dialog.component.scss'],
})
export class NuevaSuplenciaDialogComponent implements OnInit {
  public filteredPacientes: Paciente[] = [];
  public selectedCuidador: any; // Tipo debe ser ajustado según la definición de tu modelo de cuidador
  public cuidadores: Cuidador[] = [];
  public pacientes: Paciente[] = [];

  @ViewChild('suplenciaForm') suplenciaForm!: NgForm; // Añadir referencia al formulario

  cuidadoresList: any[] = [];
  pacientesList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<NuevaSuplenciaDialogComponent>,
    public cuidadoresService: CuidadoresServiceService,
    public pacientesService: PacientesService,
    public suplenciasService: SuplenciasServiceService
  ) {}

  ngOnInit() {
    // Obtener la lista de cuidadores
    this.cuidadoresService.getCuidadores().subscribe(
      (cuidadores) => {
        this.cuidadoresList = cuidadores;
      },
      (err) => {
        console.error(err);
      }
    );
    // Obtener la lista de pacientes
    this.pacientesService.getPacientes().subscribe(
      (pacientes) => {
        this.pacientesList = pacientes;
        this.filteredPacientes = this.pacientesList;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onChangeCuidador() {
    console.log('Cuidador seleccionado:', this.suplenciasService.selectedSuplencia.id_cuidador_paciente);
  }
  

  onChangePaciente(){
    console.log('Paciente seleccionado:', this.suplenciasService.selectedSuplencia.id_paciente);
  }


  
  
  

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar() {
    const suplencia = this.suplenciasService.selectedSuplencia;
  
    if (!suplencia.id_cuidador_paciente) {
      
      console.error('Cuidador no seleccionado');
      return;
    }
  
    this.suplenciasService
      .addSuplencia(suplencia)
      .subscribe(
        (response) => {
          console.log('Suplencia agregada exitosamente', response);
          this.resetForm(); // Reiniciar el formulario después de agregar exitosamente
        },
        (error) => {
          console.error('Error al agregar suplencia', error);
        }
      );
  }
  

  resetForm() {
    this.suplenciasService.selectedSuplencia = {
      id_cuidador_paciente: 0,
      dia_suplencia: '',
      hora_inicial: '',
      hora_final: '',
      costoGuardia: 0,
      particular: '',
    };
    this.suplenciaForm.resetForm();
  }


}