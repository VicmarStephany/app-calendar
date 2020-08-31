import { Observable } from "rxjs";
import { EventModel } from '../models/event.model';

export abstract class EventRepository {
    abstract getAll(): Observable<EventModel[]>;
    abstract create(param: EventModel): Observable<EventModel>;
    abstract update(event: EventModel): Observable<EventModel>;
    abstract delete(id: string): Observable<EventModel>;
}