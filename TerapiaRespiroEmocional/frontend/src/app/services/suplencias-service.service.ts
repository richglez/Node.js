import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // metodos http
import { Suplencia } from '../models/suplencias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuplenciasServiceService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/pacientes';
  suplencia: Suplencia[] = [];

  nuevaSuplencia: Suplencia = {
    dia_suplencia: '',
    hora_inicial: '',
    hora_final: '',
    costoGuardia: 0,
    particular: ''
  };
  

  constructor(private http: HttpClient) {}

  addSuplencia(idPaciente: number, idCuidador: number, suplencia: Suplencia) {
    return this.http.post(
      `${this.URL_API}/${idPaciente}/suplencias/${idCuidador}`,
      suplencia
    );
  }
}
