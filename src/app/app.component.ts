import { Component } from '@angular/core';
import { AssetTrackerComponent } from './asset-tracker/asset-tracker.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [AssetTrackerComponent],
})
export class AppComponent {
  constructor() {}
}
