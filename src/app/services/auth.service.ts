import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable ,tap } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = `${environment.baseUrl}/api/auth`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    ) { }

  login(username: string, password: string): Observable<any> {
      return this.http.post(AUTH_API + '/sign-in', { username, password })
        .pipe(
          tap((response: { token: string; type: string; id: number; username: string; email: string; roles: string[]; }) => {
            this.tokenStorageService.saveToken(response.token);
            this.tokenStorageService.saveUser(response);
          })
        );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/sign-up', {username,email,password});
  }
}