import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from '../base/use-case';
import { EventModel } from '../models/event.model';
import { EventRepository } from '../repository/event.repository';

@Injectable({
    providedIn: 'root'
})

export class DeleteEventUseCase implements UseCase<string,EventModel>{
     
    constructor( private eventRepository: EventRepository ){}

    execute(param: string): Observable<EventModel> {
        return this.eventRepository.delete(param);
    }
}