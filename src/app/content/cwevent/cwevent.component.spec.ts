import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CweventComponent } from './cwevent.component';

describe('CweventComponent', () => {
  let component: CweventComponent;
  let fixture: ComponentFixture<CweventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CweventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CweventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
