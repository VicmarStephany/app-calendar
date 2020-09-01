import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from './repository/database/database.module';
import { MockModule } from './repository/mock/mock.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //DatabaseModule, 
    MockModule
  ]
})
export class DataModule { }
