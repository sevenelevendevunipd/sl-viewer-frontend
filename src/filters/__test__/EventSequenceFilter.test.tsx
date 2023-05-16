import { EventSequenceFilteringStrategy } from "../EventSequenceFilter";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../../openapi";

import logs from "./logs.json";
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;
type LogFile = LogParserResponse_4dfe1dd_LogFile;
type SearchEntry = {
  code: string;
  value: string;
};

describe("EventSequenceFilteringStrategy", () => {
  const logFile: LogFile = logs;
  const logEntries: LogEntry[] = logFile.log_entries;
  let eventSequenceFilteringStrategy: EventSequenceFilteringStrategy;
  const firstValues: SearchEntry[] = [
    // { code: "A", value: "ON" },
    { code: "B", value: "OFF" },
  ];
  const lastValues: SearchEntry[] = [
    { code: "C", value: "ON" },
    // { code: "D", value: "ON" },
  ];
  beforeEach(() => {
    eventSequenceFilteringStrategy = new EventSequenceFilteringStrategy(
      logFile
    );
  });
  describe("constructor", () => {
    it("should initialize filterableCodes with unique log entry codes", () => {
      expect(eventSequenceFilteringStrategy.filterableCodes).toEqual([
        "A",
        "B",
        "C",
      ]);
    });

    it("should initialize selectedCodes with all filterableCodes selected", () => {
      expect(eventSequenceFilteringStrategy.time).toEqual(1000);
    });
  });
  describe("filterSubsequence", () => {
    it("should return an array of log entries that contain the subsequence", () => {
      const a: LogEntry[] = eventSequenceFilteringStrategy.filterSubSequence(
        logEntries,
        firstValues,
        lastValues,
        90000000
      );
      expect(a).toEqual([
        {
          timestamp: "2021-01-02T00:00:00.000000",
          unit: 3,
          subunit: 1,
          unit_subunit_id: 1,
          ini_filename: "firmware2",
          code: "B",
          description: "string",
          value: "OFF",
          type_um: "string",
          snapshot: "string",
          color: "string",
        },
        {
          timestamp: "2021-01-01T01:00:00.000000",
          unit: 3,
          subunit: 1,
          unit_subunit_id: 1,
          ini_filename: "firmware3",
          code: "C",
          description: "string",
          value: "ON",
          type_um: "string",
          snapshot: "string",
          color: "string",
        },
      ]);
    });
  });
  describe("filter", () => {
    it("should return all entries if nothing selected", () => {
      const a: LogEntry[] = eventSequenceFilteringStrategy.filter(logEntries);
      expect(a).toEqual([
        {
          timestamp: "2021-01-16T00:00:00.000000",
          unit: 3,
          subunit: 1,
          unit_subunit_id: 1,
          ini_filename: "firmware1",
          code: "A",
          description: "string",
          value: "ON",
          type_um: "string",
          snapshot: "string",
          color: "string",
        },
        {
          timestamp: "2021-01-02T00:00:00.000000",
          unit: 3,
          subunit: 1,
          unit_subunit_id: 1,
          ini_filename: "firmware2",
          code: "B",
          description: "string",
          value: "OFF",
          type_um: "string",
          snapshot: "string",
          color: "string",
        },
        {
          timestamp: "2021-01-01T01:00:00.000000",
          unit: 3,
          subunit: 1,
          unit_subunit_id: 1,
          ini_filename: "firmware3",
          code: "C",
          description: "string",
          value: "ON",
          type_um: "string",
          snapshot: "string",
          color: "string",
        },
      ]);
    });
    it("should return empty array if no entries match", () => {
      eventSequenceFilteringStrategy.firstValues = [
        { code: "A", value: "OFF" },
      ];
      eventSequenceFilteringStrategy.lastValues = [{ code: "C", value: "OFF" }];
      eventSequenceFilteringStrategy.time = 90000000;
      const a: LogEntry[] = eventSequenceFilteringStrategy.filter(logEntries);
      expect(a).toEqual([]);
    });
    it("should return entries with first and last selected", () => {
      eventSequenceFilteringStrategy.firstValues = firstValues;
      eventSequenceFilteringStrategy.lastValues = lastValues;
      eventSequenceFilteringStrategy.time = 90000000;
      const a: LogEntry[] = eventSequenceFilteringStrategy.filter(logEntries);
      expect(a).toEqual([
        {
          timestamp: "2021-01-02T00:00:00.000000",
          unit: 3,
          subunit: 1,
          unit_subunit_id: 1,
          ini_filename: "firmware2",
          code: "B",
          description: "string",
          value: "OFF",
          type_um: "string",
          snapshot: "string",
          color: "string",
        },
        {
          timestamp: "2021-01-01T01:00:00.000000",
          unit: 3,
          subunit: 1,
          unit_subunit_id: 1,
          ini_filename: "firmware3",
          code: "C",
          description: "string",
          value: "ON",
          type_um: "string",
          snapshot: "string",
          color: "string",
        },
      ]);
    });
  });
  describe("reset", () => {
    it("should reset the filter", () => {
      eventSequenceFilteringStrategy.reset();
      expect(eventSequenceFilteringStrategy.firstValues).toEqual([]);
      expect(eventSequenceFilteringStrategy.lastValues).toEqual([]);
      expect(eventSequenceFilteringStrategy.time).toEqual(1000);
    });
  });
  describe("set Time", () => {
    it("should set the time", () => {
      eventSequenceFilteringStrategy.setTime(100);
      expect(eventSequenceFilteringStrategy.time).toEqual(100);
    });
  });
  describe("get Inserting", () => {
    it("should return insertingFirst if true", () => {
      eventSequenceFilteringStrategy.insertingFirst = {
        code: "A",
        value: "ON",
      };
      eventSequenceFilteringStrategy.insertingLast = {
        code: "B",
        value: "OFF",
      };
      expect(eventSequenceFilteringStrategy.getInserting(true)).toEqual({
        code: "A",
        value: "ON",
      });
    });
  });
  describe("add item", () => {
    it("should add item to firstValues", () => {
      const toinsert = {
        code: "A",
        value: "ON",
      };
      eventSequenceFilteringStrategy.insertingFirst = toinsert;
      eventSequenceFilteringStrategy.addItem(true);
      expect(eventSequenceFilteringStrategy.firstValues.at(-1)).toEqual(
        toinsert
      );
    });
    it("should add item to lastValues", () => {
      const toinsert = {
        code: "A",
        value: "ON",
      };
      eventSequenceFilteringStrategy.insertingLast = toinsert;
      eventSequenceFilteringStrategy.addItem(false);
      expect(eventSequenceFilteringStrategy.lastValues.at(-1)).toEqual(
        toinsert
      );
    });
  });
  describe("edit item", () => {
    it("should edit item to firstValues", () => {
      const e = { index: 0, newData: { code: "B", value: "OFF" } };
      eventSequenceFilteringStrategy.firstValues = firstValues;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventSequenceFilteringStrategy.editItem(e as any, true);
      expect(eventSequenceFilteringStrategy.firstValues[e.index]).toEqual(
        e.newData
      );
    });
  });
  describe("reorder", () => {
    it("should reorder firstValues", () => {
      eventSequenceFilteringStrategy.firstValues = [
        { code: "A", value: "ON" },
        { code: "B", value: "OFF" },
      ];
      eventSequenceFilteringStrategy.lastValues = [
        { code: "C", value: "ON" },
        { code: "D", value: "ON" },
      ];
      const e = {
        value: [
          firstValues.at(-1),
          ...firstValues.slice(1, -1),
          firstValues.at(0),
        ],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventSequenceFilteringStrategy.reorderItems(e as any, true);
      expect(eventSequenceFilteringStrategy.firstValues).toEqual(e.value);
    });
    it("should reorder lastValues", () => {
      eventSequenceFilteringStrategy.firstValues = [
        { code: "A", value: "ON" },
        { code: "B", value: "OFF" },
      ];
      eventSequenceFilteringStrategy.lastValues = [
        { code: "C", value: "ON" },
        { code: "D", value: "ON" },
      ];
      const e = {
        value: [
          lastValues.at(-1),
          ...lastValues.slice(1, -1),
          lastValues.at(0),
        ],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventSequenceFilteringStrategy.reorderItems(e as any, false);
      expect(eventSequenceFilteringStrategy.lastValues).toEqual(e.value);
    });
  });
  describe("delete item", () => {
    it("should delete item from firstValues", () => {
      eventSequenceFilteringStrategy.firstValues = [
        { code: "A", value: "ON" },
        { code: "B", value: "OFF" },
      ];
      eventSequenceFilteringStrategy.lastValues = [
        { code: "C", value: "ON" },
        { code: "D", value: "ON" },
      ];
      eventSequenceFilteringStrategy.deleteItem(0, true);
      expect(eventSequenceFilteringStrategy.firstValues).toEqual([
        { code: "B", value: "OFF" },
      ]);
    });
    it("should delete item from lastValues", () => {
      eventSequenceFilteringStrategy.firstValues = [
        { code: "A", value: "ON" },
        { code: "B", value: "OFF" },
      ];
      eventSequenceFilteringStrategy.lastValues = [
        { code: "C", value: "ON" },
        { code: "D", value: "ON" },
      ];
      eventSequenceFilteringStrategy.deleteItem(0, false);
      expect(eventSequenceFilteringStrategy.lastValues).toEqual([
        { code: "D", value: "ON" },
      ]);
    });
  });
});
