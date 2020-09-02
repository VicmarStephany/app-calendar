import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';
import { ModalEditPage } from '../../components/modal-edit/modal-edit.page';
import { ModalPage } from '../../components/modal/modal.page';
import { GetAllEventUseCase } from 'src/app/domain/usecases/get-all-event.usecases';
import { DeleteEventUseCase } from 'src/app/domain/usecases/delete-event.usecases';
import { Router } from '@angular/router';


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

  constructor(private alertCtrl: AlertController, 
              private modalCtrl: ModalController,
              @Inject(LOCALE_ID) 
              private locale: string, 
              public getAllEvents: GetAllEventUseCase,
              public deleteEvent: DeleteEventUseCase,
              public router: Router 
  ) {
    this.getAllEvents.execute(null).subscribe(data => {
        this.eventSource.push(data);
      console.log(data);
    });
  }

  ngOnInit() {

  }

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
    console.log(event);

    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    const alert = await this.alertCtrl.create({
      mode: "md",
      header: event.title,
      subHeader: event.description,
      message: 'Inicio: ' + start + '<br><br>Fin: ' + end,
      buttons: [{
        text: 'Editar',
        handler: (blah) => {
          this.openModalEdit(event);
        }
      }, {
        text: 'Eliminar',
        handler: (blah) => {
        this.deleteEvent.execute(event).subscribe(data =>{
            console.log(data);
          })
          this.router.navigate(['/home']);
  
        }
      },   {
        text: 'Cerrar',
        handler: () => {
          console.log('Ok');
        }
      },],
    });
    alert.present();
  }

  removeEvents() {
    this.eventSource = [];
  }

  async openModalEdit(ev) {
    const modal = await this.modalCtrl.create({
      component: ModalEditPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
      mode: "md",
      componentProps: {
        'evento': ev,
      },
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
