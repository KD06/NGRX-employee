import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ApiService } from "../core/api.service";
import * as fromEmployeeActions from "./employee.action";

@Injectable()
export class EmployeeEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromEmployeeActions.getEmployee),
      mergeMap(() =>
        this.apiService.getEmployees().pipe(
          map((employeeData: any) => { 
            return fromEmployeeActions.storeEmployee({ employeeData: employeeData.data})}
            )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}