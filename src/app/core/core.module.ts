import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// shared components
import { HeaderMenuComponent } from '../core/components/header-menu/header-menu.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [HeaderMenuComponent, FooterComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderMenuComponent, FooterComponent],
})
export class CoreModule {}
