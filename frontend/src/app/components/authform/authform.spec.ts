import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authform } from './authform';

describe('Authform', () => {
  let component: Authform;
  let fixture: ComponentFixture<Authform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authform],
    }).compileComponents();

    fixture = TestBed.createComponent(Authform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
