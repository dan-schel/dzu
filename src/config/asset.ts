import { z } from "zod";

export class Asset {
  constructor(
    readonly id: string,
    readonly path: string,
  ) {}

  static readonly json = z
    .object({
      id: z.string().uuid(),
      path: z.string(),
    })
    .transform((x) => new Asset(x.id, x.path));

  toJson(): z.input<typeof Asset.json> {
    return {
      id: this.id,
      path: this.path,
    };
  }
}
