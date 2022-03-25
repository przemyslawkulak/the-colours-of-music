import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { SigninComponent } from './signin/signin.component';

export const userRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
];
@NgModule({
  declarations: [LoginComponent, SigninComponent],
  exports: [LoginComponent],
  imports: [SharedModule, RouterModule.forChild(userRoutes)],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [UserService, UserGuard],
    };
  }
}
