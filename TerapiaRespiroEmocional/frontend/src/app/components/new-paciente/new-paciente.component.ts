import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importante para trabajar con formularios en Angular
import { PacientesService } from '../../services/pacientes.service';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';

@Component({
  selector: 'app-new-paciente',
  templateUrl: './new-paciente.component.html',
  styleUrls: ['./new-paciente.component.scss'],
})
export class NewPacienteComponent implements OnInit {
  fechaActual: Date = new Date();
  textoConAcentos: string = '';
  txtFechaIngreso: string = '';
  cuidadoresList: any[] = [];
  otroCuidador: string = '';
  otraEntidadFederativa: string = '';
  otraNacionalidad: string = '';
  otroTipoPrograma: string = '';
  selectedCuidadorId: number | undefined;
  expediente_paciente: string = '';
  expedienteExistenteError: boolean = false; // Agrega una propiedad para el mensaje de error
  expedientesRegistrados: string[] = []; // Array para almacenar expedientes ya registrados
  // nombreCompletoCuidador: string = '';
  errorMessage: string = '';

  constructor(
    public pacientesService: PacientesService,
    public cuidadoresService: CuidadoresServiceService
  ) {} // Constructor

  ngOnInit() {
    const year = new Date().getFullYear().toString().slice(-2); //2024 a 24 nadamas
    const padding = '000';
    const nroRegistro = '1'; // Aquí debes obtener el número de registro de tu base de datos
    const nroRegistroPadded = (padding + nroRegistro).slice(-padding.length);

    this.expediente_paciente = `${year}/${nroRegistroPadded}`;
    this.txtFechaIngreso = this.fechaActual.toISOString().split('T')[0]; // No es necesario convertir a ISO

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

  //   onSelectCuidador(event: any) {
  //     console.log(this.nombreCompletoCuidador);
  // }

  expedienteExists(expediente: string): boolean {
    // Verifica si el expediente ya existe en la lista de pacientes registrados
    return this.expedientesRegistrados.includes(expediente);
  }

  addPaciente(form: NgForm) {
    // Verifica si el expediente ya existe
    if (this.expedienteExists(form.value.expediente_paciente)) {
      this.expedienteExistenteError = true;
      return;
    }

    // if (!form.valid) {
    //   alert('Por favor, completa todos los campos antes de continuar.');
    //   return;
    // }

    // if (!this.selectedCuidadorId) {
    //   alert('Por favor, selecciona un cuidador antes de continuar.');
    //   return;
    // }

    form.value.id_cuidador_paciente = this.selectedCuidadorId;

    if (form.value.id_paciente) {
      this.pacientesService.updatePaciente(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
        
      );
    } else {
      this.pacientesService.addPaciente(form.value).subscribe(
        (res) => {
          form.reset();
        },
        (err) => console.log(err)
      );
    }
  }
}
