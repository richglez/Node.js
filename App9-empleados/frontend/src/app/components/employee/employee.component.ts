import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employees';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  mostrarElemento: boolean = false; // Asegúrate de inicializar la variable
  // constructor
  constructor(public employeeService: EmployeeService) {
    //instancia, poder tener todos los metodos
  }

  // main
  ngOnInit(): void {
    // se ejecuta cada vez que se inicia la aplicacion
    this.getEmployees();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (res) => {
        this.employeeService.employees = res;
      },
      (err) => console.log(err)
    );
  }

  addEmployee(form: NgForm) {
    if (!form.valid) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }

    if (form.value.id_employee) {
      this.employeeService.updateEmployee(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.employeeService.addEmployer(form.value).subscribe(
        (res) => {
          this.getEmployees();
          form.reset();
        },
        (err) => console.log(err)
      );
    }
  }

  deleteEmployee(id: number | undefined) {
    if (id) {
      if (confirm('Are you sure to delete this employee?')) {
        this.employeeService.deleteEmployee(id).subscribe(
          (res) => {
            console.log(res, id);
            this.getEmployees(); // Actualizar la lista de empleados después de eliminar uno
          },
          (err) => console.log(err)
        );
      }
    } else {
      console.log('ID de empleado no válido');
    }
  }

  updateEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }
}
