import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagModalFieldComponent } from './tag-modal-field.component';

describe('TagModalFieldComponent', () => {
  let component: TagModalFieldComponent;
  let fixture: ComponentFixture<TagModalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagModalFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagModalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
