import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {  HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { IndexComponent } from './index/index.component';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';
import { GroupData } from "./shared/group-data";
import { MemberGroupComponent } from './group/member-group.component';
import {AuthGuard} from './auth.guard';
import  { TokenIntercepterService } from './services/token-intercepter.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    IndexComponent,
    GroupComponent,
    UserComponent,
    MemberGroupComponent
  ],
  imports: [
    BrowserModule,
    // InMemoryWebApiModule.forRoot(GroupData),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard , {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenIntercepterService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
