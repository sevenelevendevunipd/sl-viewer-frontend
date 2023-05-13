import React from "react";
import { min, max, groupBy, chunk } from "../utils";

it("min", () => {
  const data1 = "2021-01-16T00:00:00.000000";
  const data2 = "2021-01-02T00:00:00.000000";

  const m = min(data1, data2);
  expect(m).toEqual(data2);
});

it("max", () => {
  const data1 = "2021-01-16T00:00:00.000000";
  const data2 = "2021-01-02T00:00:00.000000";

  const m = max(data1, data2);
  expect(m).toEqual(data1);
});

it("groupBy", () => {
  interface ex {
    code: string;
    value: string;
  }

  const example: ex[] = [
    { code: "A000", value: "ON" },
    { code: "A000", value: "OFF" },
    { code: "A006", value: "ON" },
  ];

  const r = groupBy(example, (ex) => ex.code);
  expect(r["A000"][0].value).toBe("ON");
  expect(r["A000"][1].value).toBe("OFF");
  expect(r["A006"][0].value).toBe("ON");
});

describe("chunk", () => {
  test("should return an empty array when given an empty array", () => {
    expect(chunk([], 2)).toEqual([]);
  });

  test("should return the original array when chunk size is greater than array length", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test("should split an array into chunks of specified size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });
});
