import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetRecent, SetCurrentFile, GetHelp, OpenImage } from '../../../../wailsjs/go/main/App';
import { EditorService } from '../../shared/services/editor.service';
import { Pixel } from "../../shared/services/editor.service"
import { EventsOn } from '../../../../wailsjs/runtime/runtime';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  color1 = '#1976D2';
  visible = false;
  newFileWidth = 16;
  newFileHeight = 16;
  recentFiles = [];
  recentFolders = [];
  help = "";

  constructor(private router: Router, private editorService:EditorService) {

  }

  async ngOnInit() {

    GetRecent().then((res) => {
      try {
        const aJSON = JSON.parse(res)
        this.recentFiles = aJSON.files
        this.recentFolders = aJSON.folders
        this.help = aJSON.help
      } catch(e) {
        console.log("failed to load recent files")
      }
    });

    GetHelp().then((res) => {
      this.help = res;
    })


  }

  showDialog() {
    this.visible = true;
  }

  cancelDialog() {
    this.visible = false;
  }

  submitDialog() {
    const data:Pixel[][] = [];

    for(let i = 0; i < this.newFileHeight; i++) {
      data[i] = [];
      for(let j = 0; j < this.newFileWidth; j++) {
        data[i].push({
          s: 0,
          r: 0,
          g: 0,
          b: 0,
        });
      }
    }

    this.editorService.currentFile = {
      dirty: false,
      path: "",
      Width: this.newFileWidth,
      Height: this.newFileHeight,
      data: data
    }

    this.router.navigateByUrl('/editor'); 
  }

  async openImage() {
    const uri = await OpenImage();
    //const f = this.dataURLtoFile(uri, "temp");
    const img = new Image()
    let data;
    img.src = uri;
    const can = document.createElement('canvas');
    const ctx = can.getContext('2d');
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const d = ctx?.getImageData(0,0, img.width, img.height);
      
      data = {
        width: img.width,
        height: img.height,
        pixels: this.getImagePixels(d!)
      }

      this.editorService.currentFile = {
        dirty: false,
        path: "",
        data: data.pixels,
        Width: data.width,
        Height: data.height
      }

      this.router.navigateByUrl('/editor'); 

    }
  }

  getImagePixels(data:ImageData): Pixel[][] {
    let row = 0;
    let col = 0;
    
    let pixels:Pixel[][] = [];

    for(let i = 0; i < data.height; i++) {
      pixels[i] = []
    }

    for(let i = 0; i < data.data.length; i+= 4) {

      let p = {
        r: data.data[i],
        g: data.data[i + 1],
        b: data.data[i + 2],
        s: data.data[i + 3]
      }

      if(col === data.width) {
        row++;
        col = 0;
      } 
      
      pixels[row][col] = p;

      col++;
      
    }

    return pixels;

  }
}
