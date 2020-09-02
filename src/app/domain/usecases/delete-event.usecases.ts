import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from '../base/use-case';
import { EventModel } from '../models/event.model';
import { EventRepository } from '../repository/event.repository';

@Injectable({
    providedIn: 'root'
})

export class DeleteEventUseCase implements UseCase<EventModel,EventModel>{
     
    constructor( private eventRepository: EventRepository ){}

    execute(event: EventModel): Observable<EventModel> {
        return this.eventRepository.delete(event);
    }
}