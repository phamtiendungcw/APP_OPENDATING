import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NavComponent} from "./nav/nav.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {MemberListComponent} from "./members/member-list/member-list.component";
import {MemberDetailComponent} from "./members/member-detail/member-detail.component";
import {ListsComponent} from "./lists/lists.component";
import {MessagesComponent} from "./messages/messages.component";
import {SharedModule} from "./_modules/shared.module";
import {TestErrorsComponent} from './errors/test-errors/test-errors.component';
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    MemberDetailComponent,
    MemberListComponent,
    MessagesComponent,
    NavComponent,
    RegisterComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
