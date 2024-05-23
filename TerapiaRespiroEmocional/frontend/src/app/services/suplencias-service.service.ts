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
  };

  constructor(private http: HttpClient) {}

  addSuplencia(suplencia: Suplencia): Observable<Suplencia> {
    return this.http.post<Suplencia>('/api/suplencias', suplencia);
  }

  getSuplenciasByCuidadorAndPaciente(id_cuidador_paciente: number, id_paciente: number): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(`/api/suplencias?cuidador=${id_cuidador_paciente}&paciente=${id_paciente}`);
  }
}
