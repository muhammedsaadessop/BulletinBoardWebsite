import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { GameDisplayComponent } from './game/game-display/game-display.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from './auth/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ErrorinterceptorInterceptor} from './error/errorinterceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    GameCreateComponent,
    GameDisplayComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
  
  {provide: HTTP_INTERCEPTORS,useClass: ErrorinterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
