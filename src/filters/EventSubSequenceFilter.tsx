import { useState, Dispatch, SetStateAction } from "react";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, entries, makeObservable, observable } from "mobx";
import { DataTableRowEditCompleteEvent, DataTableRowReorderEvent } from 'primereact/datatable';

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;
type SearchEntry = {
  code: string;
  value: string;
};
export class EventSequenceFilteringStrategy implements LogFilteringStrategy {

  readonly FIRST = 0;
  readonly LAST = 1;

  readonly minEvent: string[] = [];
  readonly maxEvent: string[] = [];
  readonly filterableCodes: string[] = [];
  insertingFirst: SearchEntry = { code: '', value: '' };
  insertingLast: SearchEntry = { code: '', value: '' };
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
    });
    this.time = 1000;
    this.filterableCodes = [ ...new Set(logFile.log_entries.map((entry) => entry.code)) ].sort();

    // this.minEvent = [
    //   logFile.log_entries[logFile.log_entries.length - 1].code,
    //   logFile.log_entries[logFile.log_entries.length - 1].value,
    // ];
    // this.maxEvent = [logFile.log_entries[0].code, logFile.log_entries[0].value];
    // this.firstEvent = structuredClone(this.minEvent);
    // this.lastEvent = structuredClone(this.maxEvent);
    // this.lastValues = this.getsecondValue(logFile.log_entries);
    // this.firstValues = this.getfirstValue(logFile.log_entries);
  }

  private getMs(date: string) {
    return new Date(date).valueOf();
  }

  search() {}

  filterSubSequence(entries: LogEntry[], first: SearchEntry[], last: SearchEntry[], range: number): LogEntry[] {
    last = last.slice().reverse();

    for (let i = 0; i < entries.length; i++) {
      let startFound = true;
      for (let k = 0; k < first.length && startFound; k++) {
        if (entries[i + k].code !== first[k].code || entries[i + k].value !== first[k].value) {
          startFound = false;
        }
      }

      if (startFound) {
        let lastEndI: number | null = null;
        for (let j = i + 1; j < entries.length && this.getMs(entries[i].timestamp) - this.getMs(entries[j].timestamp) <= range; j++) {
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
    if (this.firstValues.length <= 0 || this.lastValues.length <= 0) {
      return entries;
    }
    return this.filterSubSequence(entries, this.firstValues, this.lastValues, this.time);
  }

  reset() {
    this.firstValues = [];
    this.lastValues = [];
    this.time = Number.MAX_VALUE;
  }

  getInserting(firstLast: number): SearchEntry {
    return firstLast === this.FIRST ? this.insertingFirst : this.insertingLast;
  }

  addItem(firstLast: number) {
    if (firstLast === this.FIRST) {
      this.firstValues = [ ...this.firstValues, { ...this.insertingFirst } ];
      this.insertingFirst = { code: "", value: "" };
    } else {
      this.lastValues = [ { ...this.insertingLast },...this.lastValues ];
      this.insertingLast = { code: "", value: "" };
    }
  }
  editItem(e: DataTableRowEditCompleteEvent, firstLast: number) {
    (firstLast === this.FIRST ? this.firstValues : this.lastValues)[e.index] = e.newData as SearchEntry;
    
  }
  reorderItems(e: DataTableRowReorderEvent<SearchEntry[]>, firstLast: number) {
    if (firstLast === this.FIRST) this.firstValues = e.value;
    else this.lastValues = e.value;
  }
  deleteItem(index: number, firstLast: number) {
    if (firstLast === this.FIRST) {
      this.firstValues.splice(index, 1);
      this.firstValues = [...this.firstValues];
    } else {
      this.lastValues.splice(index, 1);
      this.lastValues = [...this.lastValues];
    }
  }

}
