import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service' //Importar la clase del servicio emp
import { log } from 'console';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  constructor(private employeeService: EmployeeService){ //con esto ya se pueden recibir los metodos de la clase

  }

  ngOnInit(): void{
    this.employeeService.getEmployees().subscribe(
      res => console.log(res),
      err => console.log(err);
      
      
    )    
  }
}
