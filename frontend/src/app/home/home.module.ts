import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home.component';


import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AngularSplitModule } from 'angular-split';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    CardModule,
    AngularSplitModule
  ],
  providers: [
  ],
})
export class HomeModule { }
