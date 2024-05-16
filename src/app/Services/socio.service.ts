import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Socio } from '../Models/Socio';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private apiUrl:string = `${appsettings.apiUrl}ViewPartner`;
  private headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjQwNTUxNTdhLWFmZDctNDBhZS04NmVhLTExMThiMDk2NmVhMiIsInN1YiI6InN5c0BjbGF2aXNjby5jb20iLCJlbWFpbCI6InN5c0BjbGF2aXNjby5jb20iLCJqdGkiOiI3MmQ4MTQ0ZC1mYTM4LTQzY2EtYmViMS1lNDBmYWRmMzYwNDAiLCJuYmYiOjE3MTU4Njc4NTAsImV4cCI6MTcxNTg3MzI1MCwiaWF0IjoxNzE1ODY3ODUwLCJpc3MiOiJodHRwczovL2NsYXZpc2NvLmNvbS8iLCJhdWQiOiJodHRwczovL2NsYXZpc2NvLmNvbS8ifQ.5Tbja_goz9JQnXIQ_iie-BGlaWUJtf_1O_wdIOSEyRyWaSdQ8dZRjAZBe3n4oKGuIke6lejWUA3U_TkbYGmeIw')

  constructor(private http: HttpClient) { }

  lista() {
    return this.http.get<Socio[]>(this.apiUrl, { headers: this.headers});
  }

  obtener(CardCode:string) {
    return this.http.get<Socio>(`${this.apiUrl}/${CardCode}`, { headers: this.headers });
  }

  editar(obj:Socio) {
    return this.http.patch<Socio>(this.apiUrl, obj, { headers: this.headers});
  } 
}