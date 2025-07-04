# TODO List

- [x] Resolve paths in config to absolute paths.
- [x] Fix output of progress logger to overwrite existing line for operations.
- [ ] Validate args properly (i.e. error when there's too many).
- [ ] Wizards for `dzu protect` and `dzu use`.
- [ ] Enforce that the same path cannot be an asset and a store.
- [x] Track backup history (i.e. the timestamp of the last backup for each asset/store pair).
- [ ] Allow defining a backup frequency for each asset, and skip backups according to the frequency.
- [ ] New `dzu audit` command which shows:
  - [ ] Which assets need backup
  - [ ] Which stores are online
- [ ] Confirm solution works for external drives.
  - [ ] Skip backup to "offline" stores.
  - [ ] Not sure about UNIX, but Windows can change drive letters (`D:/`) for the same drive sometimes, meaning we'll need to check every available drive path location when detecting online stores, and place extra metadata on the drive (maybe in the store directory?) to disambiguate it.
- [ ] Prettify output using `chalk`, e.g. different text colors.
  - [ ] The output of `dzu list` is particularly bad right now lol.
  - [ ] Improvements to `dzu help`, including updating the descriptions of each command.
- [ ] Windows support.
  - [ ] Make sure the config file saves to the right spot (AppData?) and that its path is displayed correctly.
  - [ ] Windows alternative for the `zip` command.
  - [ ] Support development on Windows, e.g. use `rimraf` instead of `rm -rf` directly.
- [ ] Allow assets to define a `.dzuignore` file to skip including certain files in the backup.
  - [ ] Fallback to `.gitignore`.
  - [ ] Allow this to be configured in `~/.dzu` instead, so the user can choose to keep their folders clean.
- [ ] Allow stores to have unique configuration.
  - [ ] An allowlist of assets to backup to this store (`null` by default, meaning "everything").
  - [ ] Override the frequency of each asset's backup schedule for this store.
- [ ] Other asset types?
  - [ ] FTP (e.g. MC server)
  - [ ] Clone all GitHub repos
  - [ ] Connected Android device (e.g. photo backup)
