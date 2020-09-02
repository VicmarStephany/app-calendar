import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateEventUseCase } from 'src/app/domain/usecases/update-event-usecases';
import { EventModel } from 'src/app/domain/models/event.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements AfterViewInit, OnInit {

  @Input() evento: EventModel;

  viewTitle: string;
  
  minDate = new Date().toISOString();
  selectedDate = new Date();

  modalReady = false;

  eventEdit: EventModel = {
    id:'',
    title: '',
    description: '',
    startTime: null,
    endTime: null,
    allDay: false
  };
 
  constructor(private modalCtrl: ModalController, public updateEvent: UpdateEventUseCase) {}
 
  ngOnInit(){
    console.log(this.eventEdit);
  }

  ionViewWillEnter(){
    this.eventEdit.id = this.evento.id;
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

  editEvent(ev: EventModel) {
    console.log(ev);

    this.updateEvent.execute(ev).subscribe(data =>{
      console.log(data);
    })
    this.modalCtrl.dismiss({event: this.evento})
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    this.eventEdit.startTime = ev.selectedTime;
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}
