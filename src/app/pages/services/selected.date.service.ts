import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
@Injectable()
export class SelectedDateService {
    
    private _dateSourceItem = new BehaviorSubject<string>(sessionStorage.getItem('selectedDate') || moment().format('YYYY-MM-DD'));
    selectedDate = this._dateSourceItem.asObservable();
    constructor() {
    }

    getDate(): Observable<string> {
        return this.selectedDate;
    }

    setNewDate(date: string) {
        const isValid = moment(date).isValid() === false;
        if (!isValid) {
            date = moment(date).format('YYYY-MM-DD');
            sessionStorage.setItem('selectedDate', date);
            this._dateSourceItem.next(date);
            return this.selectedDate;
        } else {
            return null
        }
    }
}
