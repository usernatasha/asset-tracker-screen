import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { AssetItem } from '../models/model';
import { SharedModule } from '../modules/shared.module';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-asset-form',
  imports: [SharedModule],
  templateUrl: './asset-form.component.html',
  styleUrl: './asset-form.component.scss'
})
export class AssetFormComponent {
  public assetForm: FormGroup;
  public assetTypes = ['Gift', 'RRSP', 'Savings', 'Others'];
  public initialItem = [{ type: '', value: null }];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AssetItem[]>();
  @ViewChildren('typeInput, valueInput') inputElements!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder) {
    this.assetForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
  }

  get items(): FormArray {
    return this.assetForm.get('items') as FormArray;
  }

  get hasChanges(): boolean {
    return !isEqual(this.initialItem, this.items.value);
  }

  public addItem(): void {
    this.items.push(this.createItem());
  }

  public deleteItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    } else {
      this.items.at(0).reset({ type: '', value: null });
    }
  }

  public onClose(): void {
    this.close.emit();
  }

  public  formatValueOnBlur(index: number): void {
    const control = this.assetForm.get('items')?.get(index.toString())?.get('value');
    if (!control) return;

    const val = control.value;

    if (val === null || val === '' || isNaN(Number(val))) return;

    const parsed = parseFloat(val);
    if (parsed > 0) {
      const formatted = this.formatNumberWithCommas(parsed);
      control.setValue(formatted, { emitEvent: false });
    }
  }

  public onSave(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      setTimeout(() => {
        const firstInvalid = this.inputElements.find(el =>
          el.nativeElement.classList.contains('ng-invalid')
        );
        if (firstInvalid) {
          firstInvalid.nativeElement.focus();
        }
      }, 0);
      return;
    }

    // Convert formatted strings back to numbers
    const finalItems = this.items.value.map((item: AssetItem) => ({
      type: item.type,
      value: parseFloat(item.value.toString().replace(/,/g, ''))
    }));

    this.save.emit(finalItems);
  }

  private createItem(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  private formatNumberWithCommas(value: number): string {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
