import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CalendarNewEventPage } from '../calendar-new-event/calendar-new-event';
import { CalendarEditEventPage } from '../calendar-edit-event/calendar-edit-event';
import { EventProvider } from '../../providers/events';
import { ProfileData } from '../../providers/profile-data';
import { CalendarData } from '../../providers/calendar-data';
import { CalendarListPage } from '../calendar-list/calendar-list';
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  public eventList: Array<any>;
  public eventListTwo: Array<any> = [];
  public strong: Array<boolean> = [];
  //day 29 month 6 is exam date
  day = 29;
  month = 6;
  public userProfile: any;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public profileData: ProfileData, public calendarData: CalendarData, public alertCtrl: AlertController) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });
  }

  calendarList() {
    this.navCtrl.push(CalendarListPage, { month: this.month });
  }

  deleteCalendarEvent(event, helperEvent) {
    let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete this event?',
    cssClass: "alertcss",
    buttons: [
      {
        cssClass: "alertButtonNormal",
        text: 'Cancel',
        role: 'cancel',
      },
      {
        cssClass: "alertButtonNormal",
        text: 'Delete',
        handler: () => {
          this.calendarData.deleteCalendarEvent(helperEvent.eventId, helperEvent.assignedTo).then(() => {
      this.ionViewDidEnter();
    });
        }
      }
    ]
  });
  alert.present();
  }

  blueStamp(id: string, assignedTo: string) {
    console.log(this.userProfile.userIsCoordinator);
    this.calendarData.blueStamp(true, id, assignedTo).then(() => {
      this.ionViewDidEnter()
      });
  }
  redStamp(id: string, assignedTo: string) {
    console.log(this.userProfile.userIsCoordinator);
    this.calendarData.blueStamp(false, id, assignedTo).then((wait) => {
        this.ionViewDidEnter()
      });
  }

  ionViewDidEnter() {
    this.eventListTwo = [];
    var self = this;
    this.strong = [];

    if (!this.userProfile.userIsCoordinator) {
      this.eventProvider.readFromCalendar(this.userProfile.userId).then(eventListSnap => {
        this.eventList = eventListSnap;

        self.eventList.forEach(element => {
          self.strong[element.month * 31 + element.day] = true;
        });
      });
    } else {
      this.eventProvider.readHelpersFromCalendar(this.userProfile.userId).then(helpers => {
        helpers.forEach(helper => {
          self.eventProvider.readCalendarForHelper(helper.userId).then(eventListSnap => {
            self.eventListTwo = self.eventListTwo.concat(eventListSnap)
          }).then(() => {
            self.eventListTwo.forEach(element => {
              self.strong[element.month * 31 + element.day] = true;
            });
          });
        });

      });
    }
  }

  newCalendarEvent() {
    this.navCtrl.push(CalendarNewEventPage, { day: this.day, month: this.month });
  }

  editCalendarEvent(eventId: string, assignedTo: string, startTime: string, endTime: string, note: string) {
    console.log(assignedTo)
    this.navCtrl.push(CalendarEditEventPage, { eventId: eventId, assignedTo: assignedTo, startTime: startTime, endTime: endTime, note: note });
  }

  monthMinus() {
    if (this.month > 5) {
      this.month -= 1;
    }
  }

  monthPlus() {
    if (this.month < 7) {
      this.month += 1;
    }
  }

  days(d: number) {
    this.day = d;
  }
}