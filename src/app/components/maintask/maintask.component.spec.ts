import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintaskComponent } from './maintask.component';

describe('MaintaskComponent', () => {
  let component: MaintaskComponent;
  let fixture: ComponentFixture<MaintaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
