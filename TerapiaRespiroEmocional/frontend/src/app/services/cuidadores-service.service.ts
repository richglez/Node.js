import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // metodos http
import { Cuidador } from '../models/cuidadores'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuidadoresServiceService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/cuidadores';
  cuidador: Cuidador[] = [];


  selectedCuidador: Cuidador = {
    // todos los datos del cuidador
    nombreCuidador: '',
    apPatCuidador: '',
    apMatCuidador: '',
    sexoCuidador: '',
    edadCuidador: '',
    telefonoCuidador: '',
    num_suplencias: 0,
    ultima_modificacion: '',
    ingreso_programa: ''
  }

  constructor(private http: HttpClient) { }


  getCuidadores() {
    return this.http.get<Cuidador[]>(this.URL_API);
  }  


  searchAllCuidadores(textoBusqueda: string): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(
      `${this.URL_API}/search?buscarAlcuidador=${textoBusqueda}`
    );
  }


  getCuidadorById(id: number): Observable<Cuidador> {
    return this.http.get<Cuidador>(`${this.URL_API}/${id}`);
  }


  addCuidador(cuidador: Cuidador) {
    return this.http.post(this.URL_API, cuidador);
  }

  updateCuidador(cuidador: Cuidador): Observable<any> {
    return this.http.put(`${this.URL_API}/${cuidador.id_cuidador_paciente}`, cuidador); // url + los datos del paciente
  }




}
