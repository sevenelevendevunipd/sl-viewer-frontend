import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export class EventSubSequenceFilteringStrategy implements LogFilteringStrategy {
  readonly filterableSequence: string[] = [];
  selectedSequence: string[] = [];
  constructor(logFile: LogFile) {
    makeObservable(this, {
      filterableSequence: false,
      selectedSequence: observable,
      filterSet: computed,
      filter: false,
      reset: action.bound,
      selectAll: action.bound,
      selectNone: action.bound,
      setSelection: action,
    });
    this.filterableSequence = [
      ...new Set(logFile.log_entries.map((entry) => entry.code)),
    ].sort();
    this.reset();
  }

  get filterSet() {
    return new Set(this.selectedSequence);
  }
  filter(entries: LogEntry[]) {
    const codeSet = this.filterSet;
    return entries.filter((e) => codeSet.has(e.code));
  }
  reset() {
    this.selectedSequence = [];
  }
  selectAll() {
    this.setSelection(this.filterableSequence);
  }
  selectNone() {
    this.setSelection([]);
  }
  setSelection(selection: string[]) {
    this.selectedSequence = selection;
  }
  patternMatching(entries: LogEntry[], sequence: string[]) {
    let sequence_index = 0;
    const sequence_logs: LogEntry[] = [];
    for (const log of entries) {
      if (log.code === sequence[sequence_index]) {
        sequence_logs.push(log);
        sequence_index++;
        if (sequence_index === sequence.length) {
          return sequence_logs;
        }
      } else {
        sequence_index = 0;
        sequence_logs.length = 0;
      }
    }
    return null;
  }
}
