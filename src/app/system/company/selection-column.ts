import { Component, input } from '@angular/core';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { type Row, type Table } from '@tanstack/angular-table';
import type { DataTableFeatures, Company } from './company-grid';

@Component({
  imports: [HlmCheckboxImports],
  host: {
    class: 'flex',
    'aria-label': 'Select all',
  },
  template: `
    <hlm-checkbox
      [checked]="table().getIsAllRowsSelected()"
      [indeterminate]="table().getIsSomeRowsSelected() && !table().getIsAllPageRowsSelected()"
      (checkedChange)="table().toggleAllPageRowsSelected($event)"
    />
  `,
})
export class TableHeadSelection {
  public readonly table = input.required<Table<DataTableFeatures, Company>>();
}

@Component({
  imports: [HlmCheckboxImports],
  host: {
    class: 'flex',
    'aria-label': 'Select Row',
  },
  template: `
    <hlm-checkbox
      [checked]="row().getIsSelected()"
      (checkedChange)="row().toggleSelected($event)"
    />
  `,
})
export class TableRowSelection {
  public readonly row = input.required<Row<DataTableFeatures, Company>>();
}
