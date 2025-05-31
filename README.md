# Dan's Zip Util

A CLI-based backup tool.

## Installation

```sh
npm i -g dzu
```

## Basic Usage

Define which folder(s) to backup, then define which folder(s) to save backups to.

```sh
dzu init
dzu protect /path/to/folder-to-backup
dzu use /path/to/folder-to-save-backups-to
dzu run
```

For more information about the available commands, run `dzu help`.

## Developing DZU

1. First, if you have `dzu` installed, temporarily uninstall it.

2. Next, run:

   ```sh
   chmod +x bin.js
   npm link
   npm link dzu
   ```

   This creates two symlinks at the location where NodeJS is installed, e.g. `/home/dan/.nvm/versions/node/v22.16.0`. The first is in `[NODEJS]/bin/dzu`, whick symlinks to `[NODEJS]/lib/node_modules/dzu`, which itself is a symlink to this folder.

3. Replace both symlinks to `dzu-dev` (be sure to update the symlink at `[NODEJS]/bin/dzu` to point to the renamed `[NODEJS]/lib/node_modules/dzu-dev`).

4. In a new terminal, run `npm run dev` and leave it running in the background.

5. Now that both symlinks are renamed `dzu-dev`, you should be able to safely re-install the production `dzu` from NPM if you wish.

6. Now so long as `npm run dev` remains running, `dzu-dev` should now react to source code changes inside this folder. The regular `dzu` command will still run the production version, and will never be impacted by any source code changes.

   You can test it by modifying the version number in `package.json`. Running `dzu-dev -v` should cause the updated value to print, however `dzu -v` should still match whichever version you've installed from NPM.
