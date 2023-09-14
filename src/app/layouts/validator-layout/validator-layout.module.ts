import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { ValidatorLayoutRoutes } from './validator-layout.routing';
import { ValidatorProfileComponent } from '../../pages/validator/validator-profile/validator-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ValidatorLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    ValidatorProfileComponent,
  ]
})

export class ValidatorLayoutModule {}