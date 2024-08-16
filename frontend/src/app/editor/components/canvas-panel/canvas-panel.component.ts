import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CurrentFile, EditorService } from '../../../shared/services/editor.service';
import { Interpreter } from '../../lib/piet/interpreter';
import { GetCurrentFile, Greet, WriteImage } from '../../../../../wailsjs/go/main/App';



interface PixelLocation {x:number; y:number; }

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrl: './canvas-panel.component.scss'
})
 
export class CanvasPanelComponent  implements OnInit, AfterViewInit {

  @ViewChild('pietCanvas', { static: true }) canvas: any;

  pixelsWide = 16;
  pixelsHigh = 16;
  pixels:string[][] = [];
  showGrid = true; 
  pixelWidth = 20;
  pixelHeight = 0;
  canvasWidth = 0;
  canvasHeight = 0;
  ctx:CanvasRenderingContext2D | null = null;
  hoverPixel: PixelLocation = {x: -1, y: -1};
  dragging = false;
  canvasZoomDelta = 15;

  currentFile: CurrentFile | undefined = undefined;

  constructor(private editorService:EditorService) { }

  async ngOnInit() {
    this.currentFile = this.editorService.currentFile;

    this.pixelsWide = this.currentFile!.Width;
    this.pixelsHigh = this.currentFile!.Height;
    this.initGrid();
  }

  ngAfterViewInit() {
    
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;
    canvas.style.backgroundColor = 'lightgrey';
    canvas.style.cursor = 'pointer';
    this.canvasWidth = this.pixelWidth * this.pixelsWide;
    this.canvasHeight = this.pixelWidth * this.pixelsHigh;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    canvas.onmousemove = (e:MouseEvent) => {
      this.handleMouseMove(e);
    }

    canvas.onmousedown = (e:MouseEvent) => {
      this.handleMouseDown(e);
    }

    canvas.onmouseup = (e:MouseEvent) => {
      this.handleMouseUp(e)
    }

    canvas.onmouseleave = (e:MouseEvent) => {
      this.handleMouseLeave(e);
    }

    canvas.onwheel = (e:WheelEvent) => {
      e.preventDefault();
      if(e.deltaY < 0) {
        this.canvasHeight += this.canvasZoomDelta;
        this.canvasWidth += this.canvasZoomDelta;
      } else {
        this.canvasHeight -= this.canvasZoomDelta;
        this.canvasWidth -= this.canvasZoomDelta;
      }
      this.pixelWidth = this.canvasWidth / this.pixelsWide;
      this.pixelHeight = this.canvasHeight / this.pixelsHigh;

      this.canvas.nativeElement.width = this.canvasWidth;
      this.canvas.nativeElement.height = this.canvasHeight;
      this.ctx!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    this.pixelWidth = this.canvasWidth / this.pixelsWide;
    this.pixelHeight = this.canvasHeight / this.pixelsHigh;

    this.canvas.nativeElement.width = this.canvasWidth;
    this.canvas.nativeElement.height = this.canvasHeight;
    this.ctx!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    window.requestAnimationFrame(() => this.renderLoop());
  }

  initGrid() {
    for (let i = 0; i < this.pixelsHigh; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < this.pixelsWide; j++) {
        const currentPix = this.currentFile?.data[i][j]
        this.pixels[i][j] = currentPix ? this.editorService.rgbToHex(currentPix.r, currentPix.g, currentPix.b).toLowerCase() : '#fff';
      }
    }

  }

  renderLoop() {
    this.render();
    window.requestAnimationFrame(() => this.renderLoop());
  }

  render() {
    this.ctx!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if(this.hoverPixel.x >= 0 && this.hoverPixel.y >= 0) {
      this.drawPixel(this.hoverPixel, this.editorService.selectedColor);
    }

    for(let i = 0; i < this.pixelsHigh; i++) {
      for(let j = 0; j < this.pixelsWide; j++) {
        if(j !== this.hoverPixel.x || i !== this.hoverPixel.y) {
          this.drawPixel({x: j, y: i});
        }
      }
    }

    if(this.drawGrid) {
      this.drawGrid();
    }
  }

  drawGrid() {
    if (!this.ctx) { return; }
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 1;
    for(let i = 0; i < this.pixelsWide; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.pixelWidth, 0);
      this.ctx.lineTo(i * this.pixelWidth, this.canvasHeight);
      this.ctx.stroke();
    }
    for(let i = 0; i < this.pixelsHigh; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.pixelHeight);
      this.ctx.lineTo(this.canvasWidth, i * this.pixelHeight);
      this.ctx.stroke();
    }
  }

  handleMouseMove(e:MouseEvent) {
    const r = this.canvas.nativeElement.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    this.hoverPixel = this.mouseToPixel(x, y);
    if(this.dragging) {
      this.pixels[this.hoverPixel.y][this.hoverPixel.x] = this.editorService.selectedColor ?? '#000';
      this.drawPixel(this.hoverPixel);
    }
  }

  handleMouseDown(e:MouseEvent) {
    const r = this.canvas.nativeElement.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const pixelLocation = this.mouseToPixel(x, y);
    this.pixels[pixelLocation.y][pixelLocation.x] = this.editorService.selectedColor ?? '#000';
    this.drawPixel(pixelLocation);
    this.dragging = true;
  }

  handleMouseUp(e:MouseEvent) {
    this.dragging = false;
  }

  handleMouseLeave(e:MouseEvent) {
    this.hoverPixel = {x: -1, y: -1};
  }

  drawPixel(pixelLocation:PixelLocation, color?:string) {
    if (!this.ctx) { return; }
    this.ctx.fillStyle = color ?? this.pixels[pixelLocation.y][pixelLocation.x];
    this.ctx.fillRect(pixelLocation.x * this.pixelWidth, pixelLocation.y * this.pixelHeight, this.pixelWidth, this.pixelHeight);
  }

  mouseToPixel(mouseX:number, mouseY:number): PixelLocation {
    const x = Math.floor(mouseX / this.pixelWidth);
    const y = Math.floor(mouseY / this.pixelHeight);
    return {x, y};
  }

  handleRunInterpreter() {
    console.log("HANDLE INTERPRETER")
    console.log(this.pixels);
    const imageCanvas = document.createElement('canvas');
    const imageCanvasCtx = imageCanvas.getContext('2d');
    imageCanvas.width = this.pixelsWide;
    imageCanvas.height = this.pixelsHigh;
    if(!imageCanvasCtx) {
      return;
    }
    for(let i = 0; i < imageCanvas.height; i++) {
      for(let j = 0; j < imageCanvas.width; j++) {
        imageCanvasCtx.fillStyle = this.pixels[i][j];
        imageCanvasCtx?.fillRect(j, i, 1, 1);
      }
    }
    const url = imageCanvas.toDataURL();
    console.log(url);
    WriteImage(url);

    // console.log(Greet('test'))
    // const interpreter = new Interpreter(this.pixels);
  }

}
