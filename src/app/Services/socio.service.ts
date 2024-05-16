import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Socio } from '../Models/Socio';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private apiUrl:string = `${appsettings.apiUrl}ViewPartner`;
  private headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjY3YWYwY2QwLTdmOWUtNGQ1NS1iZTBjLTFkZDBlOGU2NGYzNCIsInN1YiI6InN5c0BjbGF2aXNjby5jb20iLCJlbWFpbCI6InN5c0BjbGF2aXNjby5jb20iLCJqdGkiOiIyNDQ3MTY5NS02YWQ4LTRhNGUtYmMxMC1jODI4ZjM1YTkyNWQiLCJuYmYiOjE3MTU4Nzg1NzYsImV4cCI6MTcxNTg4Mzk3NiwiaWF0IjoxNzE1ODc4NTc2LCJpc3MiOiJodHRwczovL2NsYXZpc2NvLmNvbS8iLCJhdWQiOiJodHRwczovL2NsYXZpc2NvLmNvbS8ifQ.q5G5IjSiY7No-DYBoTDJ2IQmm7jquwenIFvb7d2IKUObTfeEZjZGd1oWZNZKRHfl4snIKZ81o1cYmqnMEonxIg')

  constructor(private http: HttpClient) { }

  lista() {
    return this.http.get<Socio[]>(this.apiUrl, { headers: this.headers});
  }

  buscarPorCardCode(cardCode: string) {
    return this.http.get<Socio[]>(`${this.apiUrl}?CardCode=${cardCode}`, { headers: this.headers});
  }

  obtener(CardCode:string) {
    return this.http.get<Socio>(`${this.apiUrl}/${CardCode}`, { headers: this.headers });
  }

  editar(obj:Socio) {
    return this.http.patch<Socio>(this.apiUrl, obj, { headers: this.headers});
  } 
}