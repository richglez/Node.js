import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { PacientesService } from '../../services/pacientes.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nueva-suplencia-dialog',
  templateUrl: './nueva-suplencia-dialog.component.html',
  styleUrls: ['./nueva-suplencia-dialog.component.scss'],
})
export class NuevaSuplenciaDialogComponent implements OnInit {
  @ViewChild('suplenciaForm') suplenciaForm!: NgForm; // Añadir referencia al formulario

  cuidadoresList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<NuevaSuplenciaDialogComponent>,
    public cuidadoresService: CuidadoresServiceService,
    public pacientesService: PacientesService,
    public suplenciasService: SuplenciasServiceService
  ) {}

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
  }
}