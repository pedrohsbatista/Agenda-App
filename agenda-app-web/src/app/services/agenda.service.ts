import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from '../app';
import { Agenda } from '../models/agenda';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService extends GenericService<Agenda> {

  constructor(protected http: HttpClient) { 
    super(http, App.apiUrl + 'agenda/');
  }
}
