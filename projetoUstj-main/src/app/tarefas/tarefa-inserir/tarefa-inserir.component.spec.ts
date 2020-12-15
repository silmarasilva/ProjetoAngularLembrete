import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaInserirComponent } from './tarefa-inserir.component';

describe('TarefaInserirComponent', () => {
  let component: TarefaInserirComponent;
  let fixture: ComponentFixture<TarefaInserirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaInserirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
