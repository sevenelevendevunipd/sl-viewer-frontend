import { CodeFilteringStrategy } from "../CodeFilter";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../../openapi";

describe("CodeFilteringStrategy", () => {
  type LogFile = LogParserResponse_4dfe1dd_LogFile;
  type LogEntry = LogParserResponse_4dfe1dd_LogEntry;
  let codeFilteringStrategy: CodeFilteringStrategy;
  let logFile: LogFile;
  logFile = {
    filename: "test.log",
    pc_datetime: "2021-01-01 00:00:00",
    ups_datetime: "2021-01-01 00:00:00",
    units_subunits: {
      unit1: {
        ini_file: "123456",
      },
    },
    log_entries: [
      {
        timestamp: "2021-01-01 00:00:00",
        unit: 3,
        subunit: 1,
        unit_subunit_id: 1,
        ini_filename: "string",
        code: "A",
        description: "string",
        value: "string",
        type_um: "string",
        snapshot: "string",
        color: "string",
      },
      {
        timestamp: "2021-01-01 00:00:00",
        unit: 3,
        subunit: 1,
        unit_subunit_id: 1,
        ini_filename: "string",
        code: "B",
        description: "string",
        value: "string",
        type_um: "string",
        snapshot: "string",
        color: "string",
      },
      {
        timestamp: "2021-01-01 00:00:00",
        unit: 3,
        subunit: 1,
        unit_subunit_id: 1,
        ini_filename: "string",
        code: "C",
        description: "string",
        value: "string",
        type_um: "string",
        snapshot: "string",
        color: "string",
      },
    ],
  };
  let logEntries: LogEntry[];
  codeFilteringStrategy = new CodeFilteringStrategy(logFile);
  logEntries = logFile.log_entries;
  codeFilteringStrategy.filterableCodes = ["A", "B", "C"];
  beforeEach(() => {
    codeFilteringStrategy.filterableCodes = ["A", "B", "C"];
  });

  describe("constructor", () => {
    it("should initialize filterableCodes with unique log entry codes", () => {
      console.log(codeFilteringStrategy.filterableCodes);
      expect(codeFilteringStrategy.filterableCodes).toEqual(["A", "B", "C"]);
    });

    it("should initialize selectedCodes with all filterableCodes selected", () => {
      expect(codeFilteringStrategy.selectedCodes).toEqual(["A", "B", "C"]);
    });
  });

  describe("reset", () => {
    it("should select all filterableCodes", () => {
      codeFilteringStrategy.reset();
      expect(codeFilteringStrategy.selectedCodes).toEqual(["A", "B", "C"]);
    });
  });

  describe("selectAll", () => {
    it("should select all filterableCodes if none selected", () => {
      codeFilteringStrategy.selectNone();
      codeFilteringStrategy.selectAll();
      expect(codeFilteringStrategy.selectedCodes).toEqual(["A", "B", "C"]);
    });

    it("should unselect all filterableCodes if all selected", () => {
      codeFilteringStrategy.selectAll();
      codeFilteringStrategy.selectNone();
      expect(codeFilteringStrategy.selectedCodes).toEqual([]);
    });
  });

  describe("selectNone", () => {
    it("should unselect all filterableCodes", () => {
      codeFilteringStrategy.selectNone();
      expect(codeFilteringStrategy.selectedCodes).toEqual([]);
    });
  });

  describe("setSelection", () => {
    it("should set selectedCodes to the provided selection", () => {
      codeFilteringStrategy.setSelection(["A", "C"]);
      expect(codeFilteringStrategy.selectedCodes).toEqual(["A", "C"]);
    });
  });
});
