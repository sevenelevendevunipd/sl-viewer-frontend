/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventSequenceFilteringStrategy } from "../../../filters/EventSequenceFilter";
import {
  EventSequenceFilterViewModel,
  IEventSequenceFilterViewModel,
} from "../EventSequenceFilterViewModel";

jest.mock("../../../filters/EventSequenceFilter");

describe("EventSequenceFilterViewModel", () => {
  let viewModel: IEventSequenceFilterViewModel;
  let filter: jest.Mocked<EventSequenceFilteringStrategy>;

  beforeEach(() => {
    filter = new EventSequenceFilteringStrategy({} as any) as typeof filter;
    viewModel = EventSequenceFilterViewModel(filter);
  });

  describe("getInsertingCode", () => {
    beforeEach(() => {
      filter.getInserting.mockReset();
    });

    it("first", () => {
      const code = Symbol();
      filter.getInserting.mockReturnValueOnce({ code: code } as any);

      expect(viewModel.getInsertingCode(true)).toBe(code);

      expect(filter.getInserting).toBeCalledWith(true);
      expect(filter.getInserting).toBeCalledTimes(1);
    });
    it("second", () => {
      const code = Symbol();
      filter.getInserting.mockReturnValueOnce({ code: code } as any);

      expect(viewModel.getInsertingCode(false)).toBe(code);

      expect(filter.getInserting).toBeCalledWith(false);
      expect(filter.getInserting).toBeCalledTimes(1);
    });
  });

  describe("getInsertingValue", () => {
    beforeEach(() => {
      filter.getInserting.mockReset();
    });
    it("first", () => {
      const value = Symbol();
      filter.getInserting.mockReturnValueOnce({ value: value } as any);

      expect(viewModel.getInsertingValue(true)).toBe(value);

      expect(filter.getInserting).toBeCalledWith(true);
      expect(filter.getInserting).toBeCalledTimes(1);
    });
    it("second", () => {
      const value = Symbol();
      filter.getInserting.mockReturnValueOnce({ value: value } as any);

      expect(viewModel.getInsertingValue(false)).toBe(value);

      expect(filter.getInserting).toBeCalledWith(false);
      expect(filter.getInserting).toBeCalledTimes(1);
    });
  });

  describe("setInsertingCode", () => {
    beforeEach(() => {
      filter.getInserting.mockReset();
    });

    it("first", () => {
      const code = Symbol();
      const obj = {} as any;
      filter.getInserting.mockReturnValue(obj);

      viewModel.setInsertingCode(true)({ target: { value: code } } as any);

      expect(filter.getInserting).toBeCalledWith(true);
      expect(filter.getInserting).toBeCalledTimes(1);
      expect(obj.code).toBe(code);
    });
    it("second", () => {
      const code = Symbol();
      const obj = {} as any;
      filter.getInserting.mockReturnValue(obj);

      viewModel.setInsertingCode(false)({ target: { value: code } } as any);

      expect(filter.getInserting).toBeCalledWith(false);
      expect(filter.getInserting).toBeCalledTimes(1);
      expect(obj.code).toBe(code);
    });
  });

  describe("setInsertingValue", () => {
    beforeEach(() => {
      filter.getInserting.mockReset();
    });

    it("first", () => {
      const value = Symbol();
      const obj = {} as any;
      filter.getInserting.mockReturnValue(obj);

      viewModel.setInsertingValue(true)({ target: { value: value } } as any);

      expect(filter.getInserting).toBeCalledWith(true);
      expect(filter.getInserting).toBeCalledTimes(1);
      expect(obj.value).toBe(value);
    });
    it("second", () => {
      const value = Symbol();
      const obj = {} as any;
      filter.getInserting.mockReturnValue(obj);

      viewModel.setInsertingValue(false)({ target: { value: value } } as any);

      expect(filter.getInserting).toBeCalledWith(false);
      expect(filter.getInserting).toBeCalledTimes(1);
      expect(obj.value).toBe(value);
    });
  });

  describe("addItem", () => {
    beforeEach(() => {
      filter.addItem.mockReset();
    });

    it("first", () => {
      viewModel.addItem(true)();
      expect(filter.addItem).toBeCalledTimes(1);
      expect(filter.addItem).toBeCalledWith(true);
    });
    it("second", () => {
      viewModel.addItem(false)();
      expect(filter.addItem).toBeCalledTimes(1);
      expect(filter.addItem).toBeCalledWith(false);
    });
  });

  describe("values", () => {
    it("first", () => {
      const value = Symbol() as any;
      filter.firstValues = value;
      expect(viewModel.values(true)).toBe(value);
    });
    it("second", () => {
      const value = Symbol() as any;
      filter.lastValues = value;
      expect(viewModel.values(false)).toBe(value);
    });
  });

  it("onRowEditComplete", () => {
    const event = Symbol() as any;
    viewModel.onRowEditComplete(true)(event);
    expect(filter.editItem).toBeCalledWith(event, true);
  });

  it("onRowReorder", () => {
    const event = Symbol() as any;
    viewModel.onRowReorder(true)(event);
    expect(filter.reorderItems).toBeCalledWith(event, true);
  });

  it("onDeleteClick", () => {
    viewModel.onDeleteClick(true, 2)();
    expect(filter.deleteItem).toBeCalledWith(2, true);
  });

  it("time", () => {
    const time = Symbol() as any;
    filter.time = time;
    expect(viewModel.time()).toBe(time);
  });

  describe("setTime", () => {
    beforeEach(() => {
      filter.setTime.mockReset();
    });

    it("non null", () => {
      const time = 123;
      viewModel.setTime({ target: { value: time } } as any);
      expect(filter.setTime).toBeCalledWith(time);
    });

    it("null", () => {
      viewModel.setTime({ target: { value: null } } as any);
      expect(filter.setTime).toBeCalledWith(0);
    });
  });

  it("reset", () => {
    viewModel.reset();
    expect(filter.reset).toBeCalled();
  });
});
