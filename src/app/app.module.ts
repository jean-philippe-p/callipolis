import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ServicesComponent } from './services/services.component';
import { ServiceService } from './service.service';
import { ContactService } from './contact.service';
import { IntroduceService } from './introduce.service';
import { ServiceComponent } from './service/service.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { ContactComponent } from './contact/contact.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SocialComponent } from './social/social.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    ServiceComponent,
    SubServiceComponent,
    IntroduceComponent,
    ContactComponent,
    NavBarComponent,
    SocialComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ServiceService, ContactService, IntroduceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
