import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Socio } from '../Models/Socio';
import { Observable } from 'rxjs';
import { Direccion } from '../Models/Direccion';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private apiUrl:string = `${appsettings.apiUrl}ViewPartner`;
  private headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImZlNGE3NGI0LTIwZDgtNDM5Yy04NmQ0LWQ4MDVjMTBkYWExNyIsInN1YiI6InN5c0BjbGF2aXNjby5jb20iLCJlbWFpbCI6InN5c0BjbGF2aXNjby5jb20iLCJqdGkiOiJlZTVjMjk2MC0wMjQzLTQ1MTItOTBjMy0wM2ZmNmNlNjlmMmUiLCJuYmYiOjE3MTY0MTEzNjAsImV4cCI6MTcxNjQxNjc2MCwiaWF0IjoxNzE2NDExMzYwLCJpc3MiOiJodHRwczovL2NsYXZpc2NvLmNvbS8iLCJhdWQiOiJodHRwczovL2NsYXZpc2NvLmNvbS8ifQ.Sr4mMjKTkFNRgx1HLrgTp9-Gui9s163dmdKmVQ5TnP0AgaDI3EkIAm8iWDZVZDdHqSCCo-ojWHP2wJrZImB9VQ')

  constructor(private http: HttpClient) { }

  lista(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.apiUrl, { headers: this.headers});
  }

  buscarPorCardCode(cardCode: string): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.apiUrl}?CardCode=${cardCode}`, { headers: this.headers});
  }

  obtener(CardCode:string): Observable<Socio> {
    return this.http.get<Socio>(`${this.apiUrl}/${CardCode}`, { headers: this.headers });
  }

  editar(obj:Socio): Observable<Socio> {
    return this.http.patch<Socio>(this.apiUrl, obj, { headers: this.headers});
  }

  obtenerDirecciones(CardCode: string): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.apiUrl}/${CardCode}/addresses`, { headers: this.headers});
  }

  obtenerDireccion( CardCode: string, Id: number): Observable<Direccion>{
    return this.http.get<Direccion>(`${this.apiUrl}/${CardCode}/addresses/${Id}`, { headers: this.headers });
  }

  editarDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.patch<Direccion>(`${this.apiUrl}/${direccion.CardCode}/addresses/${direccion.Id}`, direccion, { headers: this.headers });
  }
}