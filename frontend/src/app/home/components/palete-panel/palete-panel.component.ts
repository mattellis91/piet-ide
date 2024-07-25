import { Component } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { Interpreter } from '../../lib/piet/interpreter';


export interface Color { hex: string, description: string, action: string | undefined }
@Component({
  selector: 'app-palete-panel',
  templateUrl: './palete-panel.component.html',
  styleUrl: './palete-panel.component.scss'
})

export class PaletePanelComponent {
  selectedColor:string | undefined;
  commands:Color[]= [
    {
      description: 'Light Red',
      hex: '#FFC0C0',
      action: undefined
    },
    {
      description: 'Red',
      hex: '#FF0000',
      action: 'push'
    },
    {
      description: 'Dark Red',
      hex: '#C00000',
      action: 'pop'
    },
    {
      description: 'Light Yellow',
      hex: '#FFFFC0',
      action: 'add'
    },
    {
      description: 'Yellow',
      hex: '#FFFF00',
      action: 'sub'
    },
    {
      description: 'Dark Yellow',
      hex: '#C0C000',
      action: 'multi'
    },
    {
      description: 'Light Green',
      hex: '#C0FFC0',
      action: 'div'
    },
    {
      description: 'Green',
      hex: '#00FF00',
      action: 'mod'
    },
    {
      description: 'Dark Green',
      hex: '#00C000',
      action: 'not'
    },
    {
      description: 'Light Cyan',
      hex: '#C0FFFF',
      action: 'gt'
    },
    {
      description: 'Cyan',
      hex: '#00FFFF',
      action: 'point'
    },
    {
      description: 'Dark Cyan',
      hex: '#00C0C0',
      action: 'switch'
    },
    {
      description: 'Light Blue',
      hex: '#C0C0FF',
      action: 'dup'
    },
    {
      description: 'Blue',
      hex: '#0000FF',
      action: 'roll'	
    },
    {
      description: 'Dark Blue',
      hex: '#0000C0',
      action: 'in(n)'
    },
    {
      description: 'Light Magenta',
      hex: '#FFC0FF',
      action: 'in(c)',
    },
    {
      description: 'Magenta',
      hex: '#FF00FF',
      action: 'out(n)'
    },
    {
      description: 'Dark Magenta',
      hex: '#C000C0',
      action: 'out(c)'
    },
    {
      description: 'White',
      hex: '#FFFFFF',
      action: undefined
    },
    {
      description: 'Black',
      hex: '#000000',
      action: undefined
    }
  ] 

  constructor(private editorService: EditorService) { }

  setCommandColor(command:Color) {
    console.log(command);
    this.editorService.selectedColor = command.hex;
    this.selectedColor = command.hex;

    Interpreter.setPalletCommands(this.selectedColor.toLowerCase(), this.commands) 
  }

  ngOnInit() {
    this.selectedColor = this.editorService.selectedColor;
  }
}
