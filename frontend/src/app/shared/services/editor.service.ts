import { Injectable } from '@angular/core';

export interface CurrentFile {
  dirty: boolean
  data: Pixel[][]
  path:string
}

export interface Pixel {
  s: number
  r: number
  g: number
  b: number
}

@Injectable({
  providedIn: 'root'
})

export class EditorService {

  selectedColor:string = '#000';
  currentFile:CurrentFile | undefined;

  constructor() { }

  componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  rgbToHex(r:number, g:number, b:number) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }
}
