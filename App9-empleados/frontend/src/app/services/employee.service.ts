import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employees'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://localhost:4000/api/employees'
  employees: Employee[] = [];

  // constructor
  constructor(private http: HttpClient) {

  }

  // metodos
  getEmployees(){
    return this.http.get<Employee[]>(this.URL_API)

  }

  addEmployer(employee: Employee){
    return this.http.post<Employee>(this.URL_API, employee);
  }
}
