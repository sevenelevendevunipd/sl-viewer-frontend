import React from "react";
import { groupBy } from "../utils";
import { chunk } from "../utils";
import { min } from "../utils";
import { max } from "../utils";

it("min", () => {
    const m = min(3,4);
    expect(m).toEqual(3);
});

it("max", () => {
    const m = max(3,4);
    expect(m).toEqual(4);
});

interface ex {
    code: string;
    value: string;
  }
  
const example: ex[] = [
  { code: 'A000', value: 'ON' },
  { code: 'A000', value: 'OFF' },
  { code: 'A006', value: 'ON' },
];

it("groupBy", () => {

    const r = groupBy(example, (ex)=> ex.code);
    expect(r["A000"][0].value).toBe("ON");
    expect(r["A000"][1].value).toBe("OFF");
    expect(r["A006"][0].value).toBe("ON");
});

describe('chunk', () => {
    test('should return an empty array when given an empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });
  
    test('should return the original array when chunk size is greater than array length', () => {
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
    });
  
    test('should split an array into chunks of specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]]);
    });
});

