import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DictadoPage } from './dictado.page';

describe('DictadoPage', () => {
  let component: DictadoPage;
  let fixture: ComponentFixture<DictadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DictadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
