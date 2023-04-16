import { DateTimeFilteringStrategy } from "../DateTimeFilter";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../../openapi";
import "core-js/stable/structured-clone";
import logs from "./logs.json";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

describe("DateTimeFilteringStrategy", () => {
  const logFile: LogFile = logs;
  const logEntries: LogEntry[] = logFile.log_entries;
  let dateTimeFilteringStrategy: DateTimeFilteringStrategy;

  beforeEach(() => {
    dateTimeFilteringStrategy = new DateTimeFilteringStrategy(logFile);
  });

  describe("constructor", () => {
    it("should initialize minTimestamp with minime log entry timestamp", () => {
      expect(dateTimeFilteringStrategy.minTimestamp).toEqual(
        new Date(logEntries[logEntries.length - 1].timestamp)
      );
    });

    it("should initialize maxTimestamp with maxime log entry timestamp", () => {
      expect(dateTimeFilteringStrategy.maxTimestamp).toEqual(
        new Date(logEntries[0].timestamp)
      );
    });
    it("should initialize minSelectedTimestamp with minTimestamp", () => {
      expect(dateTimeFilteringStrategy.minSelectedTimestamp).toEqual(
        dateTimeFilteringStrategy.minTimestamp
      );
    });
    it("should initialize maxSelectedTimestamp with maxTimestamp", () => {
      expect(dateTimeFilteringStrategy.maxSelectedTimestamp).toEqual(
        dateTimeFilteringStrategy.maxTimestamp
      );
    });
  });

  describe("reset", () => {
    it("should select all logs", () => {
      dateTimeFilteringStrategy.reset();
      expect(dateTimeFilteringStrategy.minSelectedTimestamp).toEqual(
        dateTimeFilteringStrategy.minTimestamp
      );
      expect(dateTimeFilteringStrategy.maxSelectedTimestamp).toEqual(
        dateTimeFilteringStrategy.maxTimestamp
      );
    });
  });

  describe("setSelected", () => {
    it("should select min and max by paramaters", () => {
      dateTimeFilteringStrategy.setSelected(
        new Date("2023-04-16"),
        new Date("2023-04-17")
      );
      expect(dateTimeFilteringStrategy.minSelectedTimestamp).toEqual(
        new Date("2023-04-16")
      );
      expect(dateTimeFilteringStrategy.maxSelectedTimestamp).toEqual(
        new Date("2023-04-17")
      );
    });
  });
  describe("filter", () => {
    it("should select all min and max by paramaters", () => {
      dateTimeFilteringStrategy.minSelectedTimestamp = new Date("2021-01-01");
      dateTimeFilteringStrategy.maxSelectedTimestamp = new Date("2021-01-04");

      expect(dateTimeFilteringStrategy.filter(logEntries)).toEqual(
        logEntries.slice(1, 3)
      );
    });
  });
});
