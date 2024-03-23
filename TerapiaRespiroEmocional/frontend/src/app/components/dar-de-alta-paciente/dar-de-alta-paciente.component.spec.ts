import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarDeAltaPacienteComponent } from './dar-de-alta-paciente.component';

describe('DarDeAltaPacienteComponent', () => {
  let component: DarDeAltaPacienteComponent;
  let fixture: ComponentFixture<DarDeAltaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarDeAltaPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DarDeAltaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
