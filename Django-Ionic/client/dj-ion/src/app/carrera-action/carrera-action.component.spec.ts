import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraActionComponent } from './carrera-action.component';

describe('CarreraActionComponent', () => {
  let component: CarreraActionComponent;
  let fixture: ComponentFixture<CarreraActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreraActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreraActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
