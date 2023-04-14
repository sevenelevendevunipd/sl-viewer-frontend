import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export class CodeFilteringStrategy implements LogFilteringStrategy {
  filterableCodes: string[] = [];
  selectedCodes: string[] = [];

  constructor(logFile: LogFile) {
    makeObservable(this, {
      filterableCodes: false,
      selectedCodes: observable,
      filterSet: computed,
      filter: false,
      reset: action.bound,
      selectAll: action.bound,
      selectNone: action.bound,
      setSelection: action,
    });
    this.filterableCodes = [
      ...new Set(logFile.log_entries.map((entry) => entry.code)),
    ].sort();
    this.reset();
  }
  get filterSet() {
    return new Set(this.selectedCodes);
  }
  filter(entries: LogEntry[]) {
    const codeSet = this.filterSet;
    return entries.filter((e) => codeSet.has(e.code));
  }
  reset() {
    return this.selectAll();
  }
  selectAll() {
    this.selectedCodes = [...this.filterableCodes];
  }
  selectNone() {
    this.selectedCodes = [];
  }
  setSelection(selection: string[]) {
    this.selectedCodes = selection;
  }
}
