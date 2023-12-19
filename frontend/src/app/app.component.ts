import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello momo';
  constructor(private authService: AuthServiceService) { }
  logout() {
    this.authService.logout();
  }
}



