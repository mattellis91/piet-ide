import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { Interpreter } from '../../lib/piet/interpreter';



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
  pixelWidth = 0;
  pixelHeight = 0;
  canvasWidth = 0;
  canvasHeight = 0;
  ctx:CanvasRenderingContext2D | null = null;
  hoverPixel: PixelLocation = {x: -1, y: -1};
  dragging = false;
  canvasZoomDelta = 15;

  constructor(private editorService:EditorService) { }

  ngOnInit() {
    this.initGrid();
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;
    this.canvasWidth = 600;
    this.canvasHeight = 600;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    canvas.style.backgroundColor = 'lightgrey';
    canvas.style.cursor = 'pointer';
    this.pixelWidth = this.canvasWidth / this.pixelsWide;
    this.pixelHeight = this.canvasHeight / this.pixelsHigh;

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

    window.requestAnimationFrame(() => this.renderLoop());
  }

  initGrid() {
    for (let i = 0; i < this.pixelsWide; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < this.pixelsHigh; j++) {
        this.pixels[i][j] = '#fff';
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

    for(let i = 0; i < this.pixelsWide; i++) {
      for(let j = 0; j < this.pixelsHigh; j++) {
        if(i !== this.hoverPixel.x || j !== this.hoverPixel.y) {
          this.drawPixel({x: i, y: j});
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
      this.pixels[this.hoverPixel.x][this.hoverPixel.y] = this.editorService.selectedColor ?? '#000';
      this.drawPixel(this.hoverPixel);
    }
  }

  handleMouseDown(e:MouseEvent) {
    const r = this.canvas.nativeElement.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const pixelLocation = this.mouseToPixel(x, y);
    this.pixels[pixelLocation.x][pixelLocation.y] = this.editorService.selectedColor ?? '#000';
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
    this.ctx.fillStyle = color ?? this.pixels[pixelLocation.x][pixelLocation.y];
    this.ctx.fillRect(pixelLocation.x * this.pixelWidth, pixelLocation.y * this.pixelHeight, this.pixelWidth, this.pixelHeight);
  }

  mouseToPixel(mouseX:number, mouseY:number): PixelLocation {
    const x = Math.floor(mouseX / this.pixelWidth);
    const y = Math.floor(mouseY / this.pixelHeight);
    return {x, y};
  }

  handleRunInterpreter() {
    const interpreter = new Interpreter(this.pixels);
  }

}
