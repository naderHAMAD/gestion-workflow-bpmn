import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorNavbarComponent } from './validator-navbar/validator-navbar.component';
import { SimpleUserNavbarComponent } from './simple-user-navbar/simple-user-navbar.component';
import { SimpleUserSidebarComponent } from './simple-user-sidebar/simple-user-sidebar.component';
import { ValidatorSidebarComponent } from './validator-sidebar/validator-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ValidatorNavbarComponent,
    SimpleUserNavbarComponent,
    SimpleUserSidebarComponent,
    ValidatorSidebarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ValidatorNavbarComponent,
    SimpleUserNavbarComponent,
    SimpleUserSidebarComponent,
    ValidatorSidebarComponent,
  ]
})
export class ComponentsModule { }
