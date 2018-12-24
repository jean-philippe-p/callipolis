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
import { GenericService } from './generic.service';
import { ServiceComponent } from './service/service.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { ContactComponent } from './contact/contact.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SocialComponent } from './social/social.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { ResponseModalComponent } from './response-modal/response-modal.component';
import { ImportantComponent } from './important/important.component';
import { BlogComponent } from './blog/blog.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { ContactFixedFormComponent } from './contact-fixed-form/contact-fixed-form.component';
import { CarouselArticleComponent } from './carousel-article/carousel-article.component';


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
    ContactFormComponent,
    SafeHtmlPipe,
    MessageModalComponent,
    ResponseModalComponent,
    ImportantComponent,
    BlogComponent,
    BlogArticleComponent,
    ContactFixedFormComponent,
    CarouselArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ServiceService, ContactService, IntroduceService, GenericService],
  bootstrap: [AppComponent]
})
export class AppModule { }
