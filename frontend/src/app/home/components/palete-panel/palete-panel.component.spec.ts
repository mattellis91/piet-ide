import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletePanelComponent } from './palete-panel.component';

describe('PaletePanelComponent', () => {
  let component: PaletePanelComponent;
  let fixture: ComponentFixture<PaletePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaletePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
