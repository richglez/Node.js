import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nueva-suplencia-dialog',
  templateUrl: './nueva-suplencia-dialog.component.html',
  styleUrl: './nueva-suplencia-dialog.component.scss'
})
export class NuevaSuplenciaDialogComponent {
  constructor(public dialogRef: MatDialogRef<NuevaSuplenciaDialogComponent>) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close(true);
    
  }

}
