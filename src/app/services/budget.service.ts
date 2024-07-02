import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Budget } from '../models/Budget';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Budget"
  constructor() { }

  get(){
    return this.http.get<ApiResponse<Budget[]>>(this.apiUrl);
  }
  getById(id:number){
    return this.http.get<ApiResponse<Budget>>(`${this.apiUrl}/${id}`);
  }

  add(objeto:Budget){
    return this.http.post<ApiResponse<Budget>>(this.apiUrl,objeto);
  }
  
  edit(objeto:Budget){
    return this.http.put<ApiResponse<Budget>>(this.apiUrl,objeto);
  }
  delete(id:number){
    return this.http.delete<ApiResponse<Budget>>(`${this.apiUrl}/${id}`);
  }
}
