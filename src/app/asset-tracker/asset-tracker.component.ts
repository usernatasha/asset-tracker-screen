import { Component } from '@angular/core';
import { AssetFormComponent } from '../asset-form/asset-form.component';
import { AssetItem } from '../models/model';
import { SharedModule } from '../modules/shared.module';

@Component({
  selector: 'app-asset-tracker',
  imports: [AssetFormComponent, SharedModule],
  templateUrl: './asset-tracker.component.html',
  styleUrl: './asset-tracker.component.scss'
})
export class AssetTrackerComponent {
  public showForm = false;
  public displayItems: AssetItem[] = [];
  public combinedDisplayItems: AssetItem[] = [];

  public toggleForm(show: boolean): void {
    this.showForm = show;
  }

  public handleSave(items: AssetItem[]): void {
    if(!this.displayItems) {
      this.displayItems =  items;
    } else {
      this.displayItems = [...this.displayItems, ...items];
    }
    this.combinedDisplayItems = this.combineItems(this.displayItems);
    this.toggleForm(false);   
  }

  public deleteItem(index: number): void {
    const typeToDelete = this.combinedDisplayItems[index].type;
    this.displayItems = this.displayItems.filter(item => item.type !== typeToDelete);
    this.combinedDisplayItems = this.combineItems(this.displayItems);
  }

  public getTotal(): number {
    const total = this.displayItems.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
    return Math.round(total * 100) / 100;
  }

  private combineItems(items: AssetItem[]): AssetItem[] {
    const grouped: { [key: string]: number } = {};
    for (const item of items) {
      grouped[item.type] = (grouped[item.type] || 0) + item.value;
    }
    return Object.keys(grouped).map(type => ({
      type,
      value: grouped[type]
    }));
  }
}
