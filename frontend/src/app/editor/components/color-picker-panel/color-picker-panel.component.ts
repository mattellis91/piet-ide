import { Component, OnInit } from '@angular/core';
import { EventsOn } from '../../../../../wailsjs/runtime/runtime';

@Component({
  selector: 'app-color-picker-panel',
  templateUrl: './color-picker-panel.component.html',
  styleUrl: './color-picker-panel.component.scss'
})
export class ColorPickerPanelComponent implements OnInit {
  debugState: any

  ngOnInit(): void {
    EventsOn("debugStep", (data) => {
      this.debugState = data;
    })  
  }

  getDpDirectionClass(dpDir:{X:number, Y:number}):string {
    if(dpDir.X === 1 && dpDir.Y === 0) {
      return "pi-arrow-right"
    } if(dpDir.X === -1 && dpDir.Y === 0) {
      return "pi-arrow-left"
    } if(dpDir.X === 0 && dpDir.Y === 1) {
      return "pi-arrow-down"
    } if(dpDir.X === 0 && dpDir.Y === -1) {
      return "pi-arrow-up"
    }
    return ""
  }

  getCCDirectionClass(dir:number): string {
    return dir === 0 ? "pi-arrow-left" : "pi-arrow-right";
  }

}
