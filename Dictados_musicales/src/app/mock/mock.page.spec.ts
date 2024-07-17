import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPage } from './mock.page';

describe('MockPage', () => {
  let component: MockPage;
  let fixture: ComponentFixture<MockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
