# transfer-van-calculator

## Run locally

Open `index.html` directly in a modern browser. No Node.js installation or local scripts are required. An internet connection is needed to load the SheetJS spreadsheet parser from jsDelivr; workbook contents are processed in the browser.

Default routes and apartments are loaded in this order: browser-saved defaults, `travels.json` beside `index.html`, then the four built-in routes. Browser security blocks automatic access to sibling files when opened via `file://`; in that case, use **Open JSON** to select `travels.json`. **Export JSON** suggests `travels.json`, but the browser controls the save location and does not allow the page to force the project root.

The first worksheet in each `.xlsx` transfer board should include first and last name, zone, district, and area columns. Headers such as `First Name`, `Last Name`, `Zone`, `District`, and `Area` are recognized, as are common variants. Optional `Type` and `Position` columns are imported when present. The after board matches missionaries by normalized first and last name; unmatched rows are added as new missionaries.

Imported data is available in `window.transferVanData.missionaries` and `window.transferVanData.zones` for subsequent website functionality.

In the missing transfer types review, use **Departing** to mark a missionary's transfer type as ULI.

On the stop timeline, use the mouse wheel or drag the background left and right to scroll. Dragging teaching areas and missionaries still moves those items.
Senior and departing missionaries are excluded from the stop timeline, its validation, and the print timeline.
Moving a teaching area to another morning stop resets its missionaries' previous manual placements and recalculates their van movements from the new stop.
If an earlier edit means a missionary is no longer on the van at a later stop, their later drop-off is removed. Expected but missing missionaries may still appear as faded tokens.

On the call list, use the edit icon in a missionary's Notes cell to replace the generated note, then save or cancel the edit. Use the restore icon to return an edited note to its generated value. Saved notes stay available while navigating between zones and views, but are cleared when the page is reloaded or a new before board is uploaded.

Use **Copy to clipboard** to copy the selected zone's table, including current note edits, for pasting into another application. Clipboard access requires browser permission.

## Apartment batch file

Batch add reads the first worksheet of an `.xlsx` file by column position: teaching area in C, phone number in D, and address in E. A header row is optional. Rows with the same address are merged, keeping unique phone numbers and teaching areas for review.

Cards already matching a named apartment's address, phone numbers, and teaching areas are hidden from review. Matching ignores case, punctuation, and the order of phone numbers and areas; an area's before or after name can match. Names and map pins are not supplied by the spreadsheet and are left unchanged.

The review suggests a name from the teaching area, or from words shared by all teaching areas at an address (ignoring case and preserving the first area's word order). Existing apartment names take precedence. Review and edit the suggestions; apartments without a name or with duplicate names must be corrected before saving.

One-word suggested names are highlighted orange for review. This is a reminder, not an error, and editing the name dismisses it.

Cards with a matching name and address but different details are highlighted orange as partial matches; this is also a reminder, not an error. Use **Compare existing apartment** on a partial match or a duplicate-name conflict to compare its details with the imported card. You can ignore the imported card, or stage a merge by choosing the existing or imported value for each field; phone numbers and teaching areas can also be combined. Merges are applied only when the batch is saved. If the existing apartment has a pending card, its staged data is shown on the existing side and included in the merge choices. A matching address updates the first existing apartment at that address; other apartments, including those sharing that address, are checked for name conflicts.