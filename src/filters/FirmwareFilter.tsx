import {
    LogParserResponse_4dfe1dd_LogEntry,
    LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";
import { action, computed, makeObservable, observable } from "mobx";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export class FirmwareFilteringStrategy implements LogFilteringStrategy {
    readonly filterableFirmwares: string[] = [];
    selectedFirmwares: string[] = [];

    constructor(logFile: LogFile) {
        makeObservable(this, {
            filterableFirmwares: false,
            selectedFirmwares: observable,
            filterSet: computed,
            filter: false,
            reset: action.bound,
            selectAll: action.bound,
            selectNone: action.bound,
            setSelection: action,
        });
        this.filterableFirmwares = [
            ...new Set(logFile.log_entries.map((entry) => entry.ini_filename)),
        ].sort();
        this.reset();
    }
    get filterSet() {
        return new Set(this.selectedFirmwares);
    }
    filter(entries: LogEntry[]) {
        const codeSet = this.filterSet;
        return entries.filter((e) => codeSet.has(e.ini_filename));
    }
    reset() {
        return this.selectAll();
    }
    selectAll() {
        this.selectedFirmwares = [...this.filterableFirmwares];
    }
    selectNone() {
        this.selectedFirmwares = [];
    }
    setSelection(selection: string[]) {
        this.selectedFirmwares = selection;
    }
}
