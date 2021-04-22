import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { Between, getRepository } from "typeorm";
import { Product } from "../models/product";

const JAPAN_TIMEZONE = "Asia/Tokyo";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault(JAPAN_TIMEZONE);

export class Index {
  static getProducts() {
    return getRepository(Product).find();
  }

  static getProductsWithTime() {
    // const startOfThisMonth = dayjs().startOf("month").tz("Asia/Tokyo"); // "2021-04-01T00:00:00.000Z"
    // const lasthOfThisMonth = dayjs().endOf("month").tz("Asia/Tokyo"); // "2021-04-30T23:59:59.999Z"

    // const startOfThisMonth = dayjs().startOf("month").tz("Asia/Tokyo", true); // "2021-03-31T15:00:00.000Z"
    // const lasthOfThisMonth = dayjs().endOf("month").tz("Asia/Tokyo", true); // "2021-04-30T14:59:59.999Z"

    const startOfThisMonth = dayjs().startOf("month").tz("Asia/Tokyo", true); // "2021-03-31T15:00:00.000Z"
    const lasthOfThisMonth = dayjs()
      .endOf("month")
      .add(999999, "ms")
      .tz("Asia/Tokyo", true); // "2021-04-30T14:59:59.999Z"

    console.log("startOfThisMonth", startOfThisMonth);
    console.log("lasthOfThisMonth", lasthOfThisMonth);
    return getRepository(Product).find({
      where: {
        createdAt: Between(startOfThisMonth, lasthOfThisMonth,
      },
    });
  }
}
