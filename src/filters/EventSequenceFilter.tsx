import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, makeObservable, observable } from "mobx";
import {
  DataTableRowEditCompleteEvent,
  DataTableRowReorderEvent,
} from "primereact/datatable";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;
type SearchEntry = {
  code: string;
  value: string;
};

function getMs(date: string) {
  return new Date(date).valueOf();
}

export class EventSequenceFilteringStrategy implements LogFilteringStrategy {
  readonly minEvent: string[] = [];
  readonly maxEvent: string[] = [];
  readonly filterableCodes: string[] = [];
  insertingFirst: SearchEntry = { code: "", value: "" };
  insertingLast: SearchEntry = { code: "", value: "" };
  firstValues: SearchEntry[] = [];
  lastValues: SearchEntry[] = [];

  readonly selectedFirst: SearchEntry[] = [];
  readonly selectedLast: SearchEntry[] = [];
  time: number;

  constructor(logFile: LogFile) {
    makeObservable(this, {
      selectedFirst: observable,
      selectedLast: observable,
      filterableCodes: false,
      minEvent: false,
      maxEvent: false,
      time: observable,
      filter: false,
      reset: action.bound,
      firstValues: observable,
      lastValues: observable,
      insertingFirst: observable,
      insertingLast: observable,
      filterSubSequence: false,
      setTime: false,
      getInserting: false,
      addItem: false,
      editItem: false,
      deleteItem: false,
      reorderItems: false,
    });
    this.time = 1000;
    this.filterableCodes = [
      ...new Set(logFile.log_entries.map((entry) => entry.code)),
    ].sort();
  }

  filterSubSequence(
    entries: LogEntry[],
    first: SearchEntry[],
    last: SearchEntry[],
    range: number
  ): LogEntry[] {
    last = last.slice().reverse();

    for (let i = 0; i < entries.length; i++) {
      let startFound = true;
      for (let k = 0; k < first.length && startFound; k++) {
        if (
          entries[i + k].code !== first[k].code ||
          entries[i + k].value !== first[k].value
        ) {
          startFound = false;
        }
      }

      if (startFound) {
        let lastEndI: number | null = null;
        for (
          let j = i + 1;
          j < entries.length &&
          getMs(entries[i].timestamp) - getMs(entries[j].timestamp) <= range;
          j++
        ) {
          let endFound = true;
          for (let k = 0; k < last.length && i < j - k && endFound; k++) {
            if (
              entries[j - k].code !== last[k].code ||
              entries[j - k].value !== last[k].value
            ) {
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
    if (this.firstValues.length === 0 || this.lastValues.length === 0) {
      return entries;
    }
    return this.filterSubSequence(
      entries,
      this.firstValues,
      this.lastValues,
      this.time
    );
  }

  reset() {
    this.firstValues = [];
    this.lastValues = [];
    this.time = 1000;
  }

  setTime(t?: number | null) {
    this.time = t ?? 0;
  }

  getInserting(isFirst: boolean): SearchEntry {
    return isFirst ? this.insertingFirst : this.insertingLast;
  }

  addItem(isFirst: boolean) {
    if (isFirst) {
      this.firstValues = [...this.firstValues, { ...this.insertingFirst }];
      this.insertingFirst = { code: "", value: "" };
    } else {
      this.lastValues = [{ ...this.insertingLast }, ...this.lastValues];
      this.insertingLast = { code: "", value: "" };
    }
  }
  editItem(e: DataTableRowEditCompleteEvent, isFirst: boolean) {
    (isFirst ? this.firstValues : this.lastValues)[e.index] =
      e.newData as SearchEntry;
  }
  reorderItems(e: DataTableRowReorderEvent<SearchEntry[]>, isFirst: boolean) {
    if (isFirst) this.firstValues = e.value;
    else this.lastValues = e.value;
  }
  deleteItem(index: number, isFirst: boolean) {
    if (isFirst) {
      this.firstValues.splice(index, 1);
      this.firstValues = [...this.firstValues];
    } else {
      this.lastValues.splice(index, 1);
      this.lastValues = [...this.lastValues];
    }
  }
}
