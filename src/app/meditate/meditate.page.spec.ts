import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeditatePage } from './meditate.page';

describe('MeditatePage', () => {
  let component: MeditatePage;
  let fixture: ComponentFixture<MeditatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
