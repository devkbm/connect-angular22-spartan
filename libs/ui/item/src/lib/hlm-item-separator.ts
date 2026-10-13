import { Directive } from '@angular/core';

import { hlmSeparatorClass } from '@spartan-ng/helm/separator';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmItemSeparator],hlm-item-separator',
  //hostDirectives: [{ directive: inputs: ['orientation'] }],
  host: { 'data-slot': 'item-separator' },
})
export class HlmItemSeparator {
  constructor() {
    classes(() => [hlmSeparatorClass, 'my-2']);
  }
}
