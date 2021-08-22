import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(this.BASE_URL+"api/users?page=1")
  }
}
