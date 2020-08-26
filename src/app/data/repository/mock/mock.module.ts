import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRepository } from 'src/app/domain/repository/event.repository';
import { EventMockRepository } from './event-mock-repository';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: EventRepository, useClass: EventMockRepository
    }
  ]
})
export class MockModule { }
