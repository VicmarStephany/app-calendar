import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from '../shared/event';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  eventSource = [];

  constructor(private modalCtrl: ModalController, private db: AngularFirestore) { }

  getEvents(){
    return this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();        
        console.log(event);
        this.eventSource.push(event);
      });
    });
  }

  //Create new event
  createEvent(ev: Event) {
    console.log(ev);

    let event = {
      title: ev.title,
      description: ev.description,
      startTime: new Date(ev.startTime),
      endTime: new Date(ev.endTime),
      allDay: ev.allDay,
    };
    
    this.db.collection(`events`).add(event);
  }


 

}
