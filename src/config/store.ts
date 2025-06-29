import { z } from "zod";

export class Store {
  constructor(
    readonly id: string,
    readonly path: string,
  ) {}

  static readonly json = z
    .object({
      id: z.string().uuid(),
      path: z.string(),
    })
    .transform((x) => new Store(x.id, x.path));

  toJson(): z.input<typeof Store.json> {
    return {
      id: this.id,
      path: this.path,
    };
  }
}
