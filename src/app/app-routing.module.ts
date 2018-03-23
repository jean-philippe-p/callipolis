import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './service/service.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/services', pathMatch: 'full' },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:id', component: ServiceComponent },
  { path: 'services/:id/sub-services/:sub-id', component: ServiceComponent },
  { path: 'introduce', component: IntroduceComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
