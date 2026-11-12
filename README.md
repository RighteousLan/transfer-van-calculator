# transfer-van-calculator

## Run locally

Open `index.html` directly in a modern browser. No Node.js installation or local scripts are required. An internet connection is needed to load the SheetJS spreadsheet parser from jsDelivr; workbook contents are processed in the browser.

Default routes and apartments are loaded in this order: browser-saved defaults, `travels.json` beside `index.html`, then the four built-in routes. Browser security blocks automatic access to sibling files when opened via `file://`; in that case, use **Open JSON** to select `travels.json`. **Export JSON** suggests `travels.json`, but the browser controls the save location and does not allow the page to force the project root.

The first worksheet in each `.xlsx` transfer board should include first and last name, zone, district, and area columns. Headers such as `First Name`, `Last Name`, `Zone`, `District`, and `Area` are recognized, as are common variants. Optional `Type` and `Position` columns are imported when present. The after board matches missionaries by normalized first and last name; unmatched rows are added as new missionaries.

Imported data is available in `window.transferVanData.missionaries` and `window.transferVanData.zones` for subsequent website functionality.

On the stop timeline, use the mouse wheel or drag the background left and right to scroll. Dragging teaching areas and missionaries still moves those items.

On the call list, use the edit icon in a missionary's Notes cell to replace the generated note, then save or cancel the edit. Use the restore icon to return an edited note to its generated value. Saved notes stay available while navigating between zones and views, but are cleared when the page is reloaded or a new before board is uploaded.

Use **Copy to clipboard** to copy the selected zone's table, including current note edits, for pasting into another application. Clipboard access requires browser permission.

## Apartment batch file

Batch add reads the first worksheet of an `.xlsx` file by column position: teaching area in C, phone number in D, and address in E. A header row is optional. Rows with the same address are merged, keeping unique phone numbers and teaching areas for review.