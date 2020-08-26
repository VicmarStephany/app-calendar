import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRepository } from 'src/app/domain/repository/event.repository';
import { EventDatabaseRepository } from './event/event-database.repository';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: EventRepository, useClass: EventDatabaseRepository
    }
  ]
})
export class DatabaseModule { }
