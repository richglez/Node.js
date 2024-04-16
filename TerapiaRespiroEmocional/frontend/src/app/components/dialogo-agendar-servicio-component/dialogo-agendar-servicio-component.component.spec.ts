import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAgendarServicioComponentComponent } from './dialogo-agendar-servicio-component.component';

describe('DialogoAgendarServicioComponentComponent', () => {
  let component: DialogoAgendarServicioComponentComponent;
  let fixture: ComponentFixture<DialogoAgendarServicioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoAgendarServicioComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoAgendarServicioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
