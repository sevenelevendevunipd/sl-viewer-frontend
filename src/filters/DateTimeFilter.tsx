import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export class DateTimeFilteringStrategy implements LogFilteringStrategy {
  readonly filterableDateTimes: string[] = [];
  selectedDateTimes: string[] = [];

  constructor(logFile: LogFile) {
    makeObservable(this, {
      filterableDateTimes: false,
      selectedDateTimes: observable,
      filterSet: computed,
      filter: false,
      reset: action.bound,
      selectAll: action.bound,
      selectNone: action.bound,
      setSelection: action,
    });
    this.filterableDateTimes = [
      ...new Set(logFile.log_entries.map((entry) => entry.timestamp)),
    ].sort();
    this.reset();
  }

  get filterSet() {
    return new Set(this.selectedDateTimes);
  }

  filter(entries: LogEntry[]) {
    const dateTimeSet = this.filterSet;
    return entries.filter((e) => dateTimeSet.has(e.timestamp));
  }

  reset() {
    return this.selectAll();
  }

  selectAll() {
    this.selectedDateTimes = [...this.filterableDateTimes];
  }

  selectNone() {
    this.selectedDateTimes = [];
  }

  setSelection(selection: string[]) {
    this.selectedDateTimes = selection;
  }
}
