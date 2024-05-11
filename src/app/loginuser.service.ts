import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './admin';
import {Md5} from 'ts-md5';


@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl="http://localhost:8080/user/login"
  constructor(private httpClient: HttpClient) { }
  user: Admin = new Admin();

  loginUser(admin: Admin):Observable<object>{
    this.user.userId=admin.userId;
    this.user.password=Md5.hashStr(admin.password);
    return this.httpClient.post(`${this.baseUrl}`,this.user);
  }
}
