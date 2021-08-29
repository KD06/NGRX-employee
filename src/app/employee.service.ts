import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employee } from "./core/models/employee.model";
import { ApiService } from "./core/api.service";
import { storeEmployee } from "./state/employee.action";
import { Store, select } from '@ngrx/store';
import { state } from './state/employee.reducer';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private apiService: ApiService, private store: Store<state>) { }

  getEmployees(): Observable<Employee[]> {
    return this.apiService.getEmployees()
      .pipe(
        tap((data: any) => this.store.dispatch(storeEmployee(data))),
        map(data => data.data)
      );
  }

}
