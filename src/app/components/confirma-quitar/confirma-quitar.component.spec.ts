import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaQuitarComponent } from './confirma-quitar.component';

xdescribe('ConfirmaQuitarComponent', () => {
  let component: ConfirmaQuitarComponent;
  let fixture: ComponentFixture<ConfirmaQuitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaQuitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaQuitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
