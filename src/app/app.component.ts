import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './core/models/employee.model';
import { EmployeeService } from './employee.service';
import { Store, select } from '@ngrx/store';
import { state } from './state/employee.reducer';
import { getEmployee, removeEmployee, updateEmployee } from "./state/employee.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'emp-app';
  // employees : Observable<Employee[]>;
  employees: any;
  employeeData: Employee[] = [];
  displayedColumns: string[] = ["id", "email", "first_name", "last_name", "avatar", "action"];

  constructor(private empService: EmployeeService, private store: Store<state>){
    this.store.select('employee').subscribe(
      (data: any) => this.employees = data.employee);
  }
  ngOnInit(){
    this.store.dispatch(getEmployee());
  }

  removeEmployee(id: number){
    this.store.dispatch(removeEmployee({id}))
  }

  editEmployee(id: number, employee: Employee){
    this.store.dispatch(updateEmployee({id, employee}))
  }
}
