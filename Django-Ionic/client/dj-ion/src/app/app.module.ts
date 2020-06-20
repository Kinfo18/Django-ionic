import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';


//Third party 
import { CookieService } from 'ngx-cookie-service';




import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



import { AuthComponent } from './auth/auth.component';
import { AuthAPIService } from './auth/auth.service';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { CarreraComponent } from './carrera/carrera.component';
import { CarreraAPIService } from './carrera/carrera.service';
import { CarreraDetailComponent } from './carrera-detail/carrera-detail.component';
import { CarreraCreateComponent } from './carrera-create/carrera-create.component';
import { CarreraUpdateComponent } from './carrera-update/carrera-update.component';

import { TokenInterceptor } from './auth/token.interceptor';
import { StatusActionComponent } from './carrera-action/carrera-action.component';

@NgModule({
  declarations: [
    AppComponent,
    CarreraComponent,
    CarreraDetailComponent,
    CarreraCreateComponent,
    AuthComponent,
    AuthLogoutComponent,
    CarreraUpdateComponent,
    CarreraActionComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthAPIService,
    CookieService,
    CarreraAPIService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
