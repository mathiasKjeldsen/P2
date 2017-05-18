import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarNewEventPage } from '../calendar-new-event/calendar-new-event';
import { CalendarEditEventPage } from '../calendar-edit-event/calendar-edit-event';
import { EventProvider } from '../../providers/events';
import { ProfileData } from '../../providers/profile-data';
import { CalendarData } from '../../providers/calendar-data';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  public eventList: Array<any>;
  public eventListTwo: Array<any> = [];
  public strong: Array<boolean> = [];
  day = 29;
  month = 6;
  public userProfile: any;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public profileData: ProfileData, public calendarData: CalendarData, public zone: NgZone) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });
  }

  deleteCalendarEvent(event, helperEvent) {
    this.calendarData.deleteCalendarEvent(helperEvent.eventId, helperEvent.assignedTo);

    var index = this.eventList.indexOf(helperEvent, 0);
    if (index > -1) {
      this.eventList.splice(index, 1)
    } else {
      var index = this.eventListTwo.indexOf(helperEvent, 0);
      this.eventListTwo.splice(index, 1)
    }
  }

  blueStamp(id: string, assignedTo: string) {
    console.log(this.userProfile.userIsCoordinator);
    this.calendarData.blueStamp(true, id, assignedTo).then(() => {
      this.eventProvider.readFromCalendar(this.userProfile.userId).then(eventListSnap => {
        this.eventList = eventListSnap;
      });
    });
  }
  redStamp(id: string, assignedTo: string) {
    console.log(this.userProfile.userIsCoordinator);
    this.calendarData.blueStamp(false, id, assignedTo).then(() => {
      this.eventProvider.readFromCalendar(this.userProfile.userId).then(eventListSnap => {
        this.eventList = eventListSnap;
      });
    });
  }

  ionViewDidEnter() {
    var self = this;
    this.eventProvider.readFromCalendar(this.userProfile.userId).then(eventListSnap => {
      this.eventList = eventListSnap;

      self.eventList.forEach(element => {
              self.strong[element.month * 31 + element.day] = true;
      });
    });

    this.zone.run(() => {
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
    });

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

  monthMay() {
    this.month = 5;
  }

  monthJune() {
    this.month = 6;
  }

  monthJuly() {
    this.month = 7;
  }

  dayOne() {
    this.day = 1;
  }
  dayTwo() {
    this.day = 2;
  }
  dayThree() {
    this.day = 3;
  }
  dayFour() {
    this.day = 4;
  }
  dayFive() {
    this.day = 5;
  }
  daySix() {
    this.day = 6;
  }
  daySeven() {
    this.day = 7;
  }
  dayEight() {
    this.day = 8;
  }
  dayNine() {
    this.day = 9;
  }
  dayTen() {
    this.day = 10;
  }
  dayEleven() {
    this.day = 11;
  }
  dayTwelve() {
    this.day = 12;
  }
  dayThirteen() {
    this.day = 13;
  }
  dayFourteen() {
    this.day = 14;
  }
  dayFifteen() {
    this.day = 15;
  }
  daySixteen() {
    this.day = 16;
  }
  daySeventeen() {
    this.day = 17;
  }
  dayEighteen() {
    this.day = 18;
  }
  dayNineteen() {
    this.day = 19;
  }
  dayTwenty() {
    this.day = 20;
  }
  dayTwentyOne() {
    this.day = 21;
  }
  dayTwentyTwo() {
    this.day = 22;
  }
  dayTwentyThree() {
    this.day = 23;
  }
  dayTwentyFour() {
    this.day = 24;
  }
  dayTwentyFive() {
    this.day = 25;
  }
  dayTwentySix() {
    this.day = 26;
  }
  dayTwentySeven() {
    this.day = 27;
  }
  dayTwentyEight() {
    this.day = 28;
  }
  dayTwentyNine() {
    this.day = 29;
  }
  dayThirty() {
    this.day = 30;
  }
  dayThirtyOne() {
    this.day = 31;
  }

  days(d: number) {
    this.day = d;
  }
}