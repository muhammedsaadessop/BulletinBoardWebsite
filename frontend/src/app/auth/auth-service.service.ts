import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token!: string | null;
  
  constructor(private http: HttpClient, private router: Router) { } 
  signup(userusername:string,departments:string,roles:string,userpassword: string) {
    this.http.post('https://localhost:3000/api/users/signup',{username:userusername,department:departments,role:roles,password:userpassword})
 .subscribe(response =>{
  alert('You have successfully signed up!');
 });
 
  }
  login(userusername:string,userpassword: string) {
    this.http.post<{token:string}>('https://localhost:3000/api/users/login',{username:userusername,password:userpassword})
    .subscribe(response =>{
      const token = response.token;
      this.token = token;
   
      localStorage.setItem('token', token);
      alert('You have successfully logged in!');
      this.router.navigate(['/display']); 
    });
  }
  
  getToken() {
    
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    this.token = null;
    alert('You have successfully logged Out!');
    this.router.navigate(['/login']); 
  }
  
}
