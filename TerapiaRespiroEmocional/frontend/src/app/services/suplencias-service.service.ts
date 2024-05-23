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
    id_cuidador_paciente: 0,
    dia_suplencia: '',
    hora_inicial: '',
    hora_final: '',
    costoGuardia: 0,
    particular: '',
  };

  constructor(private http: HttpClient) {}

  addSuplencia(
    id_cuidador_paciente: number,
    dia_suplencia: string,
    hora_inicial: string,
    hora_final: string,
    costoGuardia: number,
    particular: string
  ): Observable<any> {
    const suplencia: Suplencia = {
      id_cuidador_paciente,
      dia_suplencia,
      hora_inicial,
      hora_final,
      costoGuardia,
      particular,
    };
    console.log('Datos enviados para la nueva suplencia:', suplencia);
    return this.http.post<any>(`${this.URL_API}`, suplencia);
  }

  getSuplencias(): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(this.URL_API);
  }
}
