import { FirmwareFilteringStrategy } from "../FirmwareFilter";
import { LogParserResponse_4dfe1dd_LogFile } from "../../openapi";

import logs from "./logs.json";
type LogFile = LogParserResponse_4dfe1dd_LogFile;

describe("FirmwareFilteringStrategy", () => {
  let firmwareFilteringStrategy: FirmwareFilteringStrategy;
  const logFile: LogFile = logs;

  beforeEach(() => {
    firmwareFilteringStrategy = new FirmwareFilteringStrategy(logFile);
  });

  describe("constructor", () => {
    it("should initialize filterableCodes with unique log entry codes", () => {
      expect(firmwareFilteringStrategy.filterableFirmwares).toEqual([
        "firmware1",
        "firmware2",
        "firmware3",
      ]);
    });

    it("should initialize selectedCodes with all filterableCodes selected", () => {
      expect(firmwareFilteringStrategy.selectedFirmwares).toEqual([
        "firmware1",
        "firmware2",
        "firmware3",
      ]);
    });
  });

  describe("reset", () => {
    it("should select all filterableCodes", () => {
      firmwareFilteringStrategy.reset();
      expect(firmwareFilteringStrategy.selectedFirmwares).toEqual([
        "firmware1",
        "firmware2",
        "firmware3",
      ]);
    });
  });

  describe("selectAll", () => {
    it("should select all filterableCodes if none selected", () => {
      firmwareFilteringStrategy.selectNone();
      firmwareFilteringStrategy.selectAll();

      expect(firmwareFilteringStrategy.selectedFirmwares).toEqual([
        "firmware1",
        "firmware2",
        "firmware3",
      ]);
    });

    it("should unselect all filterableCodes if all selected", () => {
      firmwareFilteringStrategy.selectAll();
      firmwareFilteringStrategy.selectNone();
      expect(firmwareFilteringStrategy.selectedFirmwares).toEqual([]);
    });
  });

  describe("selectNone", () => {
    it("should unselect all filterableCodes", () => {
      firmwareFilteringStrategy.selectNone();
      expect(firmwareFilteringStrategy.selectedFirmwares).toEqual([]);
    });
  });

  describe("setSelection", () => {
    it("should set selectedCodes to the provided selection", () => {
      firmwareFilteringStrategy.setSelection(["firmware1", "firmware3"]);
      expect(firmwareFilteringStrategy.selectedFirmwares).toEqual([
        "firmware1",
        "firmware3",
      ]);
    });
  });
  describe("filter", () => {
    it("should filter", () => {
      const firmwares = ["firmware1", "firmware3"];

      firmwareFilteringStrategy.setSelection(firmwares);
      firmwareFilteringStrategy
        .filter(logFile.log_entries)
        .map((x) => x.ini_filename)
        .forEach((c) => expect(firmwares).toContain(c));
    });
  });
});
