import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { hlmMuted } from '@spartan-ng/helm/typography';

import { formatDate } from '@angular/common';

import {
	columnFilteringFeature,
	type ColumnFiltersState,
	columnVisibilityFeature,
	type ColumnVisibilityState,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_includesString,
	FlexRender,
	injectTable,
	rowPaginationFeature,
	rowSelectionFeature,
	type RowSelectionState,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_text,
	type SortingState,
	tableFeatures,
} from '@tanstack/angular-table';

import { ActionDropdown } from './action-dropdown';
import { TableHeadSelection, TableRowSelection } from './selection-column';
import { TableHeadSortButton } from './sort-header-button';

const features = tableFeatures({
	columnFilteringFeature,
	columnVisibilityFeature,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
	filterFns: { includesString: filterFn_includesString },
	sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

export type DataTableFeatures = typeof features;

const columnHelper = createColumnHelper<DataTableFeatures, Payment>();
const columns = columnHelper.columns([
	columnHelper.display({
		id: 'select',
		header: () => TableHeadSelection,
		cell: () => TableRowSelection,
		enableHiding: false,
	}),
  columnHelper.display({
    id: 'rowNumber',
    header: '#',
    cell: ({ row }) => {
      const displayIndex = row.getDisplayIndex()
      return displayIndex === -1 ? '' : displayIndex + 1
    }
  }),
	columnHelper.accessor('companyCode', {
		id: 'companyCode',
		header: '회사코드',
		cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
	}),
	columnHelper.accessor('companyName', {
		id: 'companyName',
		header: '회사명',
		cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
	}),
  columnHelper.accessor('businessRegistrationNumber', {
		id: 'businessRegistrationNumber',
		header: '사업자등록번호',
		cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
	}),
  columnHelper.accessor('coporationNumber', {
		id: 'coporationNumber',
		header: '법인번호',
		cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
	}),
  columnHelper.accessor('nameOfRepresentative', {
		id: 'nameOfRepresentative',
		header: '대표자',
		cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
	}),
  columnHelper.accessor('establishmentDate', {
		id: 'establishmentDate',
		header: '설립일',
		cell: (info) => `<span>${formatDate(info.getValue<string>(),'yyyy-MM-dd','en-us')}</span>`,
    //cell: (info) => {return formatDate(info.getValue<string>(),'YYYYMMdd','ko-kr')}
	}),
  columnHelper.accessor('establishmentDate', {
		id: 'establishmentDate2',
		header: '설립일2',
		cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
	}),
	columnHelper.display({
		id: 'actions',
		cell: () => ActionDropdown,
		enableHiding: false,
	}),
]);

export type Payment = {
  /**
   * 회사코드
   */
	companyCode: string;
  /**
   * 회사명
   */
	companyName: string;
  /**
   * 사업자등록번호
   */
  businessRegistrationNumber: string;
	/**
   * 법인번호
   */
  coporationNumber: string | null;
  /**
   * 대표자
   */
  nameOfRepresentative: string | null;
  /**
   * 설립일
   */
  establishmentDate: Date | null;
};

const PAYMENT_DATA: Payment[] = [
	{
    companyCode: 'm5gr84i9',
    companyName: '316',
    businessRegistrationNumber: 'success',
    coporationNumber: 'ken99@yahoo.com',
    nameOfRepresentative: null,
    establishmentDate: new Date('2026-10-01')
  },
	{
    companyCode: '3u1reuv4',
    companyName: '316',
    businessRegistrationNumber: 'success',
    coporationNumber: 'ken99@yahoo.com',
    nameOfRepresentative: null,
    establishmentDate: null
  },
];


@Component({
	selector: 'spartan-data-table-preview',
	imports: [
		FlexRender,
		FormsModule,
		HlmDropdownMenuImports,
		HlmButtonImports,
		NgIcon,

		HlmInputImports,
		HlmTableImports,
	],
	providers: [provideIcons({ lucideChevronDown })],
	host: {
		class: 'w-full',
	},
	template: `
		<div class="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
			<input hlmInput class="w-full md:w-80" placeholder="Filter emails..." (input)="_filterChanged($event)" />

			<button hlmBtn variant="outline" align="end" [hlmDropdownMenuTrigger]="menu">
				Columns
				<ng-icon name="lucideChevronDown" class="ml-2" />
			</button>
			<ng-template #menu>
				<hlm-dropdown-menu class="w-32">
					@for (column of _hidableColumns; track column.id) {
						<button
							hlmDropdownMenuCheckbox
							class="capitalize"
							[checked]="column.getIsVisible()"
							(triggered)="column.toggleVisibility()"
						>
							<hlm-dropdown-menu-checkbox-indicator />
							{{ column.columnDef.id }}
						</button>
					}
				</hlm-dropdown-menu>
			</ng-template>
		</div>

		<div class="overflow-hidden rounded-md border">
			<div hlmTableContainer>
				<table hlmTable>
					<thead hlmTHead>
						@for (headerGroup of _table.getHeaderGroups(); track headerGroup.id) {
							<tr hlmTr>
								@for (header of headerGroup.headers; track header.id) {
									<th hlmTh [attr.colSpan]="header.colSpan">
										@if (!header.isPlaceholder) {
											<ng-container
												*flexRender="header.column.columnDef.header; props: header.getContext(); let headerText"
											>
												<div [innerHTML]="headerText"></div>
											</ng-container>
										}
									</th>
								}
							</tr>
						}
					</thead>
					<tbody hlmTBody>
						@for (row of _table.getRowModel().rows; track row.id) {
							<tr hlmTr [attr.key]="row.id" [attr.data-state]="row.getIsSelected() && 'selected'">
								@for (cell of row.getVisibleCells(); track $index) {
									<td hlmTd>
										<ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
											<div [innerHTML]="cell"></div>
										</ng-container>
									</td>
								}
							</tr>
						} @empty {
							<tr hlmTr>
								<td hlmTd class="h-24 text-center" [attr.colspan]="_columns.length">No results.</td>
							</tr>
						}
					</tbody>
				</table>
			</div>
		</div>

		<div class="flex flex-col justify-between py-4 sm:flex-row sm:items-center">
			@if (_table.getRowCount() > 0) {
				<div class="${hlmMuted}">
					{{ _table.getSelectedRowModel().rows.length }} of {{ _table.getRowCount() }} row(s) selected
				</div>
				<div class="mt-2 flex space-x-2 sm:mt-0">
					<button
						size="sm"
						variant="outline"
						hlmBtn
						[disabled]="!_table.getCanPreviousPage()"
						(click)="_table.previousPage()"
					>
						Previous
					</button>
					<button size="sm" variant="outline" hlmBtn [disabled]="!_table.getCanNextPage()" (click)="_table.nextPage()">
						Next
					</button>
				</div>
			} @else {
				<div class="flex h-full w-full items-center justify-center">
					<div class="text-muted-foreground text-sm">No Data</div>
				</div>
			}
		</div>
	`,
})
export class DataTablePreview {
	protected readonly _columns = columns;

	private readonly _columnFilters = signal<ColumnFiltersState>([]);
	private readonly _sorting = signal<SortingState>([]);
	private readonly _rowSelection = signal<RowSelectionState>({});
	private readonly _columnVisibility = signal<ColumnVisibilityState>({});

	protected readonly _table = injectTable(() => ({
		features,
		columns,
		data: PAYMENT_DATA,
		onSortingChange: (updater) => {
			updater instanceof Function ? this._sorting.update(updater) : this._sorting.set(updater);
		},
		onColumnFiltersChange: (updater) => {
			updater instanceof Function ? this._columnFilters.update(updater) : this._columnFilters.set(updater);
		},
		onColumnVisibilityChange: (updater) => {
			updater instanceof Function ? this._columnVisibility.update(updater) : this._columnVisibility.set(updater);
		},
		onRowSelectionChange: (updater) => {
			updater instanceof Function ? this._rowSelection.update(updater) : this._rowSelection.set(updater);
		},
		state: {
			sorting: this._sorting(),
			columnFilters: this._columnFilters(),
			columnVisibility: this._columnVisibility(),
			rowSelection: this._rowSelection(),
		},
	}));
	protected readonly _hidableColumns = this._table.getAllColumns().filter((column) => column.getCanHide());

	protected _filterChanged(event: Event) {
		this._table.getColumn('email')?.setFilterValue((event.target as HTMLInputElement).value);
	}
}


