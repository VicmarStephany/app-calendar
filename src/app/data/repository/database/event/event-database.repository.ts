import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { EventDataBaseRespositoryMapper } from './event-database-repository.mapper';
import { EventRepository } from 'src/app/domain/repository/event.repository';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/domain/models/event.model';
import { EventEntity } from './event-database-entity';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventDatabaseRepository extends EventRepository {
    private mapper = new EventDataBaseRespositoryMapper()
    bookingListRef: AngularFireList<any>;
    bookingRef: AngularFireObject<any>;
    eventSource = [];

    constructor(private db: AngularFirestore) {
        super();
    }

    getAll(): Observable<EventModel[]> {
        return this.db.doc<EventEntity[]>(`events`).valueChanges();
        /*
        snapshotChanges().pipe(map(item => {
            return item.map(item => this.mapper.mapFrom(item));

        }))*/
    }

    create(ev: EventModel): Observable<EventModel>{
        let event = {
            title: ev.title,
            description: ev.description,
            startTime: new Date(ev.startTime),
            endTime: new Date(ev.endTime),
            allDay: ev.allDay,
        };
      return this.db.collection<EventEntity>(`events`).add(this.mapper.mapTo(event));
    }

    delete(id: string): Observable<EventModel> {
        return this.db.collection<EventEntity>(`events`).doc(id).delete();
    }

    update(ev: EventModel): Observable<EventModel> {

        return this.db.collection<EventEntity>(`events`).doc(ev.id).update({
            title: ev.title,
            description: ev.description,
            startTime: new Date(ev.startTime),
            endTime: new Date(ev.endTime),
            allDay: ev.allDay,
        });
    }


}
