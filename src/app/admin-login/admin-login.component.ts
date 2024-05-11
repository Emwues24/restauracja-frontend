import { Component } from '@angular/core';
import { Admin } from '../admin';
import { FormsModule } from '@angular/forms';
import { LoginuserService } from '../loginuser.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
admin:Admin = new Admin();

constructor(private loginuserservice: LoginuserService,private router: Router){}

adminLogin(){
 this.loginuserservice.loginUser(this.admin).subscribe({
  next: (data) => {
    alert("Logged in Succesfully")
    this.router.navigate(['/dashboard/orders'])
    localStorage.setItem('token',"CB1AAB63D1958806BCDAD878918AA778")
  },  
  error: (error) =>
    alert("Please enter correct login data")
  })
}
}

