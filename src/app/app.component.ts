import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './core/models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'emp-app';
  employees : Observable<Employee[]>;

  constructor(private empService: EmployeeService){
    this.employees = this.empService.getEmployees();
  }
  ngOnInit(){
  }
}
