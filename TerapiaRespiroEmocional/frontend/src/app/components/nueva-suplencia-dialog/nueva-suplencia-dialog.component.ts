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
  public cuidadores: Cuidador[] = [];
  public pacientes: Paciente[] = [];

  @ViewChild('suplenciaForm') suplenciaForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<NuevaSuplenciaDialogComponent>,
    public cuidadoresService: CuidadoresServiceService,
    public pacientesService: PacientesService,
    public suplenciasService: SuplenciasServiceService
  ) {}

  ngOnInit() {
    this.cuidadoresService.getCuidadores().subscribe(
      (cuidadores) => {
        this.cuidadores = cuidadores;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onChangeCuidador() {
    const selectedCuidadorId = this.suplenciasService.selectedSuplencia.id_cuidador_paciente;
    if (selectedCuidadorId !== undefined) {
      this.pacientesService.getPacienteByCuidador(selectedCuidadorId).subscribe(
        (pacientes) => {
          this.filteredPacientes = pacientes;
          this.suplenciasService.selectedSuplencia.id_paciente = this.filteredPacientes[0]?.id_paciente || 0; // Establecer el primer paciente como predeterminado
        },
        (err) => {
          console.error(err);
        }
      );
    }
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
  
    if (!suplencia.id_paciente) {
      console.error('Paciente no seleccionado');
      return;
    }
  
    this.suplenciasService.addSuplencia(suplencia).subscribe(
      (response) => {
        console.log('Suplencia agregada exitosamente', response);
        this.resetForm();
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
      id_paciente: 0
    };
    this.suplenciaForm.resetForm();
  }
}
