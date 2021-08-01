import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  constructor(private httpClient: HttpClient, private apiUrl: string) { }

  post(dados: T) : Observable<T>{
    return this.httpClient.post<T>(this.apiUrl, JSON.stringify(dados), this.getHttpOptions());
  }

  get(filter: string = "") : Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiUrl + "all/" + filter, this.getHttpOptions());
  }

  getById(id: string) : Observable<T>{
    return this.httpClient.get<T>(this.apiUrl + id, this.getHttpOptions());
  }

  put(dados: T) : Observable<T> {
    return this.httpClient.put<T>(this.apiUrl, JSON.stringify(dados), this.getHttpOptions());
  }
  
  delete(id: string) {
    return this.httpClient.delete<T>(this.apiUrl + id, this.getHttpOptions());
  }

  private getHttpOptions(){
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
                                'Authorization': window.localStorage.getItem('token')})
    }
  }
}
