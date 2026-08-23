import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand } from '@ng-icons/lucide';

import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmSelectImports } from '@spartan-ng/helm/select';

import { data } from './data';
import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
import { NavMenu } from "./nav-menu";
import { Router } from '@angular/router';


@Component({
	selector: 'spartan-app-sidebar-inset',
	imports: [
    HlmSidebarImports, NgIcon, NavMain, NavProjects, NavUser, NavSecondary, NavMenu,
    HlmSelectImports
  ],
	providers: [provideIcons({ lucideCommand })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div hlmSidebarWrapper>
			<hlm-sidebar variant="inset">
				<hlm-sidebar-header>
					<ul hlmSidebarMenu>
						<li hlmSidebarMenuItem>
							<a hlmSidebarMenuButton size="lg" href="#">
								<div
									class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
								>
									<ng-icon name="lucideCommand" class="text-base" />
								</div>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-medium">Acme Inc</span>
									<span class="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</li>
					</ul>
				</hlm-sidebar-header>


				<hlm-sidebar-content>
          <!--
          <hlm-combobox [(value)]="menuGroupInfo().selectedId" (valueChange)="moveToMenuGroupUrl($event)">
            <hlm-combobox-input placeholder="Select a framework" />
            <hlm-combobox-content *hlmComboboxPortal>
              <hlm-combobox-empty>No items found.</hlm-combobox-empty>
              <div hlmComboboxList>
                @for (menuGroup of menuGroupInfo().list; track $index) {
                  <hlm-combobox-item [value]="menuGroup.menuGroupCode">{{ menuGroup.menuGroupName }}</hlm-combobox-item>
                }
              </div>
            </hlm-combobox-content>
          </hlm-combobox>
          -->

          <hlm-select [itemToString]="itemToString" [(value)]="menuGroupInfo().selectedId" (valueChange)="moveToMenuGroupUrl($event)">
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

					<!--<spartan-nav-main [items]="data.navMain" />-->
          <spartan-nav-menu [menuGroupCode]="menuGroupInfo().selectedId" />

          <!--
					<spartan-nav-projects [projects]="data.projects" />
					<spartan-nav-secondary class="mt-auto" [items]="data.navSecondary" />
              -->
				</hlm-sidebar-content>

				<hlm-sidebar-footer>
					<spartan-nav-user [user]="data.user" />
				</hlm-sidebar-footer>

			</hlm-sidebar>
			<ng-content />
		</div>
	`,
})
export class AppSidebarInset {

  private router = inject(Router);

	public readonly data = data;

  public readonly itemToString = (value: string) => this.menuGroupInfo().list.find((item) => item.menuGroupCode === value)?.menuGroupName || '';

  menuGroupInfo = signal<{list: {menuGroupCode: string, menuGroupName: string, menuGroupUrl: string}[], selectedId: string}>({
    list: [],
    selectedId: ''
  })


  constructor() {

    const stringMenuGroupList = sessionStorage.getItem('menuGroupList') as string;
    this.menuGroupInfo.update(current => ({...current, list: JSON.parse(stringMenuGroupList)}));

    const sessionMenuGroup  = sessionStorage.getItem('selectedMenuGroup');
    if (sessionMenuGroup) {
      this.menuGroupInfo.update(current => ({...current, selectedId: sessionMenuGroup}));
    }

  }

  moveToMenuGroupUrl(menuGroupCode: any) {
    sessionStorage.setItem('selectedMenuGroup', menuGroupCode);

    for (const menuGroup of this.menuGroupInfo().list) {
      if (menuGroup.menuGroupCode === menuGroupCode) {
        this.router.navigate([menuGroup.menuGroupUrl]);
      }
    }
  }


}
