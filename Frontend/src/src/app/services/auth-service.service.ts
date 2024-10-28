import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './conf'; 

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${API_ENDPOINT}/register`, user);
  }

  // login(credentials: any): Observable<any> {
  //   console.log("Here")
  //   return this.http.post<any>(`${API_ENDPOINT}/login`, credentials);
  // }
   login(credentials: any){
    console.log("Here")
    this.http.post<any>(`${API_ENDPOINT}/login`, credentials).subscribe((res) =>{
      this.setToken(res.token)
    });
  }
  getAuthHeader():HttpHeaders{
    return new HttpHeaders({
      'Authorization': `${this.getToken()}`
    });
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
