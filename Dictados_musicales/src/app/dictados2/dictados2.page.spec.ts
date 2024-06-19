import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dictados2Page } from './dictados2.page';

describe('Dictados2Page', () => {
  let component: Dictados2Page;
  let fixture: ComponentFixture<Dictados2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Dictados2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
