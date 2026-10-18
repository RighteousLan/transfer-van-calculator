import * as XLSX from "xlsx";
import { Apartment, Area, District, Missionary, MissionaryType, Zone } from "./models";

type Period = "before" | "after";

type PeriodName = {
	nameBefore: string;
	nameAfter: string;
};

interface AssignmentRow {
	firstName: string;
	lastName: string;
	type: MissionaryType | null;
	zone: string;
	district: string;
	area: string;
	position: string;
}

declare global {
	interface Window {
		transferVanData: {
			missionaries: Missionary[];
			zones: Zone[];
		};
	}
}

export const missionaries: Missionary[] = [];
export const zones: Zone[] = [];
window.transferVanData = { missionaries, zones };

function requireElement<T extends HTMLElement>(id: string): T {
	const element = document.getElementById(id);
	if (!element) throw new Error(`Missing page element: ${id}`);
	return element as T;
}

const homeView = requireElement<HTMLElement>("home-view");
const tripView = requireElement<HTMLElement>("trip-view");
const missionaryOutput = requireElement<HTMLElement>("missionary-output");
const zoneOutput = requireElement<HTMLElement>("zone-output");
const dataSummary = requireElement<HTMLElement>("data-summary");

requireElement<HTMLButtonElement>("new-trip").addEventListener("click", () => {
	homeView.hidden = true;
	tripView.hidden = false;
	window.scrollTo(0, 0);
});

requireElement<HTMLButtonElement>("back-to-home").addEventListener("click", () => {
	tripView.hidden = true;
	homeView.hidden = false;
	window.scrollTo(0, 0);
});

function displayName(before: string, after: string, period: Period): string {
	return period === "before" ? before : after;
}

function formatArea(area: Area | null, period: Period): string {
	if (!area) return "Not assigned";
	return [
		`Area: ${displayName(area.nameBefore, area.nameAfter, period) || "Not named"}`,
		`District: ${displayName(area.district.nameBefore, area.district.nameAfter, period) || "Not named"}`,
		`Zone: ${area.getZone(period) || "Not named"}`,
	].join("\n");
}

function formatApartment(apartment: Apartment | null): string {
	if (!apartment) return "Not assigned";
	const formatAreas = (areas: Area[]): string => areas.length
		? areas.map((area) => `${area.nameBefore || "—"} / ${area.nameAfter || "—"}`).join(", ")
		: "None";
	const pin = apartment.visualPin ? `${apartment.visualPin.x}, ${apartment.visualPin.y}` : "Not set";

	return [
		`Name: ${apartment.name || "—"}`,
		`Address: ${apartment.address || "—"}`,
		`Phone numbers: ${apartment.phoneNumbers.join(", ") || "None"}`,
		`Visual pin: ${pin}`,
		`Teaching areas: ${formatAreas(apartment.teachingAreas)}`,
		`Pickup areas: ${formatAreas(apartment.pickupAreas)}`,
		`Dropoff areas: ${formatAreas(apartment.dropoffAreas)}`,
	].join("\n");
}

function renderMissionaries(): void {
	missionaryOutput.replaceChildren();
	if (missionaries.length === 0) {
		const empty = document.createElement("p");
		empty.className = "empty-state";
		empty.textContent = "Upload a transfer board to see missionary records.";
		missionaryOutput.append(empty);
		return;
	}

	const headers = [
		"First name", "Last name", "Type", "Area before", "Position before",
		"Area after", "Position after", "Current apartment", "Transfer type",
	];
	const rows = missionaries.map((missionary) => [
		missionary.firstName || "—",
		missionary.lastName || "—",
		missionary.type ?? "Not set",
		formatArea(missionary.areaBefore, "before"),
		missionary.positionBefore || "Not set",
		formatArea(missionary.areaAfter, "after"),
		missionary.positionAfter || "Not set",
		formatApartment(missionary.currentLoc),
		missionary.transferType ?? "Not set",
	]);
	const table = document.createElement("table");
	table.className = "data-table missionary-table";
	const head = document.createElement("thead");
	const headingRow = document.createElement("tr");
	for (const header of headers) {
		const cell = document.createElement("th");
		cell.scope = "col";
		cell.textContent = header;
		headingRow.append(cell);
	}
	head.append(headingRow);
	const body = document.createElement("tbody");
	for (const row of rows) {
		const tableRow = document.createElement("tr");
		for (const value of row) {
			const cell = document.createElement("td");
			cell.textContent = value;
			tableRow.append(cell);
		}
		body.append(tableRow);
	}
	table.append(head, body);
	missionaryOutput.append(table);
}

