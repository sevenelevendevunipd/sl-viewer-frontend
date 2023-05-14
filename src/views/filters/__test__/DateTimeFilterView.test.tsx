import { render, screen } from "@testing-library/react";
import { DateTimeFilterView } from "../DateTimeFilterView";

import { IDateTimeFilterViewModel } from "../../../viewmodels/filters/DateTimeFilterViewModel";

const viewModelFactory = () => ({
  minValue: jest.fn(),
  onMinValueChange: jest.fn(),
  minCalendarRangeMin: jest.fn(),
  minCalendarRangeMax: jest.fn(),

  maxValue: jest.fn(),
  onMaxValueChange: jest.fn(),
  maxCalendarRangeMin: jest.fn(),
  maxCalendarRangeMax: jest.fn(),
} as jest.Mocked<IDateTimeFilterViewModel>);

it("show range start calendar", () => {

  const viewModel = viewModelFactory();

  render(DateTimeFilterView(viewModel));

  const calendarLabel = screen.getByText(/start/i);

  expect(calendarLabel).toBeInTheDocument();
  expect(calendarLabel.nextSibling).toHaveClass("p-calendar");
});

it("show range end superiore", () => {

  const viewModel = viewModelFactory();
  
  render(DateTimeFilterView(viewModel));

  const calendarLabel = screen.getByText(/end/i);

  expect(calendarLabel).toBeInTheDocument();
  expect(calendarLabel.nextSibling).toHaveClass("p-calendar");
});
