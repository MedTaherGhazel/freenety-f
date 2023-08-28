import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "http://localhost:3000/api";
  private BASE_URL = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  getRoot(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/`);
  }

  public get(): Observable<any>{
    return this.httpClient.get(this.SERVER_URL);
  }

  public post(data: any): Observable<any>{
    return this.httpClient.post(this.SERVER_URL, data);
  }

  public put(data: any): Observable<any>{
    return this.httpClient.put(this.SERVER_URL, data);
  }

  public delete(id: any): Observable<any>{
    return this.httpClient.delete(this.SERVER_URL + '/' + id);
  }
}
