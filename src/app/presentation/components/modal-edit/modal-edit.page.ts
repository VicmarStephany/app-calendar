import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Event } from 'src/app/shared/event';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements AfterViewInit, OnInit {

  @Input() evento: Event;

  viewTitle: string;
  
  minDate = new Date().toISOString();
  selectedDate = new Date();

  modalReady = false;

  eventEdit: Event = {
    id:'',
    title: '',
    description: '',
    startTime: null,
    endTime: null,
    allDay: false
  };
 
  constructor(private modalCtrl: ModalController, public firebaseService: FirebaseService) {}
 
  ngOnInit(){
    console.log(this.eventEdit);
  }

  ionViewWillEnter(){
    this.eventEdit.title = this.evento.title;
    this.eventEdit.description = this.evento.description;
    this.eventEdit.startTime = this.evento.startTime;
    this.eventEdit.endTime = this.evento.endTime;
    this.eventEdit.allDay = this.evento.allDay;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }

  editEvent(ev: Event) {
    console.log(ev);
    this.firebaseService.editEvent(this.evento.id, ev);
    this.modalCtrl.dismiss({event: this.evento})
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    this.eventEdit.startTime = new Date(ev.selectedTime);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}
