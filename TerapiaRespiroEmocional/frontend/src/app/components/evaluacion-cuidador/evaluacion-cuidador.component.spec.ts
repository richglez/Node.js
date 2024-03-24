import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionCuidadorComponent } from './evaluacion-cuidador.component';

describe('EvaluacionCuidadorComponent', () => {
  let component: EvaluacionCuidadorComponent;
  let fixture: ComponentFixture<EvaluacionCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionCuidadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
