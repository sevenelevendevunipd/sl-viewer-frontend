import { render, screen } from "@testing-library/react";
import { LogTable } from "../LogTable";
import { LogParserResponse_4dfe1dd_LogFile } from "../../../openapi";
import { LogParserResponse_4dfe1dd_LogEntry } from "../../../openapi";
import LogFilteringService, {
  ILogFilteringService,
  LogFilteringStrategy,
} from "../../../services/LogFilteringService";
import logs from "../../../filters/__test__/logs.json";
import { entries } from "mobx";

const LFS = (entries: LogParserResponse_4dfe1dd_LogEntry[]) =>
  ({
    register: function (filter: LogFilteringStrategy, ui: JSX.Element): void {
      throw new Error("Function not implemented.");
    },
    filteredEntries: entries,
    resetAll: function (): void {
      throw new Error("Function not implemented.");
    },
    setLogFile: function (logFile: LogParserResponse_4dfe1dd_LogFile): void {
      throw new Error("Function not implemented.");
    },
    removeFilters: function (): void {
      throw new Error("Function not implemented.");
    },
    filtersUi: [],
  } as ILogFilteringService);

it("LogTable", () => {
  const lfs = LFS(logs.log_entries);
  render(
    <LogFilteringService logFilteringService={lfs}>
      <LogTable />
    </LogFilteringService>
  );

  logs.log_entries.forEach((entry) => {
    [
      "timestamp",
      "unit",
      "subunit",
      "ini_filename",
      "code",
      "description",
      "value",
    ].forEach((field) => {
      const element = screen.getAllByText(
        new RegExp((entry as any)[field], "i")
      );
      expect(element[0]).toBeInTheDocument();
    });
  });
});
