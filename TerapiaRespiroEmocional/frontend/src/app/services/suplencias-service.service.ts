import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // metodos http
import { Suplencia } from '../models/suplencias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuplenciasServiceService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/suplencias';
  suplencia: Suplencia[] = [];

  selectedSuplencia: Suplencia = {
    dia_suplencia: '',
    hora_inicial: '',
    hora_final: '',
    costoGuardia: 0,
    particular: '',
    id_cuidador_paciente: 0,
    id_paciente: 0
  };

  constructor(private http: HttpClient) {}

  addSuplencia(){

  }
  

  getSuplencias(): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(this.URL_API);
  }


  buscarSuplenciasPorCuidadorYPaciente(idCuidador: number, idPaciente: number): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(`${this.URL_API}/buscar?cuidador=${idCuidador}&paciente=${idPaciente}`);
  }
  
  
}
