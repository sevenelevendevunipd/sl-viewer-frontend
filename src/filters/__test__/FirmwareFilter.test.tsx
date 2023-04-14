import { FirmwareFilteringStrategy } from "../FirmwareFilter";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../../openapi";

describe("FirmwareFilteringStrategy", () => {
  type LogFile = LogParserResponse_4dfe1dd_LogFile;
  type LogEntry = LogParserResponse_4dfe1dd_LogEntry;
  let firmwareFilteringStrategy: FirmwareFilteringStrategy;
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
        ini_filename: "firmware1",
        code: "code1",
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
        ini_filename: "firmware2",
        code: "code2",
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
        ini_filename: "firmware3",
        code: "code3",
        description: "string",
        value: "string",
        type_um: "string",
        snapshot: "string",
        color: "string",
      },
    ],
  };
  let logEntries: LogEntry[];
  firmwareFilteringStrategy = new FirmwareFilteringStrategy(logFile);
  logEntries = logFile.log_entries;
  firmwareFilteringStrategy.filterableFirmwares = [
    "firmware1",
    "firmware2",
    "firmware3",
  ];
  beforeEach(() => {
    firmwareFilteringStrategy.filterableFirmwares = [
      "firmware1",
      "firmware2",
      "firmware3",
    ];
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
});
