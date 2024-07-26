import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    
  items: MenuItem[] | undefined;

  constructor(private router: Router) {

  }

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                command: () => {
                    this.router.navigateByUrl('');
                }
            },
            {
                label: 'Features',
            },
            {
                label: 'Projects',
                items: [
                    {
                        label: 'Components',
                    },
                    {
                        label: 'Blocks',
                    },
                    {
                        label: 'UI Kit',
                    },
                    {
                        label: 'Templates',
                        items: [
                            {
                                label: 'Apollo',
                            },
                            {
                                label: 'Ultima',
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
            }
        ]
    }
}
