import { z } from "zod";
import { Asset } from "./asset.js";
import { Store } from "./store.js";
import { CompletedBackup } from "./completed-backup.js";

export class Config {
  static readonly default = new Config([], [], []);

  constructor(
    readonly assets: Asset[],
    readonly stores: Store[],
    readonly completedBackups: CompletedBackup[],
  ) {
    // TODO: Ensure same path cannot be an asset and a store at the same time.
  }

  static readonly json = z
    .object({
      assets: Asset.json.array(),
      stores: Store.json.array(),
      completedBackups: CompletedBackup.json.array(),
    })
    .transform((x) => new Config(x.assets, x.stores, x.completedBackups));

  toJson(): z.input<typeof Config.json> {
    return {
      assets: this.assets.map((x) => x.toJson()),
      stores: this.stores.map((x) => x.toJson()),
      completedBackups: this.completedBackups.map((x) => x.toJson()),
    };
  }

  with({
    assets,
    stores,
    completedBackups,
  }: {
    assets?: Asset[];
    stores?: Store[];
    completedBackups?: CompletedBackup[];
  }) {
    return new Config(
      assets ?? this.assets,
      stores ?? this.stores,
      completedBackups ?? this.completedBackups,
    );
  }

  withAsset(asset: Asset) {
    // TODO: Or return { error: "path-is-store" }.
    return this.with({ assets: [...this.assets, asset] });
  }

  withStore(store: Store) {
    // TODO: Or return { error: "path-is-asset" }.
    return this.with({ stores: [...this.stores, store] });
  }

  withoutAssetOrStore(path: string) {
    const newAssets = this.assets.filter((asset) => path !== asset.path);
    const newStores = this.stores.filter((store) => path !== store.path);
    const newConfig = this.with({ assets: newAssets, stores: newStores });

    if (newAssets.length < this.assets.length) {
      return { config: newConfig, type: "asset" as const };
    } else if (newStores.length < this.stores.length) {
      return { config: newConfig, type: "store" as const };
    } else {
      return { error: "not-found" as const };
    }
  }
}