function renderZones(): void {
	zoneOutput.replaceChildren();
	if (zones.length === 0) {
		const empty = document.createElement("p");
		empty.className = "empty-state";
		empty.textContent = "No zones loaded.";
		zoneOutput.append(empty);
		return;
	}

	for (const zone of zones) {
		const zoneSection = document.createElement("section");
		zoneSection.className = "zone-entry";
		const zoneHeading = document.createElement("h4");
		zoneHeading.textContent = `Zone: ${zone.nameBefore || "—"} / ${zone.nameAfter || "—"}`;
		zoneSection.append(zoneHeading);

		for (const district of zone.districts) {
			const districtSection = document.createElement("section");
			districtSection.className = "district-entry";
			const districtHeading = document.createElement("h5");
			districtHeading.textContent = `District: ${district.nameBefore || "—"} / ${district.nameAfter || "—"}`;
			districtSection.append(districtHeading);

			const areaList = document.createElement("ul");
			areaList.className = "area-list";
			for (const area of district.areas) {
				const item = document.createElement("li");
				item.textContent = `Area: ${area.nameBefore || "—"} / ${area.nameAfter || "—"}`;
				areaList.append(item);
			}
			if (district.areas.length === 0) {
				const item = document.createElement("li");
				item.textContent = "No areas";
				areaList.append(item);
			}
			districtSection.append(areaList);
			zoneSection.append(districtSection);
		}
		if (zone.districts.length === 0) {
			const empty = document.createElement("p");
			empty.className = "empty-state";
			empty.textContent = "No districts";
			zoneSection.append(empty);
		}
		zoneOutput.append(zoneSection);
	}
}

function renderImportedData(): void {
	renderMissionaries();
	renderZones();
	dataSummary.textContent = `${missionaries.length} ${missionaries.length === 1 ? "missionary" : "missionaries"} · ${zones.length} ${zones.length === 1 ? "zone" : "zones"}`;
}

renderImportedData();

function normalize(value: string): string {
	return value.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
}

function readField(row: Record<string, unknown>, aliases: string[]): string {
	const headers = Object.keys(row);
	for (const alias of aliases) {
		const header = headers.find((key) => normalize(key) === normalize(alias));
		if (header === undefined) continue;
		const value = row[header];
		if (value === null || value === undefined) continue;
		const text = String(value).trim();
		if (text) return text;
	}
	return "";
}

function periodAliases(field: string, period: Period): string[] {
	return [`${field}${period}`, `${period}${field}`, field];
}

function missionaryType(value: string): MissionaryType | null {
	switch (normalize(value)) {
		case "elder": return MissionaryType.Elder;
		case "sister": return MissionaryType.Sister;
		case "senior": return MissionaryType.Senior;
		case "temporary": return MissionaryType.Temporary;
		default: return null;
	}
}

function parseAssignment(row: Record<string, unknown>, period: Period): AssignmentRow {
	let firstName = readField(row, ["first name", "first", "given name", "fname", "first missionary name"]);
	let lastName = readField(row, ["last name", "last", "surname", "lname", "last missionary name"]);
	let type = missionaryType(readField(row, ["type", "missionary type", "elder sister", "gender"]));
	const fullName = readField(row, ["full name", "missionary name", "missionary", "name"]);

	if ((!firstName || !lastName) && fullName) {
		const parts = fullName.split(/\s+/).filter(Boolean);
		const leadingType = parts.length ? missionaryType(parts[0]) : null;
		if (!type && leadingType) {
			type = leadingType;
			parts.shift();
		}
		if (!firstName) firstName = parts.shift() ?? "";
		if (!lastName) lastName = parts.join(" ");
	}

	return {
		firstName,
		lastName,
		type,
		zone: readField(row, periodAliases("zone", period)),
		district: readField(row, periodAliases("district", period)),
		area: readField(row, periodAliases("area", period)),
		position: readField(row, periodAliases("position", period)),
	};
}

async function readAssignments(file: File, period: Period): Promise<AssignmentRow[]> {
	const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
	const firstSheetName = workbook.SheetNames[0];
	if (!firstSheetName) throw new Error("The workbook does not contain a worksheet.");

	const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
		workbook.Sheets[firstSheetName],
		{ defval: "", raw: false },
	);
	const populatedRows = rows
		.map((row, index) => ({ row, rowNumber: index + 2 }))
		.filter(({ row }) => Object.values(row).some((value) => value !== null && value !== undefined && String(value).trim() !== ""));

	if (populatedRows.length === 0) throw new Error("The first worksheet contains no data rows.");

	return populatedRows.map(({ row, rowNumber }) => {
		const assignment = parseAssignment(row, period);
		if (!assignment.firstName || !assignment.lastName || !assignment.zone || !assignment.district || !assignment.area) {
			throw new Error(`Row ${rowNumber} needs a first and last name, zone, district, and area.`);
		}
		return assignment;
	});
}

function assignName(target: PeriodName, period: Period, name: string): void {
	if (period === "before") target.nameBefore = name;
	else target.nameAfter = name;
}

