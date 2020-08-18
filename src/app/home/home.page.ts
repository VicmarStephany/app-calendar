import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ModalPage } from '../pages/modal/modal.page';
import { ModalController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  selectedDate: Date;
 
  @ViewChild(CalendarComponent) calendarModal: CalendarComponent;
 
  constructor( private alertCtrl: AlertController, private modalCtrl: ModalController, 
              @Inject(LOCALE_ID) private locale: string, private db: AngularFirestore,
  ) {
    this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
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
 
  ngOnInit() {}
 
  // Change current month/week/day
  next() {
    this.calendarModal.slideNext();
  }
 
  back() {
    this.calendarModal.slidePrev();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  // Calendar event was clicked
  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      mode: "md",
      header: event.title,
      subHeader: event.description,
      message: 'Inicio: ' + start + '<br><br>Fin: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }
 
  removeEvents() {
    this.eventSource = [];
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.calendarModal.loadEvents();
      }
    });
  }
 
}
