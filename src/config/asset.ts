import { z } from "zod";

export class Asset {
  constructor(readonly path: string) {}

  static readonly json = z
    .object({
      path: z.string(),
    })
    .transform((x) => new Asset(x.path));

  toJson(): z.input<typeof Asset.json> {
    return {
      path: this.path,
    };
  }
}
