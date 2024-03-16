import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://localhost:4000'
  constructor(private http: HttpClient) {

  }





  getEmployees(){
    this.http.get(this.URL_API)
  }
}
