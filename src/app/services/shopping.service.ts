import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
    private apiUrl = 'http://localhost:3000/shopping-list';
  
    constructor(private http: HttpClient) {}
  
    getTasks(): Observable<any> {
      return this.http.get(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }
  
    addTask(task: { taskName: string, isCompleted: boolean, isEditable: boolean }): Observable<any> {
      return this.http.post(this.apiUrl, task).pipe(
        catchError(this.handleError)
      );
    }
  
    updateTask(id: number, task: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, task).pipe(
        catchError(this.handleError)
      );
    }
  
     deleteTask(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
  
    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Ocorreu um erro desconhecido!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        errorMessage = `Erro ${error.status}: ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    }
  }
  