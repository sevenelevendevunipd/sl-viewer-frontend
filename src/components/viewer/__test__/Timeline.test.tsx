import { transformEvents, Timeline } from "../Timeline";
import logs1 from "./logsAddOnOff.json";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../../ThemeSwitcher";

describe("trasformEvents", () => {
  it("event length is 0", () => {
    expect(transformEvents([])).toEqual([[], []]);
  });

  it("last entry in log is ON it should add a fake OFF entry and first entry in log is OFF add a fake ON entry", () => {
    const logs = logs1.log_entries;

    const [TimelineEntries] = transformEvents(logs);
    expect(TimelineEntries.length).toEqual(2);
  });
});

it("Timeline", () => {
  const logs = logs1.log_entries;

  render(
    <ThemeProvider>
      <Timeline logEntries={logs} />
    </ThemeProvider>
  );
  // Check if timeline element exists
  const timeline = screen.getByText("3");
  expect(timeline).toBeInTheDocument();
});
