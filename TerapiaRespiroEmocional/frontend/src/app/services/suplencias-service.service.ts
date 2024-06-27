import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // métodos http
import { Suplencia } from '../models/suplencias'; // interfaz
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
    concurrencia_anual: '',
    id_paciente: 0,
  };

  constructor(private http: HttpClient) {}

  getSuplencias() {
    return this.http.get<Suplencia[]>(this.URL_API);
  }


  addSuplencia(suplencia: Suplencia) {
    return this.http.post<{ id_suplencia: number }>(this.URL_API, suplencia);
  }

  // Método para buscar suplencias
  buscarSuplenciasPorCuidadorYPaciente(
    idCuidador: number,
    idPaciente: number
  ): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(`${this.URL_API}/buscar`, {
      params: {
        id_cuidador: idCuidador.toString(),
        id_paciente: idPaciente.toString(),
      },
    });
  }

  getTotalSuplencias(): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-suplencias`);
  }

  updateSuplencia(suplencia: Suplencia): Observable<any> {
    return this.http.put(`${this.URL_API}/${suplencia.id_suplencia}`, suplencia);
  }
  //PORQUE ASI ESTA LA RUTA EN EL BACKEND DE ESTA FUNCION: // router.put('/suplencias/:id', pacientesCtrls.updateSuplencia);


  deleteSuplencia(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}
