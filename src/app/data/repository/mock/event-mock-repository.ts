import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { EventRepositoryMockMapper } from './event-mock-repository.mapper';
import { EventMockEntity } from './event-mock-entity';
import { events } from './event-mock-data';
import { EventRepository } from 'src/app/domain/repository/event.repository';
import { EventModel } from 'src/app/domain/models/event.model';

@Injectable({
    providedIn: 'root'
})

export class EventMockRepository extends EventRepository {

    private mapper = new EventRepositoryMockMapper();
    listEvent: EventMockEntity[]

    constructor(){
        super();
        this.listEvent = events;
    }

    getAll(): Observable<EventModel>{
        return from(this.listEvent.map(item => this.mapper.mapFrom(item)));
    }

    create(param: EventModel): Observable<EventModel> {
        param.id = ( this.listEvent.length + 1).toString();
        this.listEvent.push(this.mapper.mapTo(param))
        return from([this.mapper.mapFrom(this.mapper.mapTo(param))])
    }

    update(event: EventModel): Observable<EventModel> {
        if(!this.listEvent.find(item => item.id == event.id))
            return new Observable<EventModel> ( obs => { obs.next(); });
        
        this.listEvent = this.listEvent.map(item => item.id == event.id ? this.mapper.mapTo(event) : item)
            return from([this.mapper.mapFrom(this.mapper.mapTo(event))]);
    }

    delete(event:EventModel): Observable<EventModel> {
        this.listEvent = this.listEvent.filter(item => item.id != event.id)
        
        return from([this.mapper.mapFrom(this.mapper.mapTo(event))])
    }
}