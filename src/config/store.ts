import { z } from "zod";

export class Store {
  constructor(readonly path: string) {}

  static readonly json = z
    .object({
      path: z.string(),
    })
    .transform((x) => new Store(x.path));

  toJson(): z.input<typeof Store.json> {
    return {
      path: this.path,
    };
  }
}
