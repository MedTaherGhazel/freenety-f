import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private API_URL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
    http.get
  }

  logout: any;

  refreshToken() {
    throw new Error('Method not implemented.');
  }
  login(arg0: { username: any; password: any; }) {
    throw new Error('Method not implemented.');
  }

  getAllUsers() {
    return this.http.get(this.API_URL + '');
  }
}
