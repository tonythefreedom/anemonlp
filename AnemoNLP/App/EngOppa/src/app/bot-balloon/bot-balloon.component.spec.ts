import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotBalloonComponent } from './bot-balloon.component';

describe('BotBalloonComponent', () => {
  let component: BotBalloonComponent;
  let fixture: ComponentFixture<BotBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
