import { createSelector } from '@ngrx/store';
import { state } from './employee.reducer';
 
export interface AppState {
  feature: state;
}
 
export const selectFeature = (state: AppState) => state.feature;
 
export const selectEmployeeData = createSelector(
  selectFeature,
  (state: state) => state.employee
);

export const selectEmployeeDataIsLoadSuccess = createSelector(
  selectFeature,
  (state: state) => state.isLoadSuccess
);