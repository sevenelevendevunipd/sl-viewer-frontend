import { render, screen } from "@testing-library/react";
import { DateTimeFilterUi } from '../DateTimeFilterUI';
import { DateTimeFilteringStrategy } from '../../../filters/DateTimeFilter';
import { LogParserResponse_4dfe1dd_LogFile } from "../../../openapi";


import logs from '../../../filters/__test__/logs.json'

type LogFile = LogParserResponse_4dfe1dd_LogFile;



it("show calendar inferiore", () => {
    const logFile: LogFile = logs;

    const filter = new DateTimeFilteringStrategy(logFile);
    render(DateTimeFilterUi(filter));

    const calendarLabel = screen.getByText(/start/i)
    
    expect(calendarLabel).toBeInTheDocument();
    expect(calendarLabel.nextSibling).toHaveClass("p-calendar");
});

it("show calendar superiore", () => {
    const logFile: LogFile = logs;

    const filter = new DateTimeFilteringStrategy(logFile);
    render(DateTimeFilterUi(filter));

    const calendarLabel = screen.getByText(/end/i);
    
    expect(calendarLabel).toBeInTheDocument();
    expect(calendarLabel.nextSibling).toHaveClass("p-calendar");
});