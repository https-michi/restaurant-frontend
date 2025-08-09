
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  exports: [
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    NzIconModule,
    NzLayoutModule,
    NzGridModule,
  ]
})
export class DemoNgZorroAntdModule { }
