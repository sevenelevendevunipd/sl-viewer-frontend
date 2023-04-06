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
      setSelected: action.bound,
      reset: action.bound,
    });
    this.minTimestamp = new Date(
      logFile.log_entries[logFile.log_entries.length - 1].timestamp
    );
    this.maxTimestamp = new Date(logFile.log_entries[0].timestamp);
    this.minSelectedTimestamp = structuredClone(this.minTimestamp);
    this.maxSelectedTimestamp = structuredClone(this.maxTimestamp);
  }

  filter(entries: LogEntry[]) {
    /*return entries.filter((e) => {
      const timestamp: Date = new Date(e.timestamp);
      return timestamp >= this.minSelectedTimestamp && timestamp <= this.maxSelectedTimestamp;
    });*/
    //funzione più efficiente
    /*let i;
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
    return entries.slice(i, j);*/

    const start = entries.findIndex(
      (e) => new Date(e.timestamp) <= this.maxSelectedTimestamp
    );
    const end =
      entries.findLastIndex(
        (e) => new Date(e.timestamp) >= this.minSelectedTimestamp
      ) + 1;
    return entries.slice(start, end);
  }

  setSelected(min: Date, max: Date) {
    this.minSelectedTimestamp = structuredClone(min);
    this.maxSelectedTimestamp = structuredClone(max);
  }

  reset() {
    this.minSelectedTimestamp = structuredClone(this.minTimestamp);
    this.maxSelectedTimestamp = structuredClone(this.maxTimestamp);
  }
}
