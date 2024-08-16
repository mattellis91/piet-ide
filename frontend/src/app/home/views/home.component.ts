import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetRecent, SetCurrentFile, GetHelp, OpenImage } from '../../../../wailsjs/go/main/App';
import { EditorService } from '../../shared/services/editor.service';
import { Pixel } from "../../shared/services/editor.service"


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
        console.log(aJSON)
      } catch(e) {
        console.log("failed to load recent files")
      }
    });

    GetHelp().then((res) => {
      this.help = res;
      console.log(this.help)
    })
  }

  showDialog() {
    this.visible = true;
  }

  cancelDialog() {
    this.visible = false;
  }

  submitDialog() {
    console.log(this.newFileWidth);
    console.log(this.newFileHeight);
    SetCurrentFile(Number(this.newFileWidth), Number(this.newFileHeight));
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
        data: data.pixels
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
        s: data.data[i],
        r: data.data[i + 1],
        g: data.data[i + 2],
        b: data.data[i + 3]
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
