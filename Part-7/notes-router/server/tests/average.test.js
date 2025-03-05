const { test, describe } = require("node:test");
const assert = require("node:assert");

const average = require("../utils/for_testing.js").average;

describe("average", () => {
  test("of one value is the value of itself", () => {
    assert.strictEqual(average([1]), 1);
  });

  test("of many is calculated right", () => {
    assert.strictEqual(average([1, 2, 4, 5, 6]), 3.6);
  });

  test("of empty array is zero", () => {
    assert.strictEqual(average([]), 0);
  });
});
