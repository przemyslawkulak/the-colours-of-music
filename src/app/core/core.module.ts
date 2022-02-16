import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// angular material

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// shared components
import { HeaderMenuComponent } from '../core/components/header-menu/header-menu.component';
import { FooterComponent } from '../core/components/footer/footer.component';

@NgModule({
  declarations: [HeaderMenuComponent, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
  ],
  exports: [HeaderMenuComponent, FooterComponent],
})
export class CoreModule {}
