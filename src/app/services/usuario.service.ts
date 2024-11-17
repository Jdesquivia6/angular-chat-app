import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/listAllUsuario`);
  }

  guardarUsuario(usuario: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/save`, usuario);
  }
}
