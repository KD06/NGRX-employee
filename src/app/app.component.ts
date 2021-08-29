import { Component, OnInit } from '@angular/core';
import { Employee } from './core/models/employee.model';
import { EmployeeService } from './employee.service';
import { Store } from '@ngrx/store';
import { state } from './state/employee.reducer';
import { getEmployee, removeEmployee, updateEmployee, addEmployee, isEmployeeInEditMode } from "./state/employee.action";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'emp-app';
  employees: any;
  isInEditMode: boolean = false;
  employeeData: Employee[] = [];
  selectedEmployeeId: string = '';
  displayedColumns: string[] = ["id", "email", "first_name", "last_name", "avatar", "action"];
  employeeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
  });

  constructor(private empService: EmployeeService, private store: Store<state>){
    this.store.select('employee').subscribe(
      (data: any) => {
        this.employees = data.employee;
        this.isInEditMode = data.isEmployeeInEditMode;
      });
  }
  ngOnInit(){
    this.store.dispatch(getEmployee());
  }

  removeEmployee(id: string){
    this.store.dispatch(removeEmployee({id}));
  }

  editEmployee(id: string, employee: Employee){
      this.employeeForm.patchValue({
        ...employee
      });
      this.selectedEmployeeId = id;
      this.store.dispatch(isEmployeeInEditMode({inEditMode: true}));
  }

  onSubmit() {
    const employee: Employee = {...this.employeeForm.value};
    if(this.isInEditMode){
      this.store.dispatch(updateEmployee({id: this.selectedEmployeeId , employee}));
      this.store.dispatch(isEmployeeInEditMode({inEditMode: false}));
    } else {
      this.store.dispatch(addEmployee({employee}))
    }
    this.employeeForm.reset();
  }
}
