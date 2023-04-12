import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;
type SearchEntry = {
  code: string;
  value: string;
};
export class EventSequenceFilteringStrategy implements LogFilteringStrategy {
  readonly minEvent: string[];
  readonly maxEvent: string[];
  firstEvent: string[] = []; //[0]: code [1]: value
  lastEvent: string[] = [];
  time: number;

  constructor(logFile: LogFile) {
    makeObservable(this, {
      minEvent: false,
      maxEvent: false,
      firstEvent: observable,
      lastEvent: observable,
      time: observable,
      filter: false,
      reset: action.bound,
    });
    this.minEvent = [
      logFile.log_entries[logFile.log_entries.length - 1].code,
      logFile.log_entries[logFile.log_entries.length - 1].value,
    ];
    this.maxEvent = [logFile.log_entries[0].code, logFile.log_entries[0].value];
    // this.firstEvent = structuredClone(this.minEvent);
    // this.lastEvent = structuredClone(this.maxEvent);
    this.time = Number.MAX_VALUE;
  }

  filterSubSequence(entries: LogEntry[], first: SearchEntry[], last: SearchEntry[], range: number): LogEntry[] {
    last = last.reverse();

    for (let i = 0; i < entries.length; i++) {
      let startFound = true;
      for (let k = 0; k < first.length && startFound; k++) {
        if (entries[i + k].code !== first[k].code || entries[i + k].value !== first[k].value) {
          startFound = false;
        }
      }

      if (startFound) {
        let lastEndI: number | null = null;
        for (let j = i + 1; j < entries.length && new Date(entries[j].timestamp).valueOf() <= new Date(entries[i].timestamp).valueOf() + range; j++) {
          let endFound = true;
          for (let k = 0; k < last.length && i < j - k && endFound; k++) {
            if (entries[j - k].code !== last[k].code || entries[j - k].value !== last[k].value) {
              endFound = false;
            }
          }
          if (endFound) {
            lastEndI = j;
          }
        }
        if (lastEndI !== null) {
          return entries.slice(i, lastEndI + 1);
        }
      }
    }
    return [];
  }

  filter(entries: LogEntry[]): LogEntry[] {
    if (this.firstEvent.length < 2 || this.lastEvent.length < 2) {
      return entries;
    }
    const first = [{ code: this.firstEvent[0], value: this.firstEvent[1] }];
    const last = [{ code: this.lastEvent[0], value: this.lastEvent[1] }];

    console.log("OR  length: " + entries.length);
    const res = this.filterSubSequence(entries, first, last, this.time);
    console.log("RES length: " + res.length);
    return res;
  }

  reset() {
    this.firstEvent = [];
    this.lastEvent = [];
    this.time = Number.MAX_VALUE;
  }
}
