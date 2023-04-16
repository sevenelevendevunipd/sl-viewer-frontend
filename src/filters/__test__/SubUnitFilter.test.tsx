import { SubunitFilteringStrategy } from "../SubunitFilter";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../../openapi";

import logs from "./logssub.json";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;
const expected = [
  {
    key: "0",
    label: "Unit 0: MAPK_Unit_v2_04_00.ini",
    children: [
      { key: "s0", label: "Unit 0 SubUnit 0: MAPK_Unit_v2_04_00.ini" },
    ],
  },
  {
    key: "1",
    label: "Unit 1: MAPK_Unit_v2_04_00.ini",
    children: [
      { key: "s16", label: "Unit 1 SubUnit 0: MAPK_Unit_v2_04_00.ini" },
      {
        key: "s17",
        label: "Unit 1 SubUnit 1: MAPK_Module_RD_IV_v2_04_00.ini",
      },
      {
        key: "s30",
        label: "Unit 1 SubUnit 14: MAPK_ByPass_v2_04_00.ini",
      },
    ],
  },
];
describe("subunitFilteringStrategy", () => {
  const logFile: LogFile = logs;
  const logEntries: LogEntry[] = logFile.log_entries;
  let subunitFilteringStrategy: SubunitFilteringStrategy;

  beforeEach(() => {
    subunitFilteringStrategy = new SubunitFilteringStrategy(logFile);
  });

  describe("constructor", () => {
    it("should initialize filterableCodes with unique log entry codes", () => {
      expect(subunitFilteringStrategy.subunitTree).toEqual(expected);
    });
  });

  describe("reset", () => {
    it("should select all filterableCodes", () => {
      subunitFilteringStrategy.reset();

      const checks = Object.keys(subunitFilteringStrategy.selectedSubunits).map(
        (c) => subunitFilteringStrategy.selectedSubunits[c]
      );
      expect(checks.length).toBe(6);
      expect(checks.every((x) => x.checked)).toBe(true);
      expect(checks.every((x) => x.partialChecked)).toBe(false);
    });
  });

  describe("selectAll", () => {
    it("should select all filterableCodes", () => {
      subunitFilteringStrategy.selectAll();

      const checks = Object.keys(subunitFilteringStrategy.selectedSubunits).map(
        (c) => subunitFilteringStrategy.selectedSubunits[c]
      );
      expect(checks.length).toBe(6);
      expect(checks.every((x) => x.checked)).toBe(true);
      expect(checks.every((x) => x.partialChecked)).toBe(false);
    });
  });

  describe("selectNone", () => {
    it("should select none filterableCodes", () => {
      subunitFilteringStrategy.selectNone();
      expect(subunitFilteringStrategy.selectedSubunits).toEqual({});
    });
  });

  describe("filter", () => {
    it("should filter", () => {
      const filter = {
        "0": { partialChecked: false, checked: false },
        "1": { partialChecked: true, checked: false },
        s16: { partialChecked: false, checked: true },
        s30: { partialChecked: false, checked: true },
      };
      subunitFilteringStrategy.selectedSubunits = filter;

      const res = subunitFilteringStrategy
        .filter(logs.log_entries)
        .map((r) => r.unit_subunit_id);
      expect(new Set(res)).toEqual(new Set([16, 30]));
    });
  });
});
