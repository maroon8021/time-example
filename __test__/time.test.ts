import assert from "assert";
import { execSync } from "child_process";
// tslint:disable-next-line:no-var-requires
//const resetDateCache = require("reset-date-cache"); //https://zenn.dev/dora1998/articles/node-process-env-tz

import {
  getMonthInJst,
  getCurrentDayjs,
  getPreviousMonthInJst,
} from "../src/utils/time";

describe("Check time with timezone", () => {
  it("check test local timezone: UTC", () => {
    const date = new Date("2021-01-01T00:00+09:00");

    assert.strictEqual(process.env.TZ, "UTC");
    assert.strictEqual(
      date.toString(),
      "Thu Dec 31 2020 15:00:00 GMT+0000 (協定世界時)"
    );
    assert.notStrictEqual(
      date.toString(),
      "Fri Jan 01 2021 00:00:00 GMT+0900 (日本標準時)"
    );
    assert.strictEqual(date.getTime(), 1609426800000);
  });

  describe("should get same month as JST", () => {
    it("2020-12-31T16:00+00:00", () => {
      const date = new Date("2020-12-31T16:00+00:00"); // 2021-01-01 01:00 JST
      const thisMonth = getMonthInJst(date);
      assert.strictEqual(
        thisMonth.date.getTime(),
        new Date("2021-01-01T00:00+09:00").getTime()
      );
      assert.strictEqual(thisMonth.year, "2021");
      assert.strictEqual(thisMonth.month, "01");
    });

    it("2021-05", () => {
      const mayDayjs = getCurrentDayjs("2021-05");
      const month = getMonthInJst(mayDayjs.toDate());
      assert.strictEqual(
        month.date.getTime(),
        new Date("2021-05-01T00:00+09:00").getTime()
      );
      assert.strictEqual(month.year, "2021");
      assert.strictEqual(month.month, "05");
    });
  });

  describe("should get previous month as JST", () => {
    it("2020-12-31T16:00+00:00", () => {
      const date = new Date("2020-12-31T16:00+00:00"); // 2021-01-01 01:00 JST
      const thisMonth = getPreviousMonthInJst(date);
      assert.strictEqual(
        thisMonth.date.getTime(),
        new Date("2020-12-01T00:00+09:00").getTime()
      );
      assert.strictEqual(thisMonth.year, "2020");
      assert.strictEqual(thisMonth.month, "12");
    });

    it("2020-12-31T14:00+00:00", () => {
      const date = new Date("2020-12-31T14:00+00:00"); // 2020-12-31 23:00 JST
      const thisMonth = getPreviousMonthInJst(date);
      assert.strictEqual(
        thisMonth.date.getTime(),
        new Date("2020-11-01T00:00+09:00").getTime()
      );
      assert.strictEqual(thisMonth.year, "2020");
      assert.strictEqual(thisMonth.month, "11");
    });

    it("2021-05", () => {
      const mayDayjs = getCurrentDayjs("2021-05");
      const month = getPreviousMonthInJst(mayDayjs.toDate());
      assert.strictEqual(
        month.date.getTime(),
        new Date("2021-04-01T00:00+09:00").getTime()
      );
      assert.strictEqual(month.year, "2021");
      assert.strictEqual(month.month, "04");
    });
  });
});
