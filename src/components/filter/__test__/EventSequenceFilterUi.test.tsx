import { describe, expect, test, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
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

  it("Take input on code EventSequenceFilterUi", () => {
    const codeInputs = screen.getAllByPlaceholderText("Code");
    const codeValues = screen.getAllByPlaceholderText("Value");
    const buttons = screen.getAllByText(/Add/i);
    console.log(buttons.length);
    codeInputs[0].onchange = jest.fn();
    expect(codeInputs.length).toBe(buttons.length);
    expect(codeValues.length).toBe(buttons.length);

    filter.getInserting = jest.fn();

    for (const i of codeInputs) user.type(i, "C");
    for (const i of codeValues) user.type(i, "V");
    for (const b of buttons) b.click();
    expect(filter.addItem).toBeCalledTimes(buttons.length);

    // expect(filter.getInserting(true)).toBeCalled(buttons.length);
  });
});
