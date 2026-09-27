import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablePreview } from './example';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, DataTablePreview],
  template: `
  Company
  <spartan-data-table-preview></spartan-data-table-preview>
  `
})
export default class CompanyComponent {}
