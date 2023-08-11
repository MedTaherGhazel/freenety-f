import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
    logout: any;
    refreshToken() {
      throw new Error('Method not implemented.');
    }
    login(arg0: { username: any; password: any; }) {
      throw new Error('Method not implemented.');
    }
    constructor(private http: HttpClient) {}
}
