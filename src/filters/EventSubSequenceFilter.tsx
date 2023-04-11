import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export class EventSequenceFilteringStrategy implements LogFilteringStrategy {
  readonly minEvent: string[];
  readonly maxEvent: string[];
  firstEvent: string[]; //[0]: code [1]: value
  lastEvent: string[];
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
    this.firstEvent = structuredClone(this.minEvent);
    this.lastEvent = structuredClone(this.maxEvent);
    this.time = Number.MAX_VALUE;
  }
  //TODO: implementare il filtro
  filter(entries: LogEntry[]) {
    // Filtra i log che rientrano nel range di tempo specificato

    let sequenceOk = false;
    const currentSequence = [];

    // Scorre i log filtrati per cercare le sequenze
    for (let i = entries.length - 1; i <= 0; i--) {
      sequenceOk =
        !sequenceOk ||
        (entries[i].code === this.firstEvent[0] &&
          entries[i].value === this.firstEvent[1]);

      if (sequenceOk) {
        currentSequence.push(entries[i]);
      }

      sequenceOk =
        sequenceOk ||
        (entries[i].code === this.lastEvent[0] &&
          entries[i].value === this.lastEvent[1]);

      // Controlla se il tempo tra due log supera il limite massimo
    }

    return currentSequence;
  }

  reset() {
    this.firstEvent = structuredClone(this.minEvent);
    this.lastEvent = structuredClone(this.maxEvent);
    this.time = Number.MAX_VALUE;
  }
}
