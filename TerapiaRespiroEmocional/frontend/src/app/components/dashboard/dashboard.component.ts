import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  totalPacientes: number = 10; // Aquí debes obtener el número real de pacientes registrados
  totalCuidadores: number = 5; // Aquí debes obtener el número real de cuidadores registrados
  totalSuplenciasRegistradas: number = 40; // Aquí debes obtener el número real de totalSuplenciasRegistradas
  totalPacientesMenoresEdad: number = 20; // Aquí debes obtener el número real de totalPacientesMenoresEdad
  totalPacientesMayoresEdad: number = 30; // Aquí debes obtener el número real de totalPacientesMayoresEdadZ
  totalCECPAM: number = 30; // Aquí debes obtener el número real de totalCECPAM

  
}