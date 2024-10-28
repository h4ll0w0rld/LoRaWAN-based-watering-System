import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './conf';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  humidity: number = 0;

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  setHumidity() {

    this.getHumidity().subscribe(
      (res: any) => {
        this.humidity = res[res.length - 1].humidity;
      },
      (error: any) => {
        console.error('Error occurred:', error);
      }
    );
  }

  getHumidity(): Observable<any> {
    return this.http.get(`${API_ENDPOINT}/humidity`, { headers: this.authService.getAuthHeader() })
  }

  addProject() {
    return this.http.post(`${API_ENDPOINT}/addProject`, { headers: this.authService.getAuthHeader() })
  }

  createTodo(headline: string, description: string, isDone: boolean): Observable<any> {
    const headers = this.authService.getAuthHeader();

    const body = { headline, description, isDone };
    return this.http.post<any>(`${API_ENDPOINT}/todos`, body, { headers });
  }

  getTodos() {

    const headers = this.authService.getAuthHeader();
    return this.http.get(`${API_ENDPOINT}/todos`, { headers })
  }
  delTodos(_id:number){
    const headers = this.authService.getAuthHeader();
    return this.http.post(`${API_ENDPOINT}/todos/delete`, {id:_id},{headers})
  }

}
