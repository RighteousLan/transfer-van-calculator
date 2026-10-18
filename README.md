# transfer-van-calculator

## Run locally

Open `index.html` directly in a modern browser. No Node.js installation or local scripts are required. An internet connection is needed to load the SheetJS spreadsheet parser from jsDelivr; workbook contents are processed in the browser.

The first worksheet in each `.xlsx` transfer board should include first and last name, zone, district, and area columns. Headers such as `First Name`, `Last Name`, `Zone`, `District`, and `Area` are recognized, as are common variants. Optional `Type` and `Position` columns are imported when present. The after board matches missionaries by normalized first and last name; unmatched rows are added as new missionaries.

Imported data is available in `window.transferVanData.missionaries` and `window.transferVanData.zones` for subsequent website functionality.