import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
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
