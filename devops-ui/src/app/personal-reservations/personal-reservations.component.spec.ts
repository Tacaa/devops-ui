import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalReservationsComponent } from './personal-reservations.component';

describe('PersonalReservationsComponent', () => {
  let component: PersonalReservationsComponent;
  let fixture: ComponentFixture<PersonalReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
