import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Paciente } from '../../models/pacientes';


@Component({
  selector: 'app-dialogo-agendar-servicio',
  templateUrl: './dialogo-agendar-servicio-component.component.html',
})
export class DialogoAgendarServicioComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoAgendarServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paciente: Paciente }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
