import { parseIntThrow } from "@dan-schel/js-utils";
import { z } from "zod";

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

  static readonly json = z.string().transform((input, ctx) => {
    const match = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `"${input}" is not in YYYY-MM-DD format.`,
      });
      return z.NEVER;
    }

    const [, year, month, day] = match.map(parseIntThrow);
    if (
      year == null ||
      month == null ||
      day == null ||
      !JustDate.isValid(year, month, day)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${year}-${month}-${day} is not a valid date.`,
      });
      return z.NEVER;
    }
    return new JustDate(year, month, day);
  });

  toJson(): z.input<typeof JustDate.json> {
    return `${this.year}-${this.month}-${this.day}`;
  }

  static isValid(year: number, month: number, day: number): boolean {
    return !isNaN(new Date(year, month - 1, day).getTime());
  }
}
