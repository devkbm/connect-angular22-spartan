import { NgTemplateOutlet } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideBot, lucideChevronRight, lucideSettings2, lucideSquareTerminal } from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { GlobalProperty } from '@src/app/core/global-property';
import { getHttpOptions } from '@src/app/core/http/http-utils';
import { ResponseList } from '@src/app/core/model/response-list';
import { SessionManager } from '@src/app/core/session-manager';

export interface MenuHierarchy {
  createdDt: Date;
  createdBy: string;
  modifiedDt: Date;
  modifiedBy: string;
  key: string;
  title: string;
  menuGroupId: string;
  menuId: string;
  menuName: string;
  parentMenuId: string;
  menuType: string;
  sequence: number;
  level: number;
  url: string;
  selected: boolean;
  expanded: boolean;
  children: MenuHierarchy[]
}


@Component({
	selector: 'spartan-nav-menu',
	imports: [HlmSidebarImports, NgIcon, HlmCollapsibleImports, RouterLink, NgTemplateOutlet],
	providers: [provideIcons({ lucideSquareTerminal, lucideBot, lucideBookOpen, lucideSettings2, lucideChevronRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-sidebar-group>
			<div hlmSidebarGroupLabel (click)="dd()">Platform</div>
			<ul hlmSidebarMenu>

        <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menuHierarchy() }"></ng-container>
        <ng-template #menuTpl let-menus>
				@for (item of menus; track $index) {
					<hlm-collapsible [expanded]="item.expanded ?? false">
						<li hlmSidebarMenuItem>
							<a hlmSidebarMenuButton [routerLink]="item.url">
								<!--<ng-icon [name]="item.icon" />-->
								{{ item.title }}
							</a>
							@if (item.children; as subItems) {
								<button hlmCollapsibleTrigger hlmSidebarMenuAction class="data-[state=open]:rotate-90">
									<ng-icon name="lucideChevronRight" />
								</button>

								<hlm-collapsible-content>
									<ul hlmSidebarMenuSub>
										@for (subItem of subItems; track $index) {
											<li hlmSidebarMenuSubItem>
												<a hlmSidebarMenuSubButton [routerLink]="subItem.url">{{ subItem.title }}</a>
											</li>
										}
									</ul>
								</hlm-collapsible-content>
							}
						</li>
					</hlm-collapsible>
				}
        </ng-template>
			</ul>
		</hlm-sidebar-group>
	`,
})
export class NavMenu implements OnChanges {
  private http = inject(HttpClient);
  private router = inject(Router);

  menuGroupCode = input<string>();
  menuHierarchy = signal<MenuHierarchy[]>([]);

  constructor() {
    /*
    effect(() => {
      if (this.menuGroupCode()) {
        this.getMenuList(this.menuGroupCode()!);
      }
    })
    */
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (this.menuGroupCode() /*&& changes['menuGroupCode'].previousValue !== undefined */) {
      this.getMenuList(this.menuGroupCode()!);
    }
  }


  getMenuList(menuGroupCode: string): void {

    const userId = SessionManager.getUserId() as string;
    const url =  GlobalProperty.serverUrl() + `/api/system/menuhierarchy/${userId}/${menuGroupCode}`;
    const options = getHttpOptions();

    this.http.get<ResponseList<MenuHierarchy>>(url, options).pipe(
          // catchError(this.handleError<ResponseObject<BizCode>>('get', undefined))
        )
        .subscribe(
          (model: ResponseList<MenuHierarchy>) => {
            if (model.data) {
              this.menuHierarchy.set(model.data);

              console.log(this.menuHierarchy());

              sessionStorage.setItem('menuList', JSON.stringify(model.data));
            }
          }
        );
  }

  dd() {
    this.router.navigate(['/home/edit']);
  }

}
