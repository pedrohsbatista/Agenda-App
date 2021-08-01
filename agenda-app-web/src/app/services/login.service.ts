import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from '../app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  login(dados : Object) : Observable<any> {
    return this.httpClient.post(App.apiUrl + "login", JSON.stringify(dados), this.httpOptions);
  }
}
