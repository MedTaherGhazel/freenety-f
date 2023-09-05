import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:3000/api';
  private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  register(user: {username: string, email: string, password: string}): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, user, { headers: this.httpHeaders });
  }

  login(user: {username: string, password: string}): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, user, { headers: this.httpHeaders });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users`, { headers: this.httpHeaders });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users/${id}`, { headers: this.httpHeaders });
  }

  updateUser(id: string, user: {username: string, email: string, password: string}): Observable<any> {
    return this.http.put(`${this.BASE_URL}/users/${id}`, user, { headers: this.httpHeaders });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/users/${id}`, { headers: this.httpHeaders });
  }
}
