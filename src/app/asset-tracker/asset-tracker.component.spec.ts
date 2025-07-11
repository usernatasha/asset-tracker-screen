import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTrackerComponent } from './asset-tracker.component';

describe('AssetTrackerComponent', () => {
  let component: AssetTrackerComponent;
  let fixture: ComponentFixture<AssetTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