function findOrCreateZone(name: string, period: Period): Zone {
	let zone = zones.find((candidate) => candidate.nameBefore === name || candidate.nameAfter === name);
	if (!zone) {
		zone = new Zone();
		zones.push(zone);
	}
	assignName(zone, period, name);
	return zone;
}

function findOrCreateDistrict(zone: Zone, name: string, period: Period): District {
	let district = zone.districts.find((candidate) => candidate.nameBefore === name || candidate.nameAfter === name);
	if (!district) district = new District(zone);
	assignName(district, period, name);
	return district;
}

function findOrCreateArea(district: District, name: string, period: Period): Area {
	let area = district.areas.find((candidate) => candidate.nameBefore === name || candidate.nameAfter === name);
	if (!area) area = new Area(district);
	assignName(area, period, name);
	return area;
}

function identityKey(firstName: string, lastName: string): string {
	return `${normalize(firstName)}|${normalize(lastName)}`;
}

function applyAssignments(assignments: AssignmentRow[], period: Period): { added: number; matched: number } {
	if (period === "before") {
		missionaries.splice(0, missionaries.length);
		zones.splice(0, zones.length);
	}

	const matchedThisUpload = new Set<Missionary>();
	let added = 0;
	let matched = 0;

	for (const assignment of assignments) {
		let missionary: Missionary | undefined;
		if (period === "after") {
			missionary = missionaries.find((candidate) =>
				identityKey(candidate.firstName, candidate.lastName) === identityKey(assignment.firstName, assignment.lastName)
				&& !matchedThisUpload.has(candidate));
		}

		if (missionary) {
			matchedThisUpload.add(missionary);
			matched += 1;
		} else {
			missionary = new Missionary();
			missionary.firstName = assignment.firstName;
			missionary.lastName = assignment.lastName;
			missionaries.push(missionary);
			added += 1;
		}

		if (assignment.type) missionary.type = assignment.type;
		const zone = findOrCreateZone(assignment.zone, period);
		const district = findOrCreateDistrict(zone, assignment.district, period);
		const area = findOrCreateArea(district, assignment.area, period);

		if (period === "before") {
			missionary.areaBefore = area;
			missionary.positionBefore = assignment.position;
		} else {
			missionary.areaAfter = area;
			missionary.positionAfter = assignment.position;
		}
	}

	return { added, matched };
}

function setStatus(element: HTMLElement, message: string, isError = false): void {
	element.textContent = message;
	element.classList.toggle("error", isError);
}

async function importFile(file: File, period: Period, nameElement: HTMLElement, statusElement: HTMLElement): Promise<void> {
	nameElement.textContent = file.name;

	if (!file.name.toLocaleLowerCase().endsWith(".xlsx")) {
		setStatus(statusElement, "Please choose an .xlsx file.", true);
		return;
	}
	if (period === "after" && missionaries.length === 0) {
		setStatus(statusElement, "Upload the before transfer board first.", true);
		return;
	}

	setStatus(statusElement, "Reading workbook...");
	try {
		const assignments = await readAssignments(file, period);
		const result = applyAssignments(assignments, period);
		renderImportedData();
		const summary = period === "before"
			? `${result.added} missionaries loaded; ${zones.length} zones tracked.`
			: `${result.matched} missionaries matched; ${result.added} new missionaries added; ${zones.length} zones tracked.`;
		setStatus(statusElement, summary);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Could not read this workbook.";
		setStatus(statusElement, message, true);
	}
}

function setupUploader(period: Period): void {
	const input = requireElement<HTMLInputElement>(`${period}-board-file`);
	const card = input.closest<HTMLElement>(".upload-card");
	if (!card) throw new Error(`Missing upload card for ${period} board.`);
	const nameElement = requireElement<HTMLElement>(`${period}-board-name`);
	const statusElement = requireElement<HTMLElement>(`${period}-board-status`);
	let dragDepth = 0;

	const handleFile = (file: File): void => {
		void importFile(file, period, nameElement, statusElement);
	};

	input.addEventListener("change", () => {
		const file = input.files?.[0];
		if (file) handleFile(file);
	});

	card.addEventListener("dragenter", (event) => {
		event.preventDefault();
		dragDepth += 1;
		card.classList.add("drag-over");
	});

	card.addEventListener("dragover", (event) => {
		event.preventDefault();
		if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
	});

	card.addEventListener("dragleave", (event) => {
		event.preventDefault();
		dragDepth = Math.max(0, dragDepth - 1);
		if (dragDepth === 0) card.classList.remove("drag-over");
	});

	card.addEventListener("drop", (event) => {
		event.preventDefault();
		dragDepth = 0;
		card.classList.remove("drag-over");
		const file = event.dataTransfer?.files[0];
		if (file) handleFile(file);
	});
}

setupUploader("before");
setupUploader("after");
