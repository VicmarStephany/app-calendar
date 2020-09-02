import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventDataBaseRespositoryMapper } from './event-database-repository.mapper';
import { EventRepository } from 'src/app/domain/repository/event.repository';
import { Observable, from } from 'rxjs';
import { EventModel } from 'src/app/domain/models/event.model';
import { EventEntity } from './event-database-entity';
import { map, switchMap, flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventDatabaseRepository extends EventRepository {
    private mapper = new EventDataBaseRespositoryMapper()

    constructor(private db: AngularFirestore) {
        super();
    }

    getAll(): Observable<EventModel> {

        return this.db.collection<EventEntity>(`events`).valueChanges({idFields: 'id'}).pipe(flatMap(item =>{
            if (item.length){
                return item;
            }else {
                throw new Error('Error');
            }
        })).pipe(map(item => this.mapper.mapFrom(item)));
    }

    create(ev: EventModel): Observable<EventModel>{

        return from(this.db.collection<EventEntity>('events').add(this.mapper.mapTo(ev)).then(ref =>{
            ev.id = ref.id;
            this.update(ev);
            return ev;
        }));
    }

    delete(ev: EventModel): Observable<EventModel> { 

        return from(this.db.collection<EventEntity>(`events`).doc(ev.id).delete().then(()=>{
            return ev;
        }));
    }

    update(ev: EventModel): Observable<EventModel> {

        return from(this.db.collection<EventEntity>(`events`).doc(ev.id).update(ev).then(() =>{
            return ev;
        }));
    }


}
