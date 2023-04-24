import { jest } from '@jest/globals';
import { render, screen } from "@testing-library/react";

import { DateTimeFilterUi } from '../DateTimeFilterUI';
import { DateTimeFilteringStrategy } from '../../../filters/DateTimeFilter';

const logFile = {
    filename: "filename",
    pc_datetime: "",
    ups_datetime: "",
    units_subunits: {},
    log_entries: [],
};

it("show calendar inferiore", () => {
    /*const filter = new DateTimeFilteringStrategy(logFile);
    render(DateTimeFilterUi(filter));

    const calendar = screen.getByLabelText("Estremo temporale inferiore");
    calendar.click();
    expect(filter.setSelected).toBeCalled();
    */
});