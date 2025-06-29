import { itsOk, parseIntThrow } from "@dan-schel/js-utils";
import { z } from "zod";
import { buildZodTransform } from "./zod-transform.js";

export class JustDate {
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
  ) {
    if (!JustDate.isValid(year, month, day)) {
      throw new Error(`${year}-${month}-${day} is not a valid date.`);
    }
  }

  static readonly json = z.string().transform(
    buildZodTransform((input) => {
      const match = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) {
        throw new Error(`"${input}" is not in YYYY-MM-DD format.`);
      }

      const year = parseIntThrow(itsOk(match[1]));
      const month = parseIntThrow(itsOk(match[2]));
      const day = parseIntThrow(itsOk(match[3]));
      if (!JustDate.isValid(year, month, day)) {
        throw new Error(
          `${JustDate.asIso(year, month, day)} is not a valid date.`,
        );
      }

      return new JustDate(year, month, day);
    }),
  );

  toJson(): z.input<typeof JustDate.json> {
    return this.toIso();
  }

  toIso() {
    return JustDate.asIso(this.year, this.month, this.day);
  }

  compare(other: JustDate) {
    if (this.year > other.year) return 1;
    if (this.year < other.year) return -1;
    if (this.month > other.month) return 1;
    if (this.month < other.month) return -1;
    if (this.day > other.day) return 1;
    if (this.day < other.day) return -1;
    return 0;
  }

  static today(): JustDate {
    const today = new Date();
    return new JustDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );
  }

  static isValid(year: number, month: number, day: number): boolean {
    return !isNaN(new Date(year, month - 1, day).getTime());
  }

  static asIso(year: number, month: number, day: number): string {
    const yearStr = year.toString().padStart(4, "0");
    const monthStr = month.toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");
    return `${yearStr}-${monthStr}-${dayStr}`;
  }
}
