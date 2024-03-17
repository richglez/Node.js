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
  constructor(public employeeService: EmployeeService){
  }

  // main
  ngOnInit(): void {  // se ejecuta cada vez que se inicia la aplicacion
    this.getEmployees();
  }


  // metodos
  getEmployees(){  // *metodo de obtener empleados
    this.employeeService.getEmployees().subscribe(
      (res) => {
        this.employeeService.employees = res  // obtener un arreglo de empleados de services
      },
      (err) => {
        console.error(err)
      }
    )
    
  }

  addEmployer(form: NgForm){
    this.employeeService.addEmployer(form.value).subscribe(
      (res) => {
        // Actualizar la lista de empleados después de agregar uno nuevo
        this.getEmployees();
        // Reiniciar el formulario después de agregar un nuevo empleado
        form.reset();
      },
      (err) => {
        console.error(err);
      }
    );
  }
  
}
