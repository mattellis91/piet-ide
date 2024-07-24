import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  selectedColor:string = '#000';
  constructor() { }
}
