# Dosbox Conf
A very small CLI to update dosbox configuration files.
The main purpose was to update all of my _King's Quest_ dosbox files at once.

## Usage

First: `npm i`

Examples:

 - set fullscreen: node dbconf --fullscreen
 - set window: node dbconf --window --size 1200x900

## Options

 - `--fullscreen`: boolean: sets all files to fullscreen mode.
 - `--window`: boolean: sets all files to window mode.
 - `--size`: string: sets dosbox's 'windowresolution' setting.

## Root

Root path for King's Quest Apps is hard-coded in the top of the JS file.