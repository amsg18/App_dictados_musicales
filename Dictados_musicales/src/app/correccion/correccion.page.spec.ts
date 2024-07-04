import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorreccionPage } from './correccion.page';

describe('CorreccionPage', () => {
  let component: CorreccionPage;
  let fixture: ComponentFixture<CorreccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
