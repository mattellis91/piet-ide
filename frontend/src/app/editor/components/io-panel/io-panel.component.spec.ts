import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoPanelComponent } from './io-panel.component';

describe('IoPanelComponent', () => {
  let component: IoPanelComponent;
  let fixture: ComponentFixture<IoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IoPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
