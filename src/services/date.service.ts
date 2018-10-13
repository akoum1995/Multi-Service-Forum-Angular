import { DatePipe } from '@angular/common';
class DateService {

  constructor(private datePipe: DatePipe) {}

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy/MM/dd');
  }
}