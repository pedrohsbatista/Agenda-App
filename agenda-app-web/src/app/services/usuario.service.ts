import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from '../app';
import { GenericService } from './generic.service';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService  extends GenericService<Usuario>{
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(protected http: HttpClient) {
    super(http, App.apiUrl + "usuario/");
  }

  post(dados: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(App.apiUrl + "usuario/", JSON.stringify(dados), this.httpOptions);
  }
}