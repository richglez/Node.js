import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent implements OnInit {

  // constructor
  constructor(public employeeService: EmployeeService){ //instancia, poder tener todos los metodos
  }

  // main
  ngOnInit(): void {  // se ejecuta cada vez que se inicia la aplicacion
    this.getEmployees();
  }


  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res
      },
      err => console.log(err)
      
      
    )
  }


  addEmployee(form: NgForm){
    this.employeeService.addEmployer(form.value).subscribe(
      res => {
        this.getEmployees();
      },
      err => console.log(err)
    
    )
    
  }


  deleteEmployee(id_employee: string){
    if (confirm('Are you sure to delete this employee?')) {
      this.employeeService.deleteEmployee(id_employee).subscribe(
        res => {
          console.log(res , id_employee);
          this.getEmployees(); // Actualizar la lista de empleados después de eliminar uno
        },
        err => console.log(err)
      );
    }
  }

  
  

  
}
