import { jest } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import {CodeFilterUi} from '../CodeFilterUi';

import { CodeFilteringStrategy } from "../../../filters/CodeFilter";
jest.mock('../../../filters/CodeFilter');

const logFile = {
    filename: "filename",
    pc_datetime: "",
    ups_datetime: "",
    units_subunits: {},
    log_entries: [],
};

it("Select all test CodeFilterUi", () => {
    const filter = new CodeFilteringStrategy(logFile);
    render(CodeFilterUi(filter));

    const btnElement = screen.getByText(/select all/i);
    btnElement.click();
    expect(filter.selectAll).toBeCalled();

});

it("Select none test CodeFilterUi", () => {
    const filter = new CodeFilteringStrategy(logFile);
    render(CodeFilterUi(filter));

    const btnElement = screen.getByText(/select none/i);
    btnElement.click();
    expect(filter.selectNone).toBeCalled();

});

it("list all codes of CodeFilteringStrategy test", () => {
    const code = "code1";
    
    const filter = new CodeFilteringStrategy(logFile);
    Object.defineProperty(filter, "filterableCodes", {value: [code]});
    

    render(CodeFilterUi(filter));

    const codeElement = screen.getByText(code);
    expect(codeElement).toBeInTheDocument();
});




