/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DshboardComponent } from './dshboard.component';

describe('DshboardComponent', () => {
  let component: DshboardComponent;
  let fixture: ComponentFixture<DshboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
