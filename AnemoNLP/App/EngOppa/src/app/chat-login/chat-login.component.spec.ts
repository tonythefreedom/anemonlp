import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLoginComponent } from './chat-login.component';

describe('ChatLoginComponent', () => {
  let component: ChatLoginComponent;
  let fixture: ComponentFixture<ChatLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
