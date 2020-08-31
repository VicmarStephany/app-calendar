import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from '../base/use-case';
import { EventModel } from '../models/event.model';
import { EventRepository } from '../repository/event.repository';

@Injectable({
    providedIn: 'root'
})

export class UpdateEventUseCase implements UseCase<EventModel,EventModel>{
     
    constructor( private eventRepository: EventRepository ){}

    execute(param: EventModel): Observable<EventModel> {
        return this.eventRepository.update(param);
    }
}