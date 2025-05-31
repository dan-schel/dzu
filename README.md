# Dan's Zip Util

A rudimentary CLI-based backup tool.

Tell it:

- Which folders you want backed-up
- Where to save backups

And it will:

- Zip the folders up
- Name them according to today's date
- Copy them to each location you've requested

## Installation

DZU is available from NPM, just run:

```sh
npm i -g dzu
```

## Basic Usage

When you first setup DZU, you'll need to tell it which folders to backup and save backups to.

```sh
dzu init
dzu protect /path/to/precious-photos
dzu protect /path/to/precious-documents
dzu use /path/to/backups-folder
```

But once that's done, whenever it comes time to run a backup, all you need to do is:

```sh
dzu run
```

For more information about the available commands, run `dzu help`.

## Developing DZU

1. First, if you have `dzu` installed, temporarily uninstall it with `npm uninstall dzu`.

2. Next, clone the repo, install dependencies, and setup the needed symlinks with:

   ```sh
   git clone https://github.com/dan-schel/dzu.git
   cd dzu
   npm i
   chmod +x bin.js
   npm link
   npm link dzu
   ```

   This creates two symlinks at the location where NodeJS is installed, e.g. `/home/dan/.nvm/versions/node/v22.16.0`. The first is in `[NODEJS]/bin/dzu`, whick symlinks to `[NODEJS]/lib/node_modules/dzu`, which itself is a symlink to the cloned repository.

3. Rename both symlinks to `dzu-dev` or something (be sure to update the symlink at `[NODEJS]/bin/dzu` to point to the renamed `[NODEJS]/lib/node_modules/dzu-dev`).

4. In a new terminal, run `npm run dev` and leave it running in the background.

5. Now that both symlinks are renamed `dzu-dev`, you should be able to safely re-install the production `dzu` from NPM if you wish.

6. Now so long as `npm run dev` remains running, the `dzu-dev` command should react to source code changes inside this folder. The regular `dzu` command will still run the production version, completely unaffected by anything we touch here.

   You can test it by modifying the `version` field in `package.json`. Running `dzu-dev -v` should cause the updated value to print, however `dzu -v` should still match whichever version you've installed from NPM.
