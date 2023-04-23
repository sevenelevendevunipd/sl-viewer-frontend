import { CodeFilteringStrategy } from "../CodeFilter";
import { LogParserResponse_4dfe1dd_LogFile } from "../../openapi";

import logs from "./logs.json";

type LogFile = LogParserResponse_4dfe1dd_LogFile;

describe("CodeFilteringStrategy", () => {
  const logFile: LogFile = logs;
  let codeFilteringStrategy: CodeFilteringStrategy;

  beforeEach(() => {
    codeFilteringStrategy = new CodeFilteringStrategy(logFile);
  });

  describe("constructor", () => {
    it("should initialize filterableCodes with unique log entry codes", () => {
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

  describe("filter", () => {
    it("should filter", () => {
      const codes = ["A", "B"];

      codeFilteringStrategy.setSelection(codes);
      codeFilteringStrategy
        .filter(logFile.log_entries)
        .map((x) => x.code)
        .forEach((c) => expect(codes).toContain(c));
    });
  });
});
