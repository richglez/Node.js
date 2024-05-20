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
  @ViewChild('suplenciaForm') suplenciaForm!: NgForm; // Add this line

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

  confirmar(): void {
    if (this.suplenciaForm.valid) {
      const { id_cuidador_paciente, dia_suplencia, hora_inicial, hora_final, costoGuardia, particular } = this.suplenciaForm.value;
      this.suplenciasService.addSuplencia(id_cuidador_paciente, dia_suplencia, hora_inicial, hora_final, costoGuardia, particular).subscribe(
        (response) => {
          console.log('Suplencia agregada exitosamente', response);
          this.dialogRef.close(true);
          // this.actualizarEventos();
        },
        (error) => {
          console.error('Error al agregar suplencia', error);
          // Manejar el error apropiadamente
        }
      );
    } else {
      console.error('Formulario inválido');
      // Manejar la validación del formulario
    }
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
