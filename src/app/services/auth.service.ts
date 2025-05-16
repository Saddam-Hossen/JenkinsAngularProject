import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Import the environment file
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private apiUrl = environment.baseUrl;  // Dynamically use the apiUrl from environment

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/api/student/login`; // Use backticks for template literal
    return this.http.post(loginUrl, { username, password });
  }
}