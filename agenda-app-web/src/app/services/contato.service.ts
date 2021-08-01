import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from '../app';
import { Contato } from '../models/contato';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ContatoService extends GenericService<Contato> {

  constructor(protected http: HttpClient) {
    super(http, App.apiUrl + 'contato/');
  }
}
