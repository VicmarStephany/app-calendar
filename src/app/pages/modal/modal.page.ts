import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from 'src/app/shared/event';
import { FirebaseService } from 'src/app/services/firebase.service';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements AfterViewInit{
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;
  
  event: Event = {
    id:'',
    title: '',
    description: '',
    startTime: null,
    endTime: null,
    allDay: false
  };
  
  minDate = new Date().toISOString();
  selectedDate = new Date();

  modalReady = false;
 
  constructor(private modalCtrl: ModalController, private db: AngularFirestore, public firebaseService: FirebaseService) { }
 
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }

  addNewEvent(ev) {
    console.log(ev);
    this.firebaseService.createEvent(ev);
    this.modalCtrl.dismiss({event: this.event})
  }
 
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    this.event.startTime = new Date(ev.selectedTime);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}