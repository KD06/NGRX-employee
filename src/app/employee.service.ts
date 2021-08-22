import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from "./core/models/employee.model";
import { ApiService } from "./core/api.service";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private apiService: ApiService) { }

  getEmployees(): Observable<Employee[]> {
    return this.apiService.getEmployees()
      .pipe(
        map(data => data.data)
      );
  }
}
