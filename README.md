# transfer-van-calculator

## Run locally

Open `index.html` directly in a modern browser. No Node.js installation or local scripts are required. An internet connection is needed to load the SheetJS spreadsheet parser from jsDelivr; workbook contents are processed in the browser.

Default routes and apartments are loaded in this order: browser-saved defaults, `travels.json` beside `index.html`, then the four built-in routes. Browser security blocks automatic access to sibling files when opened via `file://`; in that case, use **Open JSON** to select `travels.json`. **Export JSON** suggests `travels.json`, but the browser controls the save location and does not allow the page to force the project root.

The first worksheet in each `.xlsx` transfer board should include first and last name, zone, district, and area columns. Headers such as `First Name`, `Last Name`, `Zone`, `District`, and `Area` are recognized, as are common variants. Optional `Type` and `Position` columns are imported when present. The after board matches missionaries by normalized first and last name; unmatched rows are added as new missionaries.

Imported data is available in `window.transferVanData.missionaries` and `window.transferVanData.zones` for subsequent website functionality.

## Apartment batch file

Batch add reads the first worksheet of an `.xlsx` file by column position: teaching area in C, phone number in D, and address in E. A header row is optional. Rows with the same address are merged, keeping unique phone numbers and teaching areas for review.