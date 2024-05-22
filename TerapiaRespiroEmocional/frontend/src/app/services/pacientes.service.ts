import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // metodos http
import { Paciente } from '../models/pacientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/pacientes';
  paciente: Paciente[] = [];


  
  selectedPaciente: Paciente = {
    // todos los datos del paciente
    expediente_paciente: '',
    nombre_paciente: '',
    apellido_paterno: '',
    apellido_materno: '',
    sexo_paciente: '',
    edad_paciente: 0,
    nacionalidad: '',
    domicilio: '',
    colonia: '',
    alcaldia_municipio: '',
    entidadFederativa: '',
    diagnostico: '',
    cuidadorPrimario: '',
    tipoPrograma: '',
    ingreso_programa: '',
    recomendaciones: '',
    observaciones: '',
    suplencias: 0,
    id_cuidador_paciente: 0
  };

  
  // constructor
  constructor(private http: HttpClient) {}

  // metodos del backend // traer los datos desde el backend = peticion HTTP
  getPacientes() {
    return this.http.get<Paciente[]>(this.URL_API);
  }

  searchAllPacientes(textoBusqueda: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(
      `${this.URL_API}/search?buscarAlpaciente=${textoBusqueda}`
    );
  }

  getPacienteByCuidador(idCuidador: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.URL_API}/cuidador/${idCuidador}`);
  }
  

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.URL_API}/${id}`);
  }

  getExpedientes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.URL_API}/expedientes`);
  }

  addPaciente(paciente: Paciente) {
    return this.http.post(this.URL_API, paciente);
  }

  deletePaciente(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  updatePaciente(paciente: Paciente): Observable<any> {
    return this.http.put(`${this.URL_API}/${paciente.id_paciente}`, paciente); // url + los datos del paciente
  }

}
