import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SetCurrentFile } from '../../../../wailsjs/go/main/App';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  color1 = '#1976D2';
  visible = false;
  newFileWidth = 16;
  newFileHeight = 16;

  constructor(private router: Router) {

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


}
