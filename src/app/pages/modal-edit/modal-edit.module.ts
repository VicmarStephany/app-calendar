import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { NgCalendarModule } from 'ionic2-calendar';
import { ModalEditPage } from './modal-edit.page';
import { ModalEditPageRoutingModule } from './modal-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [
    ModalEditPage
  ]
})
export class ModalEditPageModule {}
