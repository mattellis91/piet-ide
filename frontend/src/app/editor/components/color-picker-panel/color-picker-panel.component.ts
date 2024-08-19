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
      console.log(this.debugState);
    })  
  }

  getDpDirectionClass(dpDir:{x:number, y:number}):string {
    if(dpDir.x === 1 && dpDir.y === 0) {
      return "pi-arrow-right"
    } if(dpDir.x === -1 && dpDir.y === 0) {
      return "pi-arrow-left"
    } if(dpDir.x === 0 && dpDir.y === 1) {
      return "pi-arrow-down"
    } if(dpDir.x === 0 && dpDir.y === -1) {
      return "pi-arrow-up"
    }
    return ""
  }

  getCCDirectionClass(dir:number): string {
    return dir === 0 ? "pi-arrow-left" : "pi-arrow-right";
  }

}
