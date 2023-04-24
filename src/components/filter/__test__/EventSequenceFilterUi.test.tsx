import { describe, expect, test, jest } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import { EventSequenceFilterUi } from '../EventSequenceFilterUi';

import { EventSequenceFilteringStrategy } from '../../../filters/EventSequenceFilter';
jest.mock('../../../filters/EventSequenceFilter');

const logFile = {
    filename: "filename",
    pc_datetime: "",
    ups_datetime: "",
    units_subunits: {},
    log_entries: [],
};

it("Select add EventSequenceFilterUi", () => {
    /*const filter = new EventSequenceFilteringStrategy(logFile);
    render(EventSequenceFilterUi(filter));

    const btnElement = screen.getByText(/add/i);
    btnElement.click();
    expect(filter.addItem).toBeCalled();*/

}); 



