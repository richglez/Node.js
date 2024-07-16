import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Suplencia } from '../models/suplencias';
import { PacientesService } from '../services/pacientes.service';
import { CuidadoresServiceService } from '../services/cuidadores-service.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuplenciasServiceService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/suplencias';

  selectedSuplencia: Suplencia = {
    // todos los datos de la suplencia
    dia_suplencia: '',
    hora_inicial: '',
    hora_final: '',
    costoGuardia: 0,
    particular: '',
    id_cuidador_paciente: 0,
    concurrencia_anual: '',
    id_paciente: 0,
  };

  constructor(
    private http: HttpClient,
    private cuidadoresService: CuidadoresServiceService,
    private pacientesService: PacientesService
  ) {}

  getSuplencias(): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(this.URL_API);
  }

  addSuplencia(suplencia: Suplencia): Observable<{ id_suplencia: number }> {
    return this.http.post<{ id_suplencia: number }>(this.URL_API, suplencia);
  }

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
    return this.http.put(
      `${this.URL_API}/${suplencia.id_suplencia}`,
      suplencia
    );
  }

  deleteSuplencia(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getNombreCuidadoryPaciente(): Observable<any[]> {
    return forkJoin({
      suplencias: this.http.get<any[]>(this.URL_API),
      pacientes: this.pacientesService.getPacientes(),
      cuidadores: this.cuidadoresService.getCuidadores(),
    }).pipe(
      map(({ suplencias, pacientes, cuidadores }) => {
        return suplencias.map((suplencia) => {
          const paciente = pacientes.find(
            (p) => p.id_paciente === suplencia.id_paciente
          );
          const cuidador = cuidadores.find(
            (c) => c.id_cuidador_paciente === suplencia.id_cuidador_paciente
          );
          return {
            ...suplencia,
            nombreCompletoPaciente: paciente
              ? `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`
              : '',
            nombreCompletoCuidador: cuidador
              ? `${cuidador.nombreCuidador} ${cuidador.apPatCuidador} ${cuidador.apMatCuidador}`
              : ''
          };
        });
      })
    );
  }
  
}
