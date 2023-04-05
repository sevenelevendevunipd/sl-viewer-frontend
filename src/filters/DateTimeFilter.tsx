import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export class DateTimeFilteringStrategy implements LogFilteringStrategy {
  readonly minTimestamp: Date;
  readonly maxTimestamp: Date;
  minSelectedTimestamp: Date;
  maxSelectedTimestamp: Date;


  constructor(logFile: LogFile) {
    makeObservable(this, {
      minTimestamp: false,
      maxTimestamp: false,
      minSelectedTimestamp: observable,
      maxSelectedTimestamp: observable,
      filter: false,
      reset: action.bound,
    });
    this.minTimestamp= new Date(logFile.log_entries[logFile.log_entries.length-1].timestamp);
    this.maxTimestamp= new Date(logFile.log_entries[0].timestamp);
    this.minSelectedTimestamp= this.minTimestamp;
    this.maxSelectedTimestamp= this.maxTimestamp;
  }

  filter(entries: LogEntry[]) {
    /*return entries.filter((e) => {
      const timestamp: Date = new Date(e.timestamp);
      return timestamp >= this.minSelectedTimestamp && timestamp <= this.maxSelectedTimestamp;
    });*/
    //funzione più efficiente
    let i;
    for(i=0; i<entries.length; i++) {
      const timestamp = new Date(entries[i].timestamp);
      if(timestamp <= this.maxSelectedTimestamp) {
        break;
      }
    }
    let j;
    for(j=entries.length; j>0; j--) {
      const timestamp = new Date(entries[j-1].timestamp);
      if(timestamp >= this.minSelectedTimestamp) {
        break;
      }
    }
    console.log(i, j);
    console.log(entries[i].timestamp, entries[j-1].timestamp);
    return entries.slice(i, j);
  }

  reset() {
    this.minSelectedTimestamp= this.minTimestamp;
    this.maxSelectedTimestamp= this.maxTimestamp;
  }
}
