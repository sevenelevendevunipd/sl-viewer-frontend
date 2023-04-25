import { describe, expect, test, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { EventSequenceFilterUi } from "../EventSequenceFilterUi";

import { EventSequenceFilteringStrategy } from "../../../filters/EventSequenceFilter";
jest.mock("../../../filters/EventSequenceFilter");
import logs from "../../../filters/__test__/logs.json";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../../../openapi";
type LogFile = LogParserResponse_4dfe1dd_LogFile;
const logFile: LogFile = logs;

describe("EventSequenceFilterUi", () => {
  let filter: EventSequenceFilteringStrategy;

  beforeEach(() => {
    filter = new EventSequenceFilteringStrategy(logFile);
    render(EventSequenceFilterUi(filter));
  });

  it("Add calls addItem", () => {
    const buttons = screen.getAllByText(/Add/i);
    for (const b of buttons) {
      b.click();
    }
    expect(filter.addItem).toBeCalledTimes(buttons.length);
  });
  it("Table exist EventSequenceFilterUi", () => {
    const table = screen.getByRole("table");
  });
});
