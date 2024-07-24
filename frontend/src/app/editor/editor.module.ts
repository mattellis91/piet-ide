import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';

import { EditorService } from './services/editor.service';

import { EditorComponent } from './views/editor.component';

import { PaletePanelComponent } from './components/palete-panel/palete-panel.component';
import { ColorPickerPanelComponent } from './components/color-picker-panel/color-picker-panel.component';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { IoPanelComponent } from './components/io-panel/io-panel.component';


import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SplitterModule } from 'primeng/splitter';
import { AngularSplitModule } from 'angular-split';


@NgModule({
  declarations: [
    EditorComponent,
    PaletePanelComponent,
    ColorPickerPanelComponent,
    CanvasPanelComponent,
    IoPanelComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ButtonModule,
    TabViewModule,
    ColorPickerModule,
    SplitterModule,
    AngularSplitModule,
  ],
  providers: [
    EditorService
  ],
})
export class EditorModule { }
