import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EditorModule } from './editor/editor.module';

import { MenubarModule } from 'primeng/menubar';
import { EditorService } from './shared/services/editor.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EditorModule,
    MenubarModule
  ],
  providers: [EditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
