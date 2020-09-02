import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventUseCase } from 'src/app/domain/usecases/create-event.usecases';
import { EventModel } from 'src/app/domain/models/event.model';
 
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
  
  event: EventModel = {
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
 
  constructor(private modalCtrl: ModalController, public createEvent: CreateEventUseCase) { }
 
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }

  addNewEvent(ev) {
    console.log(ev);
    this.createEvent.execute(ev).subscribe(data =>{
      console.log(data);
    })
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