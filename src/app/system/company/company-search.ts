import { Component, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';

import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'company-search',
  imports: [HlmSelectImports, HlmInputImports, HlmFieldImports, HlmButtonGroupImports, HlmButtonImports],
  template: `
    <!--
    <hlm-select [itemToString]="itemToString" [(value)]="menuGroupInfo().selectedId">
      <hlm-select-trigger class="w-56">
        <hlm-select-value placeholder="Select a fruit" />
      </hlm-select-trigger>
      <hlm-select-content *hlmSelectPortal>
        <hlm-select-group>
          @for (item of menuGroupInfo().list; track item.menuGroupCode) {
            <hlm-select-item [value]="item.menuGroupCode">{{ item.menuGroupName }}</hlm-select-item>
          }
        </hlm-select-group>
      </hlm-select-content>
    </hlm-select>
-->
    <hlm-field>
			<label hlmFieldLabel for="input-button-group">Search</label>
			<hlm-button-group>
				<input hlmInput id="input-button-group" placeholder="Type to search..." />
				<button hlmBtn variant="outline">Search</button>
			</hlm-button-group>
		</hlm-field>
  `,
  styles: ``,
})
export default class CompanySearch {

  /*
  public readonly itemToString = (value: string) => this.query.company.list.find((item) => item.value === value)?.label || '';

  query: {
    company : { value: string, list: {label: string, value: string}[] }
  } = {
    company : {
      value: '',
      list: [
        {label: '회사코드', value: 'companyCode'},
        {label: '회사명', value: 'companyName'},
      ]
    }
  }
  */





}
