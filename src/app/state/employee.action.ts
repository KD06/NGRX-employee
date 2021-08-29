import { createAction, props } from '@ngrx/store';
import { Employee } from '../core/models/employee.model';

export const getEmployee = createAction('[Employee] Get Employees');
export const getEmployeeError = createAction('[Employee] Get Employees Error');
export const storeEmployee = createAction('[Employee] Update Eployee', props<{employeeData: Employee[]}>());
export const updateEmployee = createAction('[Employee] Update Eployee', props<{id: number, employee: Employee}>());
export const removeEmployee = createAction('[Employee] Remove Employee', props<{id: number}>());
export const addEmployee = createAction('[Employee] Add Employee', props<{employee: Employee}>());