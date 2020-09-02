import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { EventModel } from '../domain/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  eventSource = [];

  constructor( private db: AngularFirestore, private fireDb: AngularFireDatabase) { }

  getEvents() {
    return this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event: any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
      });
    });
  }

  createEvent(ev: EventModel) {
    let event = {
      title: ev.title,
      description: ev.description,
      startTime: new Date(ev.startTime),
      endTime: new Date(ev.endTime),
      allDay: ev.allDay,
    };
    this.db.collection(`events`).add(event);
  }

  deleteEvent(id) {
    return this.db.collection(`events`).doc(id).delete();
  }

  editEvent(id: string, ev: EventModel) {

    return this.db.collection(`events`).doc(id).update({
      title: ev.title,
      description: ev.description,
      startTime: new Date(ev.startTime),
      endTime: new Date(ev.endTime),
      allDay: ev.allDay,
    });
  }


}
