import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employees'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://localhost:4000/api/employees'
  employees: Employee[] =[]

  selectedEmployee: Employee = {
    id_employee: -1,
    name_employee: '',
    salary_employee: 0,
  }
  // constructor
  constructor(private http: HttpClient) {
  }




  // metodos del backend // traer los datos desde el backend = peticion HTTP
  getEmployees(){
    return this.http.get<Employee[]>(this.URL_API)

  }


  addEmployer(employee: Employee){
    return this.http.post(this.URL_API, employee)
  }


  deleteEmployee(id_employee: string){
    return this.http.delete(`${this.URL_API}/${id_employee}`) // concatenacion de URL
  }


}
