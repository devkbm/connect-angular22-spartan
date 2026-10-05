import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablePreview } from './example';
import CompanySearch from './company-search';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, DataTablePreview, CompanySearch],
  template: `
  Company

  <company-search></company-search>

  <spartan-data-table-preview></spartan-data-table-preview>
  `
})
export default class CompanyComponent {}
