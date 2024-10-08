import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home.component';
import { FormsModule } from '@angular/forms';


import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AngularSplitModule } from 'angular-split';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MarkdownComponent } from 'ngx-markdown';

import { EditorService } from '../shared/services/editor.service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ButtonModule,
    CardModule,
    AngularSplitModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    MarkdownComponent
  ],
  providers: [
    
  ],
})
export class HomeModule { }
