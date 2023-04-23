import TreeNode from "primereact/treenode";
import { TreeCheckboxSelectionKeys } from "primereact/tree";
import { action, computed, makeObservable, observable } from "mobx";

import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { LogFilteringStrategy } from "../services/LogFilteringService";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

function hashUnitSubUnit(unit: number, subunit: number) {
  return (unit << 4) | subunit;
}

function selectTreeEntry(
  entry: TreeNode,
  selectedEntries: TreeCheckboxSelectionKeys
): void {
  selectedEntries[entry.key!] = { partialChecked: false, checked: true }; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  entry.children?.forEach((child) => selectTreeEntry(child, selectedEntries));
}

function selectAllTreeEntries(entries: TreeNode[]) {
  const selectedEntries: TreeCheckboxSelectionKeys = {};
  entries.forEach((entry) => {
    selectTreeEntry(entry, selectedEntries);
  });
  return selectedEntries;
}

export class SubunitFilteringStrategy implements LogFilteringStrategy {
  readonly subunitTree: TreeNode[] = [];
  selectedSubunits: TreeCheckboxSelectionKeys = {};

  constructor(logFile: LogFile) {
    makeObservable(this, {
      subunitTree: false,
      selectedSubunits: observable,
      filterSet: computed,
      filter: false,
      reset: action.bound,
      selectAll: action.bound,
      selectNone: action.bound,
    });
    this.subunitTree = Object.entries(logFile.units_subunits).map(
      ([unit, value]) => {
        return {
          key: unit,
          label: `Unit ${unit}: ${value.ini_file}`,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          children: Object.entries(value.subunits!).map(([subUnit, name]) => {
            return {
              key: `s${hashUnitSubUnit(parseInt(unit), parseInt(subUnit))}`,
              label: `Unit ${unit} SubUnit ${subUnit}: ${name}`,
            };
          }),
        };
      }
    );
    this.reset();
  }
  get filterSet() {
    return new Set(
      Object.keys(this.selectedSubunits)
        .filter((k) => k.startsWith("s"))
        .map((k) => parseInt(k.substring(1)))
    );
  }
  filter(entries: LogEntry[]) {
    const subunitSet = this.filterSet;
    return entries.filter((e) => subunitSet.has(e.unit_subunit_id));
  }
  reset() {
    this.selectAll();
  }
  selectAll() {
    this.selectedSubunits = selectAllTreeEntries(this.subunitTree);
  }
  selectNone() {
    this.selectedSubunits = {};
  }
}
