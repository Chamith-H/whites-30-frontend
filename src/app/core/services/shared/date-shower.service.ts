import { Injectable } from "@angular/core";
import * as moment from "moment-timezone";

@Injectable({ providedIn: "root" })
export class DateShower {
  viewDate(): string {
    const timezone = moment.tz.guess(); // Automatically detect the user's timezone
    const currentDate = moment().tz(timezone).format("YYYY-MM-DD");
    return currentDate;
  }
}
