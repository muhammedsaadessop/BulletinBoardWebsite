import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error has occurred';
        if (error.status === 429) {
          errorMessage = 'Too many login attempts. Please try again later.';
        } else if (error.error && error.error.message) {
          if (error.error.message === 'Invalid token') {
            errorMessage = 'Unauthorised user, please login';
          } else if (error.status === 401) {
            errorMessage = 'Login details not found. Please check your username and password.';
          } else if (error.error.message === 'No Tasks Found') {
            errorMessage = 'No Tasks Found. There are no tasks in the database.';
          } else {
            errorMessage = error.error.message;
          }
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
        return throwError(error);
      })
    );
  }
}  
  
