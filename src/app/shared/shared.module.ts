import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderMenuComponent, FooterComponent],
  imports: [CommonModule],
  exports: [HeaderMenuComponent, FooterComponent],
})
export class SharedModule {}
