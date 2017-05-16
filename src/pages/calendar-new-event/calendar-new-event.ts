import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarData } from '../../providers/calendar-data';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from '../../providers/profile-data';
import { EventProvider } from '../../providers/events';

@Component({
  selector: 'page-calendar-new-event',
  templateUrl: 'calendar-new-event.html'
})
export class CalendarNewEventPage {
  public eventForm;
  public radioForm;
  public userProfile: any;
  birthDate: string;
  public helperList: Array<any>;

  day: any;
  month: any;
  year = 2017;
  isUserCoordinator: any;
    userIsCoordinator: boolean;


  constructor(public navCtrl: NavController, public calendarData: CalendarData, public formBuilder: FormBuilder,
    public profileData: ProfileData, public navParams: NavParams, public eventProvider: EventProvider) {


    this.eventForm = this.formBuilder.group({
      'start': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'end': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'note': ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });

    this.radioForm = this.formBuilder.group({
      'assign': ['', Validators.compose([Validators.minLength(1), Validators.required])]
    });

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.userIsCoordinator = this.userProfile.userIsCoordinator;
    });

    this.day = navParams.get("day");
    this.month = navParams.get("month");

  }

  isValid(field: string) {
    let formField = this.eventForm.get(field);
    return formField.valid || formField.pristine;
  }

  updateNote() {
    this.isUserCoordinator = this.userIsCoordinator;
    console.log(this.radioForm.assign);

    if (this.eventForm.start < this.eventForm.end) {
    this.calendarData.newCalendarEvent(this.day, this.month, this.eventForm.start, this.eventForm.end, this.eventForm.note, this.isUserCoordinator, this.userProfile.fullName, this.radioForm.assign).then(() => {
      alert("added to firebase")
      this.navCtrl.pop();
    });
    } else {
      alert("Start time must be before end time")
    }
  }

  ionViewDidEnter() {
    this.eventProvider.getUserList(this.userProfile.userId).then(eventListSnap => {
      this.helperList = eventListSnap;
    });
  }
  
}
