import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export class EventSubSequenceFilteringStrategy implements LogFilteringStrategy {
  readonly filterableCodes: string[] = [];
  subSequence: string[] | null = null;

  constructor(logFile: LogFile) {
    makeObservable(this, {
      filterableCodes: false,
      subSequence: observable,
      filter: false,
      reset: action.bound,
      setSelection: action,
    });
    this.filterableCodes = [
      ...new Set(logFile.log_entries.map((entry) => entry.code)),
    ].sort();
    this.reset();
  }
  filter(entries: LogEntry[]) {
    if (!this.subSequence) return entries;

    let sequence_index = 0;
    const sequence_logs: LogEntry[] = [];
    for (const log of entries) {
      if (log.code === this.subSequence[sequence_index]) {
        sequence_logs.push(log);
        sequence_index++;
        if (sequence_index === this.subSequence.length) {
          return sequence_logs;
        }
      } else {
        sequence_index = 0;
        sequence_logs.length = 0;
      }
    }
    return [];
  }
  reset() {
    this.subSequence = null;
  }

  setSelection(selection?: string[] | null) {
    this.subSequence = !selection || selection.length === 0 ? null : selection;
  }
}
