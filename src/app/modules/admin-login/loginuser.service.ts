import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../../models/admin';
import { sha256 } from 'js-sha256';


@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl="http://localhost:8080/user/login"
  constructor(private httpClient: HttpClient) { }
  user: Admin = new Admin();

  loginUser(admin: Admin):Observable<object>{
    this.user.userId=admin.userId;
    this.user.password=sha256.hex(admin.password);
    return this.httpClient.post(`${this.baseUrl}`,this.user);
  }
}
