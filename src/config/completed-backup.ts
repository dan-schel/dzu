import z from "zod";
import { JustDate } from "../utils/just-date.js";

export class CompletedBackup {
  constructor(
    readonly assetId: string,
    readonly storeId: string,
    readonly date: JustDate,
  ) {}

  static readonly json = z
    .object({
      assetId: z.string().uuid(),
      storeId: z.string().uuid(),
      date: JustDate.json,
    })
    .transform((x) => new CompletedBackup(x.assetId, x.storeId, x.date));

  toJson(): z.input<typeof CompletedBackup.json> {
    return {
      assetId: this.assetId,
      storeId: this.storeId,
      date: this.date.toJson(),
    };
  }
}
