import { Component, OnInit } from '@angular/core';
import { EventsOn } from '../../../../wailsjs/runtime/runtime';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit{
  color1 = '#1976D2';
  output = ""

  ngOnInit(): void {
    EventsOn("charOut", (x) => {
      console.log("Char out")
      this.output += x;
    }) 

    EventsOn("numOut", (x) => {
      console.log("Num out")
      this.output += x;
    });
  }
}
