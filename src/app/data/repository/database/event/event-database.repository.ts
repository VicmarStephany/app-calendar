import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { EventDataBaseRespositoryMapper } from './event-database-repository.mapper';
import { EventRepository } from 'src/app/domain/repository/event.repository';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/domain/models/event.model';

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
        return this.db.collection(`events`).snapshotChanges();
    }

    create(ev: EventModel) {
        let event = {
            title: ev.title,
            description: ev.description,
            startTime: new Date(ev.startTime),
            endTime: new Date(ev.endTime),
            allDay: ev.allDay,
        };
      return this.db.collection(`events`).add(event);
    }

    delete(id: string) {
        return this.db.collection(`events`).doc(id).delete();
    }

    update(id: string, ev: EventModel) {

        return this.db.collection(`events`).doc(id).update({
            title: ev.title,
            description: ev.description,
            startTime: new Date(ev.startTime),
            endTime: new Date(ev.endTime),
            allDay: ev.allDay,
        });
    }


}
