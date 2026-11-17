# transfer-van-calculator

## Run locally

Open `index.html` directly in a modern browser. No Node.js installation or local scripts are required. An internet connection is needed to load the SheetJS spreadsheet parser from jsDelivr; workbook contents are processed in the browser.

Default routes and apartments are loaded in this order: browser-saved defaults, `travels.json` beside `index.html`, then the four built-in routes. Browser security blocks automatic access to sibling files when opened via `file://`; in that case, use **Open JSON** to select `travels.json`. **Export JSON** suggests `travels.json`, but the browser controls the save location and does not allow the page to force the project root.

## Saving progress

On the home screen, **New save** creates a named save in browser storage, either as a copy of the current progress or as a blank trip using the default routes and apartments that would load on refresh. Starting a blank trip replaces current unsaved progress. Use **Load** to restore a save, **Save changes** to update the current save, **Rename** to change its name, and **Delete** to remove a save. **Clear all saves** deletes the entire save list after confirmation, but leaves the current progress and saved default routes and apartments in place. Changes are not saved automatically. Refreshing starts a clean trip; load a save to restore its saved progress. Deleting the current save leaves progress unsaved until another save is created or loaded.

Saves retain the imported boards, reviews, routes, apartments, timeline edits, and call notes. **Save to file** exports the saved list (not unsaved changes); **Load file** replaces the browser's list with a previously exported file, after which you can load a save. Browser storage is specific to the browser and site, and can be cleared, so keep a file backup. Backups contain the imported personal data. Route and save exports currently omit travel-time matrices; existing route JSON files containing them can still be opened.

The first worksheet in each `.xlsx` transfer board should include first and last name, zone, district, and area columns. Headers such as `First Name`, `Last Name`, `Zone`, `District`, and `Area` are recognized, as are common variants. Optional `Type` and `Position` columns are imported when present. The after board matches missionaries by normalized first and last name; unmatched rows are added as new missionaries.

Imported data is available in `window.transferVanData.missionaries` and `window.transferVanData.zones` for subsequent website functionality.

In the missing transfer types review, use **Departing** to mark a missionary's transfer type as ULI.

After both boards are loaded, use **Renamed locations** to review before-only and after-only zones, districts, and teaching areas. Each tab counts its unignored locations across both lists. Select an item and then its counterpart in the other list, or drag an item onto its counterpart. Mark a location as closed or new; those decisions can be undone with **Unignore**. Areas are grouped by route index and can be paired when their indexes match or either area is unindexed. The paired area takes the known index, if any. **Review Renames** shows renamed zones, districts, and teaching areas; paired teaching-area renames can be undone there. Zone and district renames are shown for reference only. Pairing parent locations also joins unambiguous children with identical names when possible. All remaining locations must be paired or marked closed/new before transfer types are calculated and the later reviews unlock.

Use the refresh button in this review to match unambiguous districts and teaching areas with identical names that moved to another zone or district. Pairing a zone or district also recalculates those child matches automatically. Conflicting known area indexes and ambiguous names remain for manual review. Transfer types and departing missionary selection become available after the unignored renamed-location count reaches zero.

On the stop timeline, use the mouse wheel or drag the background left and right to scroll. Dragging teaching areas and missionaries still moves those items.
Senior and departing missionaries are excluded from the stop timeline, its validation, and the print timeline.
Moving a teaching area to another morning stop resets its missionaries' previous manual placements and recalculates their van movements from the new stop.
If an earlier edit means a missionary is no longer on the van at a later stop, their later drop-off is removed. Expected but missing missionaries may still appear as faded tokens.

On the call list, use the edit icon in a missionary's Notes cell to replace the generated note, then save or cancel the edit. Use the restore icon to return an edited note to its generated value. Saved notes persist with the current save; uploading a new before board clears them.

Use **Copy to clipboard** to copy the selected zone's table, including current note edits, for pasting into another application. Clipboard access requires browser permission.

## Apartment batch file

Batch add reads the first worksheet of an `.xlsx` file by column position: teaching area in C, phone number in D, and address in E. A header row is optional. Rows with the same address are merged, keeping unique phone numbers and teaching areas for review.

Cards already matching a named apartment's address, phone numbers, and teaching areas are hidden from review. Matching ignores case, punctuation, and the order of phone numbers and areas; an area's before or after name can match. Names and map pins are not supplied by the spreadsheet and are left unchanged.

The review suggests a name from the teaching area, or from words shared by all teaching areas at an address (ignoring case and preserving the first area's word order). Existing apartment names take precedence. Review and edit the suggestions; apartments without a name or with duplicate names must be corrected before saving.

One-word suggested names are highlighted orange for review. This is a reminder, not an error, and editing the name dismisses it.

Cards with a matching name and address but different details are highlighted orange as partial matches; this is also a reminder, not an error. Use **Compare existing apartment** on a partial match or a duplicate-name conflict to compare its details with the imported card. You can ignore the imported card, or stage a merge by choosing the existing or imported value for each field; phone numbers and teaching areas can also be combined. Merges are applied only when the batch is saved. If the existing apartment has a pending card, its staged data is shown on the existing side and included in the merge choices. A matching address updates the first existing apartment at that address; other apartments, including those sharing that address, are checked for name conflicts.