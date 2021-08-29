import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Employee } from '../core/models/employee.model';
import * as EmployeeActions from '../state/employee.action';

export interface state{
    employee: Employee[],
    isLoadSuccess: boolean,
    isLoadError: boolean
}
export const initialState: state = {
    employee:[{ "id": 0,
    "email": '',
    "first_name": '',
    "last_name": '',
    "avatar": ''}],
    isLoadSuccess: false,
    isLoadError: false
};

const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.storeEmployee, (state, { employeeData }) => {
        return {
            ...state,
            employee: employeeData,
            isLoadSuccess: true,
            isLoadError: false
        }
    }),
    on(EmployeeActions.addEmployee, (state, { employee }) => {
        employee.id = 1; // Get Unique Values
        return {
            ...state,
            recipes: [...state.employee, employee]
        }
    }),
    on(EmployeeActions.updateEmployee, (state, { id, employee }) => {
        const employeeIndex = state.employee.findIndex(emp => emp.id == id)
        const updatedEmployee = {
            ...state.employee[employeeIndex],
            ...employee
        };
        const updatedEmployeeData = [...state.employee];
        updatedEmployeeData[employeeIndex] = updatedEmployee;
        return {
            ...state,
            employee: updatedEmployeeData
        };
    }),
    on(EmployeeActions.removeEmployee, (state, { id }) => {
        return {
            ...state,
            employee: state.employee.filter(emp => emp.id != id)
        }
    }),
    on(EmployeeActions.getEmployeeError, state => ({...state, isLoadError: true}))
);

export function reducer(state: state | undefined, action: Action) {
    return employeeReducer(state, action);
}