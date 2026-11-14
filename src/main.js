(() => {
	const {
		Direction,
		Apartment,
		Area,
		District,
		Missionary,
		MissionaryType,
		TripTime,
		TransferType,
		Route,
		Zone,
	} = window.TransferVanModels;
	const missionaries = [];
	const zones = [];
	const routes = [];
	const apartments = [];
	window.transferVanData = { missionaries, zones, routes, apartments };

	function requireElement(id) {
		const element = document.getElementById(id);
		if (!element) throw new Error(`Missing page element: ${id}`);
		return element;
	}

	const homeView = requireElement("home-view");
	const tripView = requireElement("trip-view");
	const nextView = requireElement("next-view");
	const verifyView = requireElement("verify-view");
	const printView = requireElement("print-view");
	const callView = requireElement("call-view");
	const callZoneSelect = requireElement("call-zone-select");
	const callZoneEmpty = requireElement("call-zone-empty");
	const callZoneOutput = requireElement("call-zone-output");
	const copyCallTableButton = requireElement("copy-call-table");
	const callCopyStatus = requireElement("call-copy-status");
	const tripRouteSelect = requireElement("trip-route-select");
	const tripRouteEmpty = requireElement("trip-route-empty");
	const tripTimeline = requireElement("trip-timeline");
	const tripTimelineViewport = requireElement("trip-timeline-viewport");
	const printRouteSelect = requireElement("print-route-select");
	const printRouteEmpty = requireElement("print-route-empty");
	const printRouteName = requireElement("print-route-name");
	const printRouteFrame = requireElement("print-route-frame");
	const printRouteResize = requireElement("print-route-resize");
	const printTimeline = requireElement("print-timeline");
	const routesView = requireElement("routes-view");
	const routeListView = requireElement("route-list-view");
	const routeEditorView = requireElement("route-editor-view");
	const routeEditorMode = requireElement("route-editor-mode");
	const routeEditorHeading = requireElement("route-editor-heading");
	const routeEditorBack = requireElement("route-editor-back");
	const routeNameInput = requireElement("route-name-input");
	const routeDraftList = requireElement("route-draft-list");
	const routeDraftCount = requireElement("route-draft-count");
	const availableApartmentList = requireElement("available-apartment-list");
	const availableApartmentCount = requireElement("available-apartment-count");
	const apartmentSearch = requireElement("apartment-search");
	const sidebarApartmentSearch = requireElement("sidebar-apartment-search");
	const saveRouteButton = requireElement("save-route");
	const saveDefaultsButton = requireElement("save-defaults");
	const defaultsSaveStatus = requireElement("defaults-save-status");
	const defaultsConfirmDialog = requireElement("defaults-confirm-dialog");
	const defaultsConfirmTitle = requireElement("defaults-confirm-title");
	const defaultsConfirmMessage = requireElement("defaults-confirm-message");
	const defaultsConfirmCancel = requireElement("defaults-confirm-cancel");
	const defaultsConfirmAccept = requireElement("defaults-confirm-accept");
	const exportDefaultsButton = requireElement("export-defaults");
	const openDefaultsButton = requireElement("open-defaults");
	const defaultsJsonFile = requireElement("defaults-json-file");
	const missionaryOutput = requireElement("missionary-output");
	const zoneOutput = requireElement("zone-output");
	const unindexedAreasButton = requireElement("unindexed-areas-button");
	const missingTransferTypesButton = requireElement("missing-transfer-types-button");
	const departingMissionariesButton = requireElement("departing-missionaries-button");
	const missingApartmentsButton = requireElement("missing-apartments-button");
	const unindexedAreasDialog = requireElement("unindexed-areas-dialog");
	const unindexedAreasList = requireElement("unindexed-areas-list");
	const reindexUnindexedAreasButton = requireElement("reindex-unindexed-areas");
	const missingTransferTypesDialog = requireElement("missing-transfer-types-dialog");
	const missingTransferTypesList = requireElement("missing-transfer-types-list");
	const recalculateMissingTransferTypesButton = requireElement("recalculate-missing-transfer-types");
	const missingApartmentsDialog = requireElement("missing-apartments-dialog");
	const missingApartmentsList = requireElement("missing-apartments-list");
	const refreshMissingApartmentsButton = requireElement("refresh-missing-apartments");
	const departingMissionariesDialog = requireElement("departing-missionaries-dialog");
	const departingMissionariesForm = requireElement("departing-missionaries-form");
	const departingMissionariesConfirm = requireElement("confirm-departing-missionaries");
	const departingMissionarySearch = requireElement("departing-missionary-search");
	const departingMissionariesList = requireElement("departing-missionaries-list");
	const dataSummary = requireElement("data-summary");
	const missionaryCount = requireElement("missionary-count");
	const zoneCount = requireElement("zone-count");
	const routesList = requireElement("routes-list");
	const apartmentsList = requireElement("apartments-list");
	const routesCount = requireElement("routes-count");
	const apartmentsCount = requireElement("apartments-count");
	const routesSidebar = requireElement("routes-sidebar");
	const sidebarBackdrop = requireElement("sidebar-backdrop");
	const sidebarToggle = requireElement("sidebar-toggle");
	const mapViewport = requireElement("map-viewport");
	const mapStage = requireElement("map-stage");
	const overviewMap = requireElement("overview-map");
	const mapTitle = requireElement("map-title");
	const pinPickBanner = requireElement("pin-pick-banner");
	const cancelPinSelection = requireElement("cancel-pin-selection");
	const zoomOutButton = requireElement("zoom-out");
	const zoomInButton = requireElement("zoom-in");
	const zoomFitButton = requireElement("zoom-fit");
	const zoomLevel = requireElement("zoom-level");
	const singleApartmentDialog = requireElement("single-apartment-dialog");
	const singleApartmentForm = requireElement("single-apartment-form");
	const singleApartmentName = requireElement("single-apartment-name");
	const singleApartmentAddPin = requireElement("single-apartment-add-pin");
	const editApartmentDialog = requireElement("edit-apartment-dialog");
	const editApartmentForm = requireElement("edit-apartment-form");
	const editApartmentName = requireElement("edit-apartment-name");
	const editApartmentAddPin = requireElement("edit-apartment-add-pin");
	const editApartmentAddress = requireElement("edit-apartment-address");
	const editApartmentPhones = requireElement("edit-apartment-phones");
	const editApartmentTeachingAreas = requireElement("edit-apartment-teaching-areas");
	const batchApartmentDialog = requireElement("batch-apartment-dialog");
	const batchApartmentForm = requireElement("batch-apartment-form");
	const batchApartmentFile = requireElement("batch-apartment-file");
	const batchApartmentDropzone = requireElement("batch-apartment-dropzone");
	const batchApartmentFilename = requireElement("batch-apartment-filename");
	const batchApartmentStatus = requireElement("batch-apartment-status");
	const batchApartmentReview = requireElement("batch-apartment-review");
	const batchApartmentReviewSummary = requireElement("batch-apartment-review-summary");
	const batchApartmentReviewList = requireElement("batch-apartment-review-list");
	const saveBatchApartments = requireElement("save-batch-apartments");
	const batchApartmentUnnamedCount = requireElement("batch-apartment-unnamed-count");
	const batchApartmentDuplicateCount = requireElement("batch-apartment-duplicate-count");
	const batchApartmentExistingConflictCount = requireElement("batch-apartment-existing-conflict-count");
	const batchComparisonDialog = requireElement("batch-comparison-dialog");
	const batchComparisonForm = requireElement("batch-comparison-form");
	const batchComparisonTarget = requireElement("batch-comparison-target");
	const batchComparisonFields = requireElement("batch-comparison-fields");
	const batchComparisonSourceNotice = requireElement("batch-comparison-source-notice");
	const batchComparisonMerge = requireElement("batch-comparison-merge");
	let minimumMapScale = 0;
	let mapScale = 0;
	let pendingBatchApartments = [];
	let matchedBatchApartmentCount = 0;
	let batchComparison = null;
	const unindexedAreas = new Set();
	const ignoredUnindexedAreas = new Set();
	const ignoredTransferTypeMissionaries = new Set();
	const ignoredMissingApartmentMissionaries = new Set();
	const callNoteOverrides = new WeakMap();
	let hasBeforeBoard = false;
	let hasAfterBoard = false;
	let departingSelectionConfirmed = false;
	let departingSelection = new Map();
	let activeTripRoute = null;
	let tripPlansByRoute = new WeakMap();
	const sharedAfternoonFirstStopHouseBefore = new Set();
	let tripDrag = null;
	let tripAreaDrag = null;
	let editingRouteDraft = null;
	let editingRouteIndex = null;
	let draggedRouteItem = null;
	let mapApartmentDrag = null;
	const apartmentForMapPin = new WeakMap();
	const suppressNextMapPinClick = new WeakSet();
	let hasUnsavedDefaultChanges = false;
	let defaultsConfirmationAction = null;
	let defaultsInitialization = Promise.resolve();
	let singleApartmentDraft = null;
	let editingApartment = null;
	let editApartmentVisualPin = null;
	let pinSelectionSession = null;
	let apartmentTeachingAreaDistrict = null;
	let activePanPointer = null;
	let panStartX = 0;
	let panStartY = 0;
	let panStartScrollLeft = 0;
	let panStartScrollTop = 0;
	let panMoved = false;

	const appViews = [homeView, tripView, nextView, verifyView, printView, callView];
	const viewByTarget = new Map([
		["home", homeView],
		["trip", tripView],
		["next", nextView],
		["verify", verifyView],
		["print", printView],
		["call", callView],
	]);
	const viewNavigationMenus = document.querySelectorAll(".view-navigation");
	const viewNavigationButtons = document.querySelectorAll(".view-navigation [data-view-target]");
	const viewMenuToggles = document.querySelectorAll(".view-menu-toggle");
	const tripNavigationButtons = document.querySelectorAll('.view-navigation [data-view-target="trip"]');
	const stopsNavigationButtons = document.querySelectorAll('.view-navigation [data-view-target="next"]');
	const gatedViewButtons = document.querySelectorAll(
		'.view-navigation [data-view-target="next"], .view-navigation [data-view-target="verify"], .view-navigation [data-view-target="print"], .view-navigation [data-view-target="call"]',
	);
	gatedViewButtons.forEach((button) => { button.disabled = true; });

	function updateViewNavigation(target) {
		for (const button of viewNavigationButtons) {
			if (button.dataset.viewTarget === target) button.setAttribute("aria-current", "page");
			else button.removeAttribute("aria-current");
		}
	}
	updateViewNavigation("home");

	function closeViewMenus() {
		for (const navigation of viewNavigationMenus) navigation.classList.remove("is-open");
		for (const toggle of viewMenuToggles) {
			toggle.setAttribute("aria-expanded", "false");
			toggle.setAttribute("aria-label", "Open views menu");
			toggle.title = "Open views menu";
		}
	}

	for (const toggle of viewMenuToggles) {
		toggle.addEventListener("click", () => {
			const navigation = toggle.closest(".view-navigation");
			const shouldOpen = !navigation.classList.contains("is-open");
			closeViewMenus();
			if (!shouldOpen) return;
			navigation.classList.add("is-open");
			toggle.setAttribute("aria-expanded", "true");
			toggle.setAttribute("aria-label", "Close views menu");
			toggle.title = "Close views menu";
		});
	}

	async function showAppView(target) {
		closeViewMenus();
		if (target === "routes") {
			await defaultsInitialization;
			appViews.forEach((view) => { view.hidden = true; });
			routesView.hidden = false;
			setSidebarOpen(false);
			updateViewNavigation(null);
			window.requestAnimationFrame(() => fitOverviewMap(true));
			window.scrollTo(0, 0);
			return;
		}

		const destination = viewByTarget.get(target);
		if (!destination) return;
		if (target === "next" || target === "print") await defaultsInitialization;
		if (target === "next") renderTripTimeline();
		if (target === "print") {
			renderTripTimeline(activeTripRoute);
		}
		if (target === "call") renderCallView();

		routesView.hidden = true;
		appViews.forEach((view) => { view.hidden = view !== destination; });
		if (target === "print") updatePrintRouteResizeValue();
		updateViewNavigation(target);
		window.scrollTo(0, 0);
	}

	requireElement("new-trip").addEventListener("click", () => { void showAppView("trip"); });
	for (const button of viewNavigationButtons) {
		button.addEventListener("click", () => { void showAppView(button.dataset.viewTarget); });
	}

	tripRouteSelect.addEventListener("change", () => {
		const route = routes[Number(tripRouteSelect.value)];
		renderTripTimeline(route ?? null);
	});

	printRouteSelect.addEventListener("change", () => {
		const route = routes[Number(printRouteSelect.value)];
		renderTripTimeline(route ?? null);
	});

	callZoneSelect.addEventListener("change", renderCallZoneTable);
	copyCallTableButton.addEventListener("click", async () => {
		const table = callZoneOutput.querySelector("table");
		if (!table) return;

		const copy = table.cloneNode(true);
		const inputs = table.querySelectorAll(".call-note-editor textarea");
		copy.querySelectorAll(".call-note-editor").forEach((form, index) => {
			const note = document.createElement("span");
			note.className = "call-note-text";
			note.textContent = inputs[index].value;
			form.replaceWith(note);
		});
		copy.querySelectorAll("button").forEach((button) => button.remove());
		copy.querySelectorAll(".call-note-text").forEach((note) => { note.style.whiteSpace = "pre-wrap"; });
		copy.setAttribute("border", "1");
		copy.style.borderCollapse = "collapse";
		copy.querySelectorAll("th, td").forEach((cell) => { cell.style.border = "1px solid #000"; });

		const spans = [];
		const rows = Array.from(copy.rows, (row) => {
			const occupied = spans.map((remaining) => remaining > 0);
			for (let column = 0; column < spans.length; column += 1) {
				if (spans[column] > 0) spans[column] -= 1;
			}
			const values = Array.from({ length: occupied.length }, () => "");
			let column = 0;
			for (const cell of row.cells) {
				while (occupied[column]) column += 1;
				values[column] = cell.textContent;
				for (let offset = 0; offset < cell.colSpan; offset += 1) {
					occupied[column + offset] = true;
					if (offset > 0) values[column + offset] = "";
					if (cell.rowSpan > 1) spans[column + offset] = cell.rowSpan - 1;
				}
				column += cell.colSpan;
			}
			return values.map((value) => /[\t\r\n"]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value).join("\t");
		});
		const text = rows.join("\r\n");
		try {
			if (!navigator.clipboard) throw new Error("Clipboard access is unavailable in this browser.");
			if (window.ClipboardItem && navigator.clipboard.write) {
				await navigator.clipboard.write([new window.ClipboardItem({
					"text/plain": new Blob([text], { type: "text/plain" }),
					"text/html": new Blob([copy.outerHTML], { type: "text/html" }),
				})]);
			} else {
				await navigator.clipboard.writeText(text);
			}
			setStatus(callCopyStatus, "Table copied.");
		} catch (error) {
			const message = error instanceof Error ? error.message : "Clipboard access failed.";
			setStatus(callCopyStatus, `Could not copy table: ${message}`, true);
		}
	});

	let printResizeStart = null;
	printRouteResize.addEventListener("pointerdown", (event) => {
		if (event.button !== 0) return;
		event.preventDefault();
		const limits = getPrintRouteWidthLimits();
		printResizeStart = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startWidth: printRouteFrame.getBoundingClientRect().width,
			limits,
		};
		printRouteResize.setPointerCapture(event.pointerId);
	});
	printRouteResize.addEventListener("pointermove", (event) => {
		if (!printResizeStart || event.pointerId !== printResizeStart.pointerId) return;
		setPrintRouteFrameWidth(
			printResizeStart.startWidth + event.clientX - printResizeStart.startX,
			printResizeStart.limits,
		);
	});
	printRouteResize.addEventListener("pointerup", finishPrintRouteResize);
	printRouteResize.addEventListener("pointercancel", finishPrintRouteResize);
	printRouteResize.addEventListener("keydown", (event) => {
		const limits = getPrintRouteWidthLimits();
		const currentWidth = printRouteFrame.getBoundingClientRect().width;
		if (event.key === "ArrowLeft") setPrintRouteFrameWidth(currentWidth - 24, limits);
		else if (event.key === "ArrowRight") setPrintRouteFrameWidth(currentWidth + 24, limits);
		else if (event.key === "Home") setPrintRouteFrameWidth(limits.maxWidth, limits);
		else if (event.key === "End") setPrintRouteFrameWidth(limits.minWidth, limits);
		else return;
		event.preventDefault();
	});
	window.addEventListener("resize", () => {
		if (!printView.hidden) updatePrintRouteResizeValue();
	});

	function getPrintRouteWidthLimits() {
		const maxWidth = printRouteFrame.parentElement.clientWidth;
		return { minWidth: Math.min(320, maxWidth), maxWidth };
	}

	function updatePrintRouteResizeValue() {
		const limits = getPrintRouteWidthLimits();
		if (printRouteFrame.style.width) {
			setPrintRouteFrameWidth(Number.parseFloat(printRouteFrame.style.width), limits);
		} else {
			updatePrintRouteResizeAttributes(printRouteFrame.getBoundingClientRect().width, limits);
		}
	}

	function setPrintRouteFrameWidth(width, limits) {
		const boundedWidth = Math.max(limits.minWidth, Math.min(limits.maxWidth, width));
		printRouteFrame.style.width = `${boundedWidth}px`;
		updatePrintRouteResizeAttributes(boundedWidth, limits);
	}

	function updatePrintRouteResizeAttributes(width, limits) {
         printRouteResize.setAttribute("aria-valuemin", String(Math.round(limits.minWidth)));
         printRouteResize.setAttribute("aria-valuemax", String(Math.round(limits.maxWidth)));
         printRouteResize.setAttribute("aria-valuenow", String(Math.round(width)));
         printRouteResize.setAttribute("aria-valuetext", `${Math.round(width)} pixels`);
     }

	function finishPrintRouteResize(event) {
		if (!printResizeStart || event.pointerId !== printResizeStart.pointerId) return;
		printResizeStart = null;
	}

	function setSidebarOpen(isOpen) {
		routesSidebar.classList.toggle("is-open", isOpen);
		routesView.classList.toggle("menu-open", isOpen);
		sidebarToggle.setAttribute("aria-expanded", String(isOpen));
		sidebarToggle.setAttribute("aria-label", isOpen ? "Close routes and apartments" : "Open routes and apartments");
		sidebarToggle.title = isOpen ? "Close menu" : "Open menu";
	}

	const DEFAULTS_STORAGE_KEY = "transfer-van-calculator.defaults.v1";
	const BUILT_IN_ROUTE_NAMES = [
		"North to Duma",
		"South to Duma",
		"Duma to North",
		"Duma to South",
	];

	function defaultRouteTime(name) {
		if (name === "Duma to North" || name === "Duma to South") return TripTime.Afternoon;
		if (name === "North to Duma" || name === "South to Duma") return TripTime.Morning;
		return null;
	}

		function defaultRouteDirection(name) {
		if (name === "Duma to North" || name === "North to Duma") return Direction.North;
		if (name === "Duma to South" || name === "South to Duma") return Direction.South;
		return null;
	}

	function createBuiltInRoutes() {
		return BUILT_IN_ROUTE_NAMES.map((name) => {
			const route = new Route();
			route.name = name;
			route.time = defaultRouteTime(name);
			route.direction = defaultRouteDirection(name);
			return route;
		});
	}

	function setDefaultChangesDirty(isDirty, status = "") {
		hasUnsavedDefaultChanges = isDirty;
		saveDefaultsButton.disabled = !isDirty;
		defaultsSaveStatus.textContent = status || (isDirty ? "Unsaved changes" : "Saved defaults");
		defaultsSaveStatus.classList.toggle("has-unsaved-changes", isDirty);
		defaultsSaveStatus.classList.toggle("error", Boolean(status) && !isDirty);
	}

	function serializeArea(area) {
		return {
			nameBefore: area.nameBefore,
			nameAfter: area.nameAfter,
			district: {
				nameBefore: area.district.nameBefore,
				nameAfter: area.district.nameAfter,
				zone: {
					nameBefore: area.district.zone.nameBefore,
					nameAfter: area.district.zone.nameAfter,
				},
			},
		};
	}

	function restoreArea(data) {
		const zone = new Zone();
		zone.nameBefore = data?.district?.zone?.nameBefore ?? "";
		zone.nameAfter = data?.district?.zone?.nameAfter ?? "";
		const district = new District(zone);
		district.nameBefore = data?.district?.nameBefore ?? "";
		district.nameAfter = data?.district?.nameAfter ?? "";
		const area = new Area(district);
		area.nameBefore = data?.nameBefore ?? "";
		area.nameAfter = data?.nameAfter ?? "";
		return area;
	}

	function serializeApartment(apartment) {
		return {
			name: apartment.name,
			address: apartment.address,
			phoneNumbers: [...apartment.phoneNumbers],
			visualPin: apartment.visualPin ? { ...apartment.visualPin } : null,
			teachingAreas: apartment.teachingAreas.map(serializeArea),
		};
	}

	function restoreApartment(data) {
		const apartment = new Apartment();
		apartment.name = String(data?.name ?? "");
		apartment.address = String(data?.address ?? "");
		apartment.phoneNumbers = Array.isArray(data?.phoneNumbers) ? data.phoneNumbers.map(String) : [];
		const pin = data?.visualPin;
		apartment.visualPin = Number.isFinite(pin?.x) && Number.isFinite(pin?.y) ? { x: pin.x, y: pin.y } : null;
		apartment.teachingAreas = Array.isArray(data?.teachingAreas) ? data.teachingAreas.map(restoreArea) : [];
		return apartment;
	}

	function serializeDefaultData() {
		return {
			version: 1,
			apartments: apartments.map(serializeApartment),
			routes: routes.map((route) => ({
				name: route.name,
				time: route.time,
				stops: route.stops.map((stop) => ({
					primaryApartmentIndex: apartments.indexOf(stop.primaryApartment),
					secondaryApartmentIndexes: stop.secondaryApartments.map((apartment) => apartments.indexOf(apartment)),
				})),
				travelTimes: route.travelTimeTable.map((row) => [...row]),
			})),
		};
	}

	function deserializeDefaultData(data) {
		if (!data || !Array.isArray(data.apartments) || !Array.isArray(data.routes)) {
			throw new Error("JSON must contain apartments and routes arrays.");
		}
		if (data.version !== undefined && data.version !== 1) throw new Error("This JSON version is not supported.");

		const restoredApartments = data.apartments.map(restoreApartment);
		const restoredRoutes = data.routes.map((routeData) => {
			const route = new Route();
			route.name = String(routeData?.name ?? "");
			route.time = Object.values(TripTime).includes(routeData?.time)
				? routeData.time
				: defaultRouteTime(route.name);
			const stopRecords = Array.isArray(routeData?.stops)
				? routeData.stops
				: (routeData?.apartmentIndexes ?? []).map((apartmentIndex) => ({ primaryApartmentIndex: apartmentIndex }));
			for (const stopData of stopRecords) {
				const primaryApartment = restoredApartments[stopData?.primaryApartmentIndex ?? stopData?.apartmentIndex];
				if (!primaryApartment) continue;
				const stop = route.addStop(primaryApartment);
				for (const apartmentIndex of stopData?.secondaryApartmentIndexes ?? []) {
					const secondaryApartment = restoredApartments[apartmentIndex];
					if (secondaryApartment) route.addSecondaryApartment(stop, secondaryApartment);
				}
			}
			const storedTravelTimes = routeData?.travelTimes ?? [];
			route.travelTimeTable = route.stops.map((_, rowIndex) =>
				route.stops.map((_, columnIndex) => {
					const time = storedTravelTimes[rowIndex]?.[columnIndex];
					return typeof time === "number" && Number.isFinite(time) ? time : null;
				}));
			return route;
		});
		return { restoredApartments, restoredRoutes };
	}

	function replaceDefaultData(data) {
		const { restoredApartments, restoredRoutes } = deserializeDefaultData(data);
		apartments.splice(0, apartments.length, ...restoredApartments);
		routes.splice(0, routes.length, ...restoredRoutes);
	}

	function loadSavedDefaults() {
		try {
			const saved = localStorage.getItem(DEFAULTS_STORAGE_KEY);
			if (!saved) return false;
			replaceDefaultData(JSON.parse(saved));
			setDefaultChangesDirty(false);
			return true;
		} catch (error) {
			apartments.splice(0, apartments.length);
			routes.splice(0, routes.length);
			return false;
		}
	}

	async function loadRootTravelsJson() {
		if (window.location.protocol === "file:") {
			defaultsSaveStatus.textContent = "Open JSON to load travels.json when opening this file directly.";
			return false;
		}
		const response = await fetch("./travels.json", { cache: "no-store" });
		if (!response.ok) return false;
		replaceDefaultData(await response.json());
		setDefaultChangesDirty(false);
		return true;
	}

	async function initializeDefaultData() {
		if (loadSavedDefaults()) {
			renderRouteLists();
			return;
		}

		try {
			if (await loadRootTravelsJson()) {
				renderRouteLists();
				return;
			}
		} catch (error) {
			if (window.location.protocol === "file:") {
				defaultsSaveStatus.textContent = "Open JSON to load travels.json when opening this file directly.";
			}
		}

		apartments.splice(0, apartments.length);
		routes.splice(0, routes.length, ...createBuiltInRoutes());
		if (window.location.protocol !== "file:") setDefaultChangesDirty(false, "Using built-in routes");
		renderRouteLists();
	}

	function persistDefaultData() {
		try {
			localStorage.setItem(DEFAULTS_STORAGE_KEY, JSON.stringify(serializeDefaultData()));
			setDefaultChangesDirty(false, "Defaults saved");
			return true;
		} catch (error) {
			setDefaultChangesDirty(true, "Could not save defaults");
			return false;
		}
	}

	async function openDefaultsJson(file) {
		try {
			const data = JSON.parse(await file.text());
			const restored = deserializeDefaultData(data);
			apartments.splice(0, apartments.length, ...restored.restoredApartments);
			routes.splice(0, routes.length, ...restored.restoredRoutes);
			setDefaultChangesDirty(true, "JSON opened; save edits to keep these changes");
			renderRouteLists();
		} catch (error) {
			defaultsSaveStatus.textContent = error instanceof Error ? error.message : "Could not open this JSON file.";
			defaultsSaveStatus.classList.add("error");
		}
		defaultsJsonFile.value = "";
	}

	async function exportDefaultsJson() {
		const contents = JSON.stringify(serializeDefaultData(), null, 2);
		if (typeof window.showSaveFilePicker === "function") {
			try {
				const handle = await window.showSaveFilePicker({
					suggestedName: "travels.json",
					types: [{ description: "JSON files", accept: { "application/json": [".json"] } }],
				});
				const writable = await handle.createWritable();
				await writable.write(contents);
				await writable.close();
			} catch (error) {
				if (error?.name === "AbortError") return;
				defaultsSaveStatus.textContent = "Could not export JSON";
				defaultsSaveStatus.classList.add("error");
				return;
			}
		} else {
			const blob = new Blob([contents], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "travels.json";
			link.click();
			URL.revokeObjectURL(url);
		}
		defaultsSaveStatus.textContent = hasUnsavedDefaultChanges
			? "JSON exported; unsaved changes remain"
			: "JSON exported";
		defaultsSaveStatus.classList.remove("error");
	}

	function confirmDefaultsAction(title, message, confirmLabel, action) {
		defaultsConfirmationAction = action;
		defaultsConfirmTitle.textContent = title;
		defaultsConfirmMessage.textContent = message;
		defaultsConfirmAccept.textContent = confirmLabel;
		defaultsConfirmDialog.showModal();
	}

	function renderRouteLists() {
		routesList.replaceChildren();
		routesCount.textContent = String(routes.length);
		apartmentsCount.textContent = String(apartments.length);

		if (routes.length === 0) {
			const empty = document.createElement("li");
			empty.className = "collection-empty";
			empty.textContent = "No routes yet";
			routesList.append(empty);
		} else {
			routes.forEach((route, index) => {
				const item = document.createElement("li");
				item.className = "saved-route-row";
				const label = document.createElement("span");
				label.className = "saved-route-name";
				label.textContent = route.name || `Route ${index + 1}`;
				const detail = document.createElement("span");
				detail.className = "saved-route-detail";
				detail.textContent = `${route.stops.length} ${route.stops.length === 1 ? "stop" : "stops"}`;
				item.tabIndex = 0;
				item.setAttribute("role", "button");
				item.addEventListener("click", () => openRouteEditor(index));
				item.addEventListener("keydown", (event) => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						openRouteEditor(index);
					}
				});
				const editButton = document.createElement("button");
				editButton.className = "apartment-row-action";
				editButton.type = "button";
				editButton.setAttribute("aria-label", `Edit ${route.name || `Route ${index + 1}`}`);
				editButton.title = "Edit route";
				editButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" /></svg>';
				editButton.addEventListener("click", (event) => {
					event.stopPropagation();
					openRouteEditor(index);
				});
				item.append(label, detail, editButton);
				routesList.append(item);
			});
		}

		renderApartmentList();
		renderMapPins();
	}

	function apartmentMatchesSearch(apartment, query) {
		return !query || normalize(apartment.name).includes(query)
			|| apartment.teachingAreas.some((area) =>
				normalize(area.nameBefore).includes(query) || normalize(area.nameAfter).includes(query));
	}

	function renderApartmentList() {
		apartmentsList.replaceChildren();
		const query = normalize(sidebarApartmentSearch.value.trim());
		const matchingApartments = apartments.filter((apartment) => apartmentMatchesSearch(apartment, query));
		if (matchingApartments.length === 0) {
			const empty = document.createElement("li");
			empty.className = "collection-empty";
			empty.textContent = apartments.length === 0 ? "No apartments yet" : "No matching apartments";
			apartmentsList.append(empty);
		} else {
			matchingApartments.forEach((apartment) => {
				const item = document.createElement("li");
				item.className = "apartment-list-row";
				const label = document.createElement("span");
				label.className = "apartment-list-name";
				label.textContent = apartment.name || apartment.address || `Apartment ${apartments.indexOf(apartment) + 1}`;
				const actions = document.createElement("div");
				actions.className = "apartment-list-actions";
				if (apartment.visualPin) {
					const focusButton = document.createElement("button");
					focusButton.className = "apartment-row-action locate-apartment";
					focusButton.type = "button";
					focusButton.setAttribute("aria-label", "Focus map on apartment");
					focusButton.title = "Show apartment on map";
					focusButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>';
					focusButton.addEventListener("click", () => focusApartmentPin(apartment));
					actions.append(focusButton);
				}
				const editButton = document.createElement("button");
				editButton.className = "apartment-row-action";
				editButton.type = "button";
				editButton.setAttribute("aria-label", "Edit apartment");
				editButton.title = "Edit apartment";
				editButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" /></svg>';
				editButton.addEventListener("click", () => openEditApartment(apartment));
				const deleteButton = document.createElement("button");
				deleteButton.className = "apartment-row-action delete-apartment";
				deleteButton.type = "button";
				deleteButton.setAttribute("aria-label", "Delete apartment");
				deleteButton.title = "Delete apartment";
				deleteButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" /></svg>';
				deleteButton.addEventListener("click", () => deleteApartment(apartment));
				actions.append(editButton, deleteButton);
				item.append(label, actions);
				apartmentsList.append(item);
			});
		}
	}

	function cloneRoute(route) {
		const draft = new Route();
		draft.name = route.name || "";
		draft.time = route.time;
		for (const stop of route.stops) {
			const clonedStop = draft.addStop(stop.primaryApartment);
			for (const apartment of stop.secondaryApartments) draft.addSecondaryApartment(clonedStop, apartment);
		}
		draft.travelTimeTable = route.travelTimeTable.map((row) => [...row]);
		return draft;
	}

	function updateRouteSaveState() {
		saveRouteButton.disabled = !routeNameInput.value.trim();
	}

	function openRouteEditor(routeIndex = null) {
		editingRouteIndex = routeIndex;
		editingRouteDraft = routeIndex === null ? new Route() : cloneRoute(routes[routeIndex]);
		routeNameInput.value = editingRouteDraft.name;
		apartmentSearch.value = "";
		routeEditorMode.textContent = routeIndex === null ? "New route" : "Edit route";
		routeEditorHeading.textContent = routeIndex === null ? "Build a route" : editingRouteDraft.name;
		routeListView.hidden = true;
		routeEditorView.hidden = false;
		routesView.classList.add("editing-route");
		setSidebarOpen(window.matchMedia("(max-width: 900px)").matches);
		renderRouteEditor();
		updateRouteSaveState();
		window.requestAnimationFrame(() => fitOverviewMap());
	}

	function closeRouteEditor() {
		editingRouteDraft = null;
		editingRouteIndex = null;
		draggedRouteItem = null;
		mapApartmentDrag = null;
		routeEditorView.hidden = true;
		routeListView.hidden = false;
		routesView.classList.remove("editing-route");
		setSidebarOpen(false);
		renderRouteLists();
		window.requestAnimationFrame(() => fitOverviewMap());
	}

	function createApartmentPinButton(apartment) {
		if (!apartment.visualPin) return null;
		const button = document.createElement("button");
		button.className = "apartment-row-action locate-apartment";
		button.type = "button";
		button.setAttribute("aria-label", `Show ${apartment.name || "apartment"} on map`);
		button.title = "Show apartment on map";
		button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>';
		button.addEventListener("click", () => focusApartmentPin(apartment));
		return button;
	}

	function createMoveButton(label, direction, onClick) {
		const button = document.createElement("button");
		button.className = "apartment-row-action route-move-button";
		button.type = "button";
		button.setAttribute("aria-label", `${direction === "into-route" ? "Add" : "Remove"} ${label} ${direction === "into-route" ? "to" : "from"} route`);
		button.title = direction === "into-route" ? "Add to route" : "Remove from route";
		const arrow = direction === "into-route"
			? "<path d='M19 12H5m6 6-6-6 6-6' />"
			: "<path d='M5 12h14m-6-6 6 6-6 6' />";
		button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${arrow}</svg>`;
		button.addEventListener("click", onClick);
		return button;
	}

	function reorderRouteStops(movedStop, insertionIndex) {
		if (!editingRouteDraft) return;
		const originalOrder = [...editingRouteDraft.stops];
		const fromIndex = originalOrder.indexOf(movedStop);
		if (fromIndex === -1) return;
		const targetIndex = fromIndex < insertionIndex ? insertionIndex - 1 : insertionIndex;
		if (targetIndex === fromIndex) return;
		const [stop] = editingRouteDraft.stops.splice(fromIndex, 1);
		editingRouteDraft.stops.splice(Math.max(0, Math.min(targetIndex, editingRouteDraft.stops.length)), 0, stop);
		const permutation = editingRouteDraft.stops.map((stop) => originalOrder.indexOf(stop));
		const oldTravelTimes = editingRouteDraft.travelTimeTable.map((row) => [...row]);
		const reorderedTravelTimes = permutation.map((rowIndex) =>
			permutation.map((columnIndex) => oldTravelTimes[rowIndex]?.[columnIndex] ?? null));
		editingRouteDraft.travelTimeTable.splice(0, editingRouteDraft.travelTimeTable.length, ...reorderedTravelTimes);
		renderRouteEditor();
	}

	function removeApartmentFromDraft(apartment) {
		if (!editingRouteDraft) return;
		editingRouteDraft.removeApartment(apartment);
		renderRouteEditor();
	}

	function addApartmentToDraft(apartment) {
		if (!editingRouteDraft || editingRouteDraft.apartments.includes(apartment)) return;
		editingRouteDraft.addStop(apartment);
		renderRouteEditor();
	}

	function moveApartmentToRouteEnd(apartment) {
		if (!editingRouteDraft) return;
		const currentStop = editingRouteDraft.stops.find((stop) => stop.apartments.includes(apartment));
		if (!currentStop) {
			addApartmentToDraft(apartment);
			return;
		}
		if (currentStop.primaryApartment === apartment && currentStop.secondaryApartments.length === 0) {
			reorderRouteStops(currentStop, editingRouteDraft.stops.length);
		} else {
			editingRouteDraft.removeApartment(apartment);
			editingRouteDraft.addStop(apartment);
		}
		renderRouteEditor();
	}

	function renderRouteEditor() {
		if (!editingRouteDraft) return;
		renderMapPins();
		routeDraftList.replaceChildren();
		routeDraftCount.textContent = String(editingRouteDraft.stops.length);
		if (editingRouteDraft.stops.length === 0) {
			const empty = document.createElement("li");
			empty.className = "collection-empty route-empty";
			empty.textContent = "Add apartments from the list.";
			routeDraftList.append(empty);
		} else {
			editingRouteDraft.stops.forEach((stop, index) => {
				const stopRow = document.createElement("li");
				stopRow.className = "route-stop-row";
				stopRow.addEventListener("dragover", (event) => {
					if (!draggedRouteItem) return;
					event.preventDefault();
					const droppingOnApartment = event.target instanceof Element
						&& event.target.closest(".route-stop-primary, .route-secondary-row");
					const canMerge = droppingOnApartment && (
						draggedRouteItem.type === "stop"
							? draggedRouteItem.stop !== stop
							: draggedRouteItem.sourceStop !== stop
					);
					stopRow.classList.toggle("merge-target", Boolean(canMerge));
					stopRow.classList.toggle("drag-target", !droppingOnApartment);
				});
				stopRow.addEventListener("dragleave", () => stopRow.classList.remove("drag-target", "merge-target"));
				stopRow.addEventListener("drop", (event) => {
					if (!draggedRouteItem) return;
					event.preventDefault();
					stopRow.classList.remove("drag-target", "merge-target");
					const draggedItem = draggedRouteItem;
					draggedRouteItem = null;
					const droppingOnApartment = event.target instanceof Element
						&& event.target.closest(".route-stop-primary, .route-secondary-row");
					if (draggedItem.type === "stop") {
						if (droppingOnApartment && draggedItem.stop !== stop) {
							editingRouteDraft.mergeStops(draggedItem.stop, stop);
						} else if (!droppingOnApartment) {
							const bounds = stopRow.getBoundingClientRect();
							const insertionIndex = event.clientY < bounds.top + bounds.height / 2 ? index : index + 1;
							reorderRouteStops(draggedItem.stop, insertionIndex);
						}
					} else if (droppingOnApartment) {
						if (draggedItem.sourceStop !== stop) {
							editingRouteDraft.removeApartment(draggedItem.apartment);
							editingRouteDraft.addSecondaryApartment(stop, draggedItem.apartment);
						}
					} else {
						const bounds = stopRow.getBoundingClientRect();
						const insertionIndex = event.clientY < bounds.top + bounds.height / 2 ? index : index + 1;
						editingRouteDraft.removeApartment(draggedItem.apartment);
						const newStop = editingRouteDraft.addStop(draggedItem.apartment);
						reorderRouteStops(newStop, insertionIndex);
					}
					renderRouteEditor();
				});

				const primaryRow = document.createElement("div");
				primaryRow.className = "route-stop-primary";
				const handle = document.createElement("button");
				handle.className = "route-reorder-handle";
				handle.type = "button";
				handle.draggable = true;
				handle.setAttribute("aria-label", `Reorder stop ${index + 1}`);
				handle.title = "Drag to reorder or drop on an apartment to combine stops";
				handle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M7 6h10M7 12h10M7 18h10" /></svg>';
				handle.addEventListener("dragstart", (event) => {
					draggedRouteItem = { type: "stop", stop };
					stopRow.classList.add("is-dragging");
					if (event.dataTransfer) {
						event.dataTransfer.effectAllowed = "move";
						event.dataTransfer.setData("text/plain", String(index));
					}
				});
				handle.addEventListener("dragend", () => {
					draggedRouteItem = null;
					renderRouteEditor();
				});

				const primaryApartment = stop.primaryApartment;
				const name = document.createElement("span");
				name.className = "route-apartment-name";
				name.textContent = primaryApartment?.name || primaryApartment?.address || `Stop ${index + 1}`;
				const actions = document.createElement("div");
				actions.className = "route-apartment-actions";
				const pinButton = createApartmentPinButton(primaryApartment);
				if (pinButton) actions.append(pinButton);
				actions.append(createMoveButton(primaryApartment?.name || "apartment", "from-route", () => removeApartmentFromDraft(primaryApartment)));
				primaryRow.append(handle, name, actions);
				stopRow.append(primaryRow);

				if (stop.secondaryApartments.length > 0) {
					const secondaryList = document.createElement("ul");
					secondaryList.className = "route-secondary-list";
					for (const secondaryApartment of stop.secondaryApartments) {
						const secondaryRow = document.createElement("li");
						secondaryRow.className = "route-secondary-row";

						const secondaryHandle = document.createElement("button");
						secondaryHandle.className = "route-reorder-handle";
						secondaryHandle.type = "button";
						secondaryHandle.draggable = true;
						secondaryHandle.setAttribute("aria-label", `Move ${secondaryApartment.name || secondaryApartment.address || "secondary apartment"}`);
						secondaryHandle.title = "Drag to make this a stop or drop it on another stop to combine";
						secondaryHandle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M7 6h10M7 12h10M7 18h10" /></svg>';
						secondaryHandle.addEventListener("dragstart", (event) => {
							draggedRouteItem = { type: "apartment", apartment: secondaryApartment, sourceStop: stop };
							secondaryRow.classList.add("is-dragging");
							if (event.dataTransfer) {
								event.dataTransfer.effectAllowed = "move";
								event.dataTransfer.setData("text/plain", String(index));
							}
						});
						secondaryHandle.addEventListener("dragend", () => {
							draggedRouteItem = null;
							renderRouteEditor();
						});

						const secondaryName = document.createElement("span");
						secondaryName.className = "route-apartment-name";
						secondaryName.textContent = secondaryApartment.name || secondaryApartment.address || "Secondary apartment";
						const secondaryActions = document.createElement("div");
						secondaryActions.className = "route-apartment-actions";
						const secondaryPin = createApartmentPinButton(secondaryApartment);
						if (secondaryPin) secondaryActions.append(secondaryPin);
						secondaryActions.append(createMoveButton(secondaryApartment.name || "apartment", "from-route", () => removeApartmentFromDraft(secondaryApartment)));
						secondaryRow.append(secondaryHandle, secondaryName, secondaryActions);
						secondaryList.append(secondaryRow);
					}
					stopRow.append(secondaryList);
				}
				routeDraftList.append(stopRow);
			});
		}

		const query = normalize(apartmentSearch.value.trim());
		const available = apartments.filter((apartment) =>
			!editingRouteDraft.apartments.includes(apartment)
			&& apartmentMatchesSearch(apartment, query));
		availableApartmentCount.textContent = String(available.length);
		availableApartmentList.replaceChildren();
		if (available.length === 0) {
			const empty = document.createElement("li");
			empty.className = "collection-empty";
			empty.textContent = query ? "No matching apartments" : "No available apartments";
			availableApartmentList.append(empty);
			return;
		}

		for (const [index, apartment] of available.entries()) {
			const row = document.createElement("li");
			row.className = "available-apartment-row";
			const name = document.createElement("span");
			name.className = "route-apartment-name";
			name.textContent = apartment.name || apartment.address || `Apartment ${index + 1}`;
			const actions = document.createElement("div");
			actions.className = "route-apartment-actions";
			const pinButton = createApartmentPinButton(apartment);
			if (pinButton) actions.append(pinButton);
			actions.append(createMoveButton(apartment.name || "apartment", "into-route", () => addApartmentToDraft(apartment)));
			row.append(name, actions);
			availableApartmentList.append(row);
		}
	}

	function saveRouteDraft() {
		const name = routeNameInput.value.trim();
		if (!editingRouteDraft || !name) return;
		editingRouteDraft.name = name;
		if (editingRouteIndex === null) routes.push(editingRouteDraft);
		else routes[editingRouteIndex] = editingRouteDraft;
		setDefaultChangesDirty(true);
		closeRouteEditor();
	}

	function isDuplicateApartmentName(name, exceptApartment = null) {
		const key = normalize(name.trim());
		return Boolean(key) && apartments.some((apartment) =>
			apartment !== exceptApartment && normalize(apartment.name) === key);
	}

	function apartmentAreaText(areas) {
		return areas.map((area) => area.nameBefore || area.nameAfter).filter(Boolean).join("\n");
	}

	function openEditApartment(apartment) {
		editingApartment = apartment;
		editApartmentForm.reset();
		editApartmentName.value = apartment.name;
		editApartmentAddress.value = apartment.address;
		editApartmentPhones.value = apartment.phoneNumbers.join("\n");
		editApartmentTeachingAreas.value = apartmentAreaText(apartment.teachingAreas);
		editApartmentVisualPin = apartment.visualPin;
		updateNameInputState(editApartmentName, isDuplicateApartmentName(apartment.name, apartment));
		editApartmentDialog.showModal();
		editApartmentName.focus();
	}

	function deleteApartment(apartment) {
		const index = apartments.indexOf(apartment);
		if (index === -1) return;
		apartments.splice(index, 1);
		for (const route of routes) route.removeApartment(apartment);
		renderRouteLists();
		setDefaultChangesDirty(true);
	}

	function resetBatchApartmentDialog() {
		if (pinSelectionSession?.dialog === batchApartmentDialog) return;
		pendingBatchApartments = [];
		matchedBatchApartmentCount = 0;
		batchApartmentForm.reset();
		batchApartmentFilename.textContent = "";
		batchApartmentStatus.textContent = "";
		batchApartmentStatus.classList.remove("error");
		batchApartmentReview.hidden = true;
		batchApartmentReviewSummary.textContent = "";
		batchApartmentReviewList.replaceChildren();
		saveBatchApartments.hidden = true;
		batchApartmentUnnamedCount.hidden = true;
		batchApartmentUnnamedCount.textContent = "";
		batchApartmentDuplicateCount.hidden = true;
		batchApartmentDuplicateCount.textContent = "";
		batchApartmentExistingConflictCount.hidden = true;
		batchApartmentExistingConflictCount.textContent = "";
		batchApartmentDropzone.hidden = false;
		batchApartmentDropzone.classList.remove("drag-over");
		renderMapPins();
	}

	function updateNameInputState(input, isDuplicate = false) {
		const missing = !input.value.trim();
		input.classList.toggle("is-missing", missing);
		input.classList.toggle("is-duplicate", isDuplicate);
		input.setAttribute("aria-invalid", String(missing || isDuplicate));
		input.setCustomValidity(isDuplicate ? "Apartment names must be unique." : "");
	}

	function updateBatchApartmentNameState() {
		const missingCount = pendingBatchApartments.filter(({ nameInput }) => !nameInput.value.trim()).length;
		batchApartmentUnnamedCount.textContent = `${missingCount} ${missingCount === 1 ? "apartment" : "apartments"} without names`;
		batchApartmentUnnamedCount.hidden = missingCount === 0;

		const pendingByApartment = new Map(pendingBatchApartments
			.filter(({ existing }) => existing)
			.map((candidate) => [candidate.existing, candidate]));
		const nameCounts = new Map();
		for (const apartment of apartments) {
			if (pendingByApartment.has(apartment)) continue;
			const nameKey = normalize(apartment.name);
			if (nameKey) nameCounts.set(nameKey, (nameCounts.get(nameKey) ?? 0) + 1);
		}
		for (const { nameInput } of pendingBatchApartments) {
			const nameKey = normalize(nameInput.value.trim());
			if (nameKey) nameCounts.set(nameKey, (nameCounts.get(nameKey) ?? 0) + 1);
		}
		const pendingNameKeys = new Set(pendingBatchApartments
			.map(({ nameInput }) => normalize(nameInput.value.trim())));
		const duplicateNameKeys = new Set([...nameCounts]
			.filter(([nameKey, count]) => count > 1 && pendingNameKeys.has(nameKey))
			.map(([nameKey]) => nameKey));
		let existingConflictCount = 0;
		for (const candidate of pendingBatchApartments) {
			const { existing, nameInput, compareButton } = candidate;
			const nameKey = normalize(nameInput.value.trim());
			updateNameInputState(nameInput, duplicateNameKeys.has(nameKey));
			const matches = nameKey ? apartments.filter((apartment) => {
				const pendingMatch = pendingByApartment.get(apartment);
				const effectiveName = pendingMatch ? pendingMatch.nameInput.value.trim() : apartment.name;
				return apartment !== existing && normalize(effectiveName) === nameKey;
			}) : [];
			if (matches.length) existingConflictCount += 1;
			const partialMatches = !candidate.mergeData && nameKey ? apartments.filter((apartment) =>
				normalize(apartment.address) === candidate.key && normalize(apartment.name) === nameKey
				&& !matchesExistingApartment(candidate, apartment)) : [];
			candidate.entry.classList.toggle("is-partial-match", partialMatches.length > 0);
			candidate.partialMatchNotice.hidden = partialMatches.length === 0;
			for (const apartment of partialMatches.reverse()) {
				if (!matches.includes(apartment)) matches.unshift(apartment);
			}
			candidate.matches = matches;
			compareButton.hidden = matches.length === 0;
		}
		const duplicateCount = [...duplicateNameKeys]
			.reduce((total, nameKey) => total + nameCounts.get(nameKey), 0);
		batchApartmentDuplicateCount.textContent = `${duplicateCount} ${duplicateCount === 1 ? "apartment has a duplicate name" : "apartments have duplicate names"}`;
		batchApartmentDuplicateCount.hidden = duplicateCount === 0;
		batchApartmentExistingConflictCount.textContent = `${existingConflictCount} ${existingConflictCount === 1 ? "apartment matches" : "apartments match"} an existing apartment name`;
		batchApartmentExistingConflictCount.hidden = existingConflictCount === 0;
		const hasInvalidFields = [...batchApartmentForm.elements]
			.some((field) => field.willValidate && !field.validity.valid);
		saveBatchApartments.disabled = missingCount > 0 || duplicateCount > 0 || hasInvalidFields;
		saveBatchApartments.hidden = pendingBatchApartments.length === 0;
		batchApartmentReviewSummary.textContent = pendingBatchApartments.length
			? `${pendingBatchApartments.length} ${pendingBatchApartments.length === 1 ? "apartment" : "apartments"} to review. Enter a unique name for each apartment.`
			: "No apartments left to add. Close this window to return.";
		if (matchedBatchApartmentCount) {
			batchApartmentReviewSummary.textContent += ` ${matchedBatchApartmentCount} matching ${matchedBatchApartmentCount === 1 ? "apartment is" : "apartments are"} hidden.`;
		}
	}

	function splitCellValues(value) {
		return String(value ?? "")
			.split(/[,;|\r\n]+/)
			.map((part) => part.trim())
			.filter(Boolean);
	}

	function mergeUniqueStrings(existing, incoming) {
		const merged = [...existing];
		const keys = new Set(merged.map(normalize));
		for (const value of incoming) {
			const key = normalize(value);
			if (!key || keys.has(key)) continue;
			keys.add(key);
			merged.push(value);
		}
		return merged;
	}

	function matchesExistingApartment(candidate, apartment) {
		if (!apartment.name.trim() || normalize(apartment.address) !== candidate.key) return false;
		const existingPhones = new Set(apartment.phoneNumbers.map(normalize).filter(Boolean));
		const incomingPhones = new Set(candidate.phoneNumbers.map(normalize).filter(Boolean));
		if (existingPhones.size !== incomingPhones.size
			|| [...existingPhones].some((phone) => !incomingPhones.has(phone))) return false;

		if (apartment.teachingAreas.length !== candidate.teachingAreaNames.length) return false;
		const incomingAreas = candidate.teachingAreaNames.map(normalize);
		const assignedAreas = Array(incomingAreas.length).fill(-1);
		function assignArea(areaIndex, seen) {
			const area = apartment.teachingAreas[areaIndex];
			const keys = [normalize(area.nameBefore), normalize(area.nameAfter)].filter(Boolean);
			for (let index = 0; index < incomingAreas.length; index += 1) {
				if (seen.has(index) || !keys.includes(incomingAreas[index])) continue;
				seen.add(index);
				if (assignedAreas[index] === -1 || assignArea(assignedAreas[index], seen)) {
					assignedAreas[index] = areaIndex;
					return true;
				}
			}
			return false;
		}
		return apartment.teachingAreas.every((_, index) => assignArea(index, new Set()));
	}

	function collectUniqueAddresses(rows) {
		const grouped = new Map();

		for (const { row, rowNumber } of rows) {
			const teachingArea = String(row[2] ?? "").trim();
			const phoneNumber = String(row[3] ?? "").trim();
			const address = String(row[4] ?? "").trim();
			if (!address) throw new Error(`Row ${rowNumber} is missing an address.`);
			const key = normalize(address);
			if (!key) throw new Error(`Row ${rowNumber} has an invalid address.`);

			let candidate = grouped.get(key);
			if (!candidate) {
				candidate = { key, address, phoneNumbers: [], teachingAreaNames: [] };
				grouped.set(key, candidate);
			}

			candidate.phoneNumbers = mergeUniqueStrings(candidate.phoneNumbers, splitCellValues(phoneNumber));
			candidate.teachingAreaNames = mergeUniqueStrings(candidate.teachingAreaNames, splitCellValues(teachingArea));
		}

		return [...grouped.values()];
	}

	function findOrCreateApartmentTeachingArea(name) {
		const key = normalize(name);
		for (const zone of zones) {
			for (const district of zone.districts) {
				const match = district.areas.find((area) =>
					normalize(area.nameBefore) === key || normalize(area.nameAfter) === key);
				if (match) return match;
			}
		}

		if (!apartmentTeachingAreaDistrict) apartmentTeachingAreaDistrict = new District(new Zone());
		const area = new Area(apartmentTeachingAreaDistrict);
		area.nameBefore = name;
		return area;
	}

	function mergeUniqueAreas(existing, areaNames) {
		const merged = [...existing];
		const keys = new Set(merged.flatMap((area) => [normalize(area.nameBefore), normalize(area.nameAfter)]));
		for (const name of areaNames) {
			const key = normalize(name);
			if (!key || keys.has(key)) continue;
			keys.add(key);
			merged.push(findOrCreateApartmentTeachingArea(name));
		}
		return merged;
	}

	function suggestApartmentName(areaNames) {
		if (areaNames.length === 0) return "";
		const words = areaNames.map((name) => name.trim().split(/\s+/).filter(Boolean));
		const otherWords = words.slice(1).map((areaWords) =>
			new Set(areaWords.map((word) => word.toLocaleLowerCase())));
		const seen = new Set();
		return words[0].filter((word) => {
			const key = word.toLocaleLowerCase();
			if (seen.has(key) || !otherWords.every((areaWords) => areaWords.has(key))) return false;
			seen.add(key);
			return true;
		}).join(" ");
	}

	function combinedAreaSelection(first, second) {
		const existing = [];
		const keys = new Set();
		for (const area of [...first.existing, ...second.existing]) {
			const areaKeys = [normalize(area.nameBefore), normalize(area.nameAfter)].filter(Boolean);
			if (areaKeys.some((key) => keys.has(key))) continue;
			existing.push(area);
			areaKeys.forEach((key) => keys.add(key));
		}
		return { existing, names: mergeUniqueStrings(first.names, second.names) };
	}

	function areaSelectionText(selection) {
		return mergeUniqueStrings(
			selection.existing.map((area) => area.nameBefore || area.nameAfter).filter(Boolean),
			selection.names,
		).join("\n") || "None";
	}

	function comparisonAreaText(selection) {
		const details = selection.existing.map((area) => [
			`Area: ${displayChangedName(area.nameBefore, area.nameAfter)}`,
			`District: ${displayChangedName(area.district.nameBefore, area.district.nameAfter)}`,
			`Zone: ${displayChangedName(area.district.zone.nameBefore, area.district.zone.nameAfter)}`,
		].join("\n"));
		const existingKeys = new Set(selection.existing.flatMap((area) =>
			[normalize(area.nameBefore), normalize(area.nameAfter)]));
		for (const name of selection.names) {
			if (!existingKeys.has(normalize(name))) details.push(`Area: ${name}`);
		}
		return details.join("\n\n") || "None";
	}

	function formatPin(pin) {
		return pin ? `${pin.x}, ${pin.y}` : "Not set";
	}

	function comparisonExistingData(target, candidate) {
		const pending = pendingBatchApartments.find((item) => item !== candidate && item.existing === target);
		return {
			pending,
			name: pending ? pending.nameInput.value.trim() : target.name,
			address: pending?.mergeData ? pending.address : target.address,
			phoneNumbers: pending
				? pending.mergeData?.phoneNumbers ?? mergeUniqueStrings(target.phoneNumbers, pending.phoneNumbers)
				: target.phoneNumbers,
			areas: pending
				? pending.mergeData?.areas ?? { existing: target.teachingAreas, names: pending.teachingAreaNames }
				: { existing: target.teachingAreas, names: [] },
			visualPin: pending ? pending.visualPin : target.visualPin,
		};
	}

	function hasAbsorbedApartment(candidate, apartment) {
		return (candidate.absorbed ?? []).some((item) =>
			item.existing === apartment || hasAbsorbedApartment(item, apartment));
	}

	function renderBatchComparison() {
		if (!batchComparison) return;
		const { candidate, matches } = batchComparison;
		const target = matches[Number(batchComparisonTarget.value)];
		const existing = comparisonExistingData(target, candidate);
		const importedAreas = candidate.mergeData?.areas ?? { existing: [], names: candidate.teachingAreaNames };
		const importedPhones = candidate.mergeData?.phoneNumbers ?? candidate.phoneNumbers;
		const fields = [
			{ name: "name", label: "Name", old: existing.name, incoming: candidate.nameInput.value.trim() },
			{ name: "address", label: "Address", old: existing.address, incoming: candidate.address },
			{ name: "phones", label: "Phone numbers", old: existing.phoneNumbers.join("\n"), incoming: importedPhones.join("\n"), combine: true },
			{ name: "areas", label: "Teaching areas", old: comparisonAreaText(existing.areas), incoming: comparisonAreaText(importedAreas), combine: true },
			{ name: "pin", label: "Visual pin", old: formatPin(existing.visualPin), incoming: formatPin(candidate.visualPin) },
		];
		batchComparisonFields.replaceChildren();
		for (const field of fields) {
			const group = document.createElement("fieldset");
			const legend = document.createElement("legend");
			legend.textContent = field.label;
			group.append(legend);
			const options = [
				{ value: "old", text: `Existing\n${field.old || "None"}` },
				{ value: "new", text: `Imported\n${field.incoming || "None"}` },
			];
			if (field.combine) options.push({ value: "both", text: "Keep both" });
			for (const option of options) {
				const label = document.createElement("label");
				const input = document.createElement("input");
				input.type = "radio";
				input.name = field.name;
				input.value = option.value;
				input.checked = field.combine ? option.value === "both" : option.value === "old";
				const text = document.createElement("span");
				text.textContent = option.text;
				label.append(input, text);
				group.append(label);
			}
			batchComparisonFields.append(group);
		}
		const notices = [];
		if (candidate.existing && candidate.existing !== target) {
			notices.push("The apartment at the imported address will remain unchanged.");
		}
		if (existing.pending) {
			notices.push("The existing side includes its pending card; that card will be combined into this merge.");
		}
		const reserved = pendingBatchApartments.some((item) => hasAbsorbedApartment(item, target));
		if (reserved) {
			notices.push("This apartment is part of another staged merge. Save or cancel the batch before merging into it.");
		}
		batchComparisonMerge.disabled = reserved;
		batchComparisonSourceNotice.hidden = notices.length === 0;
		batchComparisonSourceNotice.textContent = notices.join(" ");
	}

	function openBatchComparison(candidate) {
		batchComparison = { candidate, matches: candidate.matches };
		batchComparisonTarget.replaceChildren();
		candidate.matches.forEach((apartment, index) => {
			const option = document.createElement("option");
			option.value = String(index);
			const existing = comparisonExistingData(apartment, candidate);
			option.textContent = `${existing.name || "Unnamed"} — ${existing.address || "No address"}`;
			batchComparisonTarget.append(option);
		});
		renderBatchComparison();
		batchComparisonDialog.showModal();
	}

	batchComparisonTarget.addEventListener("change", renderBatchComparison);
	requireElement("batch-comparison-cancel").addEventListener("click", () => batchComparisonDialog.close());
	batchComparisonDialog.addEventListener("close", () => { batchComparison = null; });
	requireElement("batch-comparison-ignore").addEventListener("click", () => {
		if (!batchComparison) return;
		const { candidate } = batchComparison;
		pendingBatchApartments = pendingBatchApartments.filter((item) => item !== candidate);
		candidate.entry.remove();
		if (candidate.absorbed?.length) {
			pendingBatchApartments.push(...candidate.absorbed);
			pendingBatchApartments.sort((first, second) => first.order - second.order);
			for (const item of pendingBatchApartments) batchApartmentReviewList.append(item.entry);
		}
		batchComparisonDialog.close();
		updateBatchApartmentNameState();
		renderMapPins();
	});
	batchComparisonForm.addEventListener("submit", (event) => {
		event.preventDefault();
		if (!batchComparison) return;
		const { candidate, matches } = batchComparison;
		const target = matches[Number(batchComparisonTarget.value)];
		if (batchComparisonMerge.disabled) return;
		const existing = comparisonExistingData(target, candidate);
		const choices = new FormData(batchComparisonForm);
		const importedPhones = candidate.mergeData?.phoneNumbers ?? candidate.phoneNumbers;
		const importedAreas = candidate.mergeData?.areas ?? { existing: [], names: candidate.teachingAreaNames };
		const phoneChoice = choices.get("phones");
		const areaChoice = choices.get("areas");
		candidate.mergeData = {
			phoneNumbers: phoneChoice === "old" ? [...existing.phoneNumbers]
				: phoneChoice === "new" ? [...importedPhones] : mergeUniqueStrings(existing.phoneNumbers, importedPhones),
			areas: areaChoice === "old" ? existing.areas
				: areaChoice === "new" ? importedAreas : combinedAreaSelection(existing.areas, importedAreas),
		};
		candidate.address = choices.get("address") === "old" ? existing.address : candidate.address;
		candidate.visualPin = choices.get("pin") === "old" ? existing.visualPin : candidate.visualPin;
		candidate.nameInput.value = choices.get("name") === "old" ? existing.name : candidate.nameInput.value;
		candidate.existing = target;
		if (existing.pending) {
			candidate.absorbed ??= [];
			candidate.absorbed.push(existing.pending);
			pendingBatchApartments = pendingBatchApartments.filter((item) => item !== existing.pending);
			existing.pending.entry.remove();
		}
		candidate.addressText.textContent = candidate.address || "No address";
		candidate.phoneText.textContent = `Phone numbers: ${candidate.mergeData.phoneNumbers.join(", ") || "None"}`;
		candidate.areaNames.textContent = areaSelectionText(candidate.mergeData.areas).replace(/\n/g, ", ");
		candidate.mergeNotice.textContent = `Merge into ${target.name || "existing apartment"} staged.`;
		candidate.mergeNotice.hidden = false;
		batchComparisonDialog.close();
		candidate.nameInput.dispatchEvent(new Event("input", { bubbles: true }));
		renderMapPins();
	});

	function renderBatchApartmentReview(candidates) {
		const unmatchedCandidates = candidates.filter((candidate) =>
			!apartments.some((apartment) => matchesExistingApartment(candidate, apartment)));
		matchedBatchApartmentCount = candidates.length - unmatchedCandidates.length;
		pendingBatchApartments = unmatchedCandidates.map((candidate, index) => {
			const existing = apartments.find((apartment) => normalize(apartment.address) === candidate.key);
			const entry = document.createElement("article");
			entry.className = "batch-review-entry";
			const addressText = document.createElement("p");
			addressText.className = "batch-address";
			addressText.textContent = candidate.address;
			const phoneText = document.createElement("p");
			phoneText.textContent = `Phone numbers: ${candidate.phoneNumbers.join(", ") || "None"}`;
			const areaText = document.createElement("p");
			areaText.className = "teaching-area-names";
			const areaLabel = document.createElement("span");
			areaLabel.textContent = "Teaching areas: ";
			const areaNames = document.createElement("strong");
			areaNames.textContent = candidate.teachingAreaNames.join(", ") || "None";
			areaText.append(areaLabel, areaNames);
			const nameLabel = document.createElement("label");
			nameLabel.className = "dialog-field";
			nameLabel.textContent = "Apartment name";
			const nameInput = document.createElement("input");
			nameInput.id = `batch-apartment-name-${index}`;
			nameLabel.htmlFor = nameInput.id;
			nameInput.name = "apartmentNames";
			nameInput.type = "text";
			nameInput.maxLength = 120;
			nameInput.autocomplete = "off";
			nameInput.required = true;
			nameInput.value = existing?.name || (candidate.teachingAreaNames.length === 1
				? candidate.teachingAreaNames[0]
				: suggestApartmentName(candidate.teachingAreaNames));
			nameInput.addEventListener("input", updateBatchApartmentNameState);
			nameLabel.append(nameInput);
			entry.append(nameLabel);
			if (!existing?.name && nameInput.value.trim() && !/\s/.test(nameInput.value.trim())) {
				entry.classList.add("needs-name-review");
				const notice = document.createElement("p");
				notice.className = "batch-name-review-notice";
				notice.textContent = "Review this one-word suggested name.";
				entry.append(notice);
				nameInput.addEventListener("input", () => {
					entry.classList.remove("needs-name-review");
					notice.remove();
				}, { once: true });
			}
			const pinButton = document.createElement("button");
			pinButton.className = "secondary pin-action";
			pinButton.type = "button";
			pinButton.textContent = "Add pin";
			const compareButton = document.createElement("button");
			compareButton.className = "secondary batch-compare-button";
			compareButton.type = "button";
			compareButton.textContent = "Compare existing apartment";
			compareButton.hidden = true;
			compareButton.setAttribute("aria-haspopup", "dialog");
			compareButton.setAttribute("aria-controls", "batch-comparison-dialog");
			compareButton.addEventListener("click", () => {
				const pendingCandidate = pendingBatchApartments.find((item) => item.key === candidate.key);
				if (pendingCandidate?.matches.length) openBatchComparison(pendingCandidate);
			});
			const mergeNotice = document.createElement("p");
			mergeNotice.className = "batch-merge-notice";
			mergeNotice.hidden = true;
			const partialMatchNotice = document.createElement("p");
			partialMatchNotice.className = "batch-partial-match-notice";
			partialMatchNotice.textContent = "Partial match: name and address match, but other details differ.";
			partialMatchNotice.hidden = true;
			entry.append(partialMatchNotice, mergeNotice, addressText, phoneText, areaText, pinButton, compareButton);
			batchApartmentReviewList.append(entry);
			candidate.visualPin = existing?.visualPin ?? null;
			pinButton.addEventListener("click", () => beginMapPinSelection(
				batchApartmentDialog,
				nameInput.value.trim(),
				(visualPin) => {
					candidate.visualPin = visualPin;
					const pendingCandidate = pendingBatchApartments.find((item) => item.key === candidate.key);
					if (pendingCandidate) pendingCandidate.visualPin = visualPin;
					renderMapPins();
				},
			));
			return { ...candidate, existing, nameInput, compareButton, entry, addressText, phoneText, areaNames, mergeNotice, partialMatchNotice, matches: [], order: index };
		});

		batchApartmentReview.hidden = false;
		saveBatchApartments.hidden = false;
		updateBatchApartmentNameState();
	}

	async function loadBatchApartmentFile(file) {
		batchApartmentFilename.textContent = file.name;
		batchApartmentStatus.classList.remove("error");
		batchApartmentReview.hidden = true;
		batchApartmentReviewList.replaceChildren();
		batchApartmentUnnamedCount.hidden = true;
		batchApartmentDuplicateCount.hidden = true;
		batchApartmentExistingConflictCount.hidden = true;
		saveBatchApartments.hidden = true;

		if (!file.name.toLowerCase().endsWith(".xlsx")) {
			batchApartmentStatus.textContent = "Please choose an .xlsx file.";
			batchApartmentStatus.classList.add("error");
			return;
		}
		if (!window.XLSX) {
			batchApartmentStatus.textContent = "The spreadsheet reader did not load. Check your internet connection and reload the page.";
			batchApartmentStatus.classList.add("error");
			return;
		}

		batchApartmentStatus.textContent = "Reading workbook...";
		try {
			const workbook = window.XLSX.read(await file.arrayBuffer(), { type: "array" });
			const firstSheetName = workbook.SheetNames[0];
			if (!firstSheetName) throw new Error("The workbook does not contain a worksheet.");
			const worksheetRows = window.XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
				header: 1,
				defval: "",
				raw: false,
			});
			const firstRow = worksheetRows[0] ?? [];
			const possibleHeader = [firstRow[2], firstRow[3], firstRow[4]].map((value) => normalize(String(value ?? "")));
			const hasHeader = possibleHeader.some((value) => value.includes("area") || value.includes("phone") || value.includes("address"));
			const firstDataRow = hasHeader ? 1 : 0;
			const rows = worksheetRows
				.slice(firstDataRow)
				.map((row, index) => ({ row, rowNumber: index + firstDataRow + 1 }))
				.filter(({ row }) => row.some((value) => String(value).trim() !== ""));
			if (rows.length === 0) throw new Error("The first worksheet contains no data rows.");

			const candidates = collectUniqueAddresses(rows);
			if (candidates.length === 0) throw new Error("No apartment addresses were found.");
			batchApartmentReviewList.replaceChildren();
			renderBatchApartmentReview(candidates);
			batchApartmentDropzone.hidden = true;
			batchApartmentStatus.textContent = "Review the apartments below before adding them.";
		} catch (error) {
			batchApartmentStatus.textContent = error instanceof Error ? error.message : "Could not read this workbook.";
			batchApartmentStatus.classList.add("error");
		}
	}

	requireElement("define-default-routes").addEventListener("click", async () => {
		await showAppView("routes");
	});

	requireElement("routes-back").addEventListener("click", () => {
		const returnToLanding = async () => {
			if (hasUnsavedDefaultChanges) {
				await initializeDefaultData();
			}
			routesView.hidden = true;
			homeView.hidden = false;
			updateViewNavigation("home");
			setSidebarOpen(false);
			window.scrollTo(0, 0);
		};
		if (!hasUnsavedDefaultChanges) {
			returnToLanding();
			return;
		}
		confirmDefaultsAction(
			"Leave without saving?",
			"Your unsaved route and apartment changes will be discarded.",
			"Discard changes",
			returnToLanding,
		);
	});

	saveDefaultsButton.addEventListener("click", () => {
		if (!hasUnsavedDefaultChanges) return;
		confirmDefaultsAction(
			"Save these defaults?",
			"This permanently replaces the saved default routes and apartments. This action cannot be reverted.",
			"Save permanently",
			persistDefaultData,
		);
	});
	defaultsConfirmCancel.addEventListener("click", () => {
		defaultsConfirmationAction = null;
		defaultsConfirmDialog.close();
	});
	defaultsConfirmAccept.addEventListener("click", () => {
		const action = defaultsConfirmationAction;
		defaultsConfirmationAction = null;
		defaultsConfirmDialog.close();
		void action?.();
	});
	defaultsConfirmDialog.addEventListener("cancel", (event) => event.preventDefault());
	exportDefaultsButton.addEventListener("click", () => { void exportDefaultsJson(); });
	openDefaultsButton.addEventListener("click", () => defaultsJsonFile.click());
	defaultsJsonFile.addEventListener("change", () => {
		const file = defaultsJsonFile.files?.[0];
		if (file) void openDefaultsJson(file);
	});

	requireElement("add-route").addEventListener("click", () => {
		openRouteEditor();
	});
	routeEditorBack.addEventListener("click", closeRouteEditor);
	routeNameInput.addEventListener("input", updateRouteSaveState);
	apartmentSearch.addEventListener("input", renderRouteEditor);
	sidebarApartmentSearch.addEventListener("input", renderApartmentList);
	saveRouteButton.addEventListener("click", saveRouteDraft);

	requireElement("add-apartment").addEventListener("click", () => {
		singleApartmentForm.reset();
		singleApartmentDraft = new Apartment();
		updateNameInputState(singleApartmentName);
		singleApartmentDialog.showModal();
		singleApartmentName.focus();
	});
	singleApartmentAddPin.addEventListener("click", () => {
		if (!singleApartmentDraft) singleApartmentDraft = new Apartment();
		beginMapPinSelection(singleApartmentDialog, singleApartmentName.value.trim(), (visualPin) => {
			singleApartmentDraft.visualPin = visualPin;
			renderMapPins();
		});
	});
	singleApartmentName.addEventListener("input", () => {
		updateNameInputState(singleApartmentName, isDuplicateApartmentName(singleApartmentName.value));
	});
	singleApartmentForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const apartment = singleApartmentDraft ?? new Apartment();
		apartment.name = singleApartmentName.value.trim();
		const duplicate = isDuplicateApartmentName(apartment.name);
		updateNameInputState(singleApartmentName, duplicate);
		if (!apartment.name || duplicate) return;
		apartments.push(apartment);
		singleApartmentDraft = null;
		renderRouteLists();
		setDefaultChangesDirty(true);
		singleApartmentDialog.close();
	});
	requireElement("cancel-single-apartment").addEventListener("click", () => {
		singleApartmentDraft = null;
		singleApartmentDialog.close();
		renderMapPins();
	});
	singleApartmentDialog.addEventListener("cancel", (event) => event.preventDefault());

	editApartmentAddPin.addEventListener("click", () => {
		if (!editingApartment) return;
		beginMapPinSelection(editApartmentDialog, editApartmentName.value.trim(), (visualPin) => {
			editApartmentVisualPin = visualPin;
			renderMapPins();
		});
	});

	editApartmentName.addEventListener("input", () => {
		updateNameInputState(editApartmentName, isDuplicateApartmentName(editApartmentName.value, editingApartment));
	});
	editApartmentForm.addEventListener("submit", (event) => {
		event.preventDefault();
		if (!editingApartment) return;
		const name = editApartmentName.value.trim();
		const duplicate = isDuplicateApartmentName(name, editingApartment);
		updateNameInputState(editApartmentName, duplicate);
		if (!name || duplicate || !editApartmentForm.reportValidity()) return;

		editingApartment.name = name;
		editingApartment.address = editApartmentAddress.value.trim();
		editingApartment.phoneNumbers = mergeUniqueStrings([], splitCellValues(editApartmentPhones.value));
		editingApartment.teachingAreas = mergeUniqueAreas([], splitCellValues(editApartmentTeachingAreas.value));
		editingApartment.visualPin = editApartmentVisualPin;

		renderRouteLists();
		setDefaultChangesDirty(true);
		editApartmentDialog.close();
	});
	requireElement("cancel-edit-apartment").addEventListener("click", () => editApartmentDialog.close());
	editApartmentDialog.addEventListener("cancel", (event) => event.preventDefault());
	editApartmentDialog.addEventListener("close", () => {
		if (pinSelectionSession?.dialog === editApartmentDialog) return;
		editingApartment = null;
		editApartmentVisualPin = null;
		renderMapPins();
	});

	requireElement("batch-add-apartments").addEventListener("click", () => {
		resetBatchApartmentDialog();
		batchApartmentDialog.showModal();
	});
	requireElement("cancel-batch-apartment").addEventListener("click", () => batchApartmentDialog.close());
	batchApartmentDialog.addEventListener("cancel", (event) => event.preventDefault());
	batchApartmentDialog.addEventListener("close", resetBatchApartmentDialog);
	batchApartmentFile.addEventListener("change", () => {
		const file = batchApartmentFile.files?.[0];
		if (file) void loadBatchApartmentFile(file);
	});
	let batchDragDepth = 0;
	batchApartmentDropzone.addEventListener("dragenter", (event) => {
		event.preventDefault();
		batchDragDepth += 1;
		batchApartmentDropzone.classList.add("drag-over");
	});
	batchApartmentDropzone.addEventListener("dragover", (event) => {
		event.preventDefault();
		if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
	});
	batchApartmentDropzone.addEventListener("dragleave", (event) => {
		event.preventDefault();
		batchDragDepth = Math.max(0, batchDragDepth - 1);
		if (batchDragDepth === 0) batchApartmentDropzone.classList.remove("drag-over");
	});
	batchApartmentDropzone.addEventListener("drop", (event) => {
		event.preventDefault();
		batchDragDepth = 0;
		batchApartmentDropzone.classList.remove("drag-over");
		const file = event.dataTransfer?.files[0];
		if (file) void loadBatchApartmentFile(file);
	});
	batchApartmentForm.addEventListener("submit", (event) => {
		event.preventDefault();
		if (!pendingBatchApartments.length) return;
		updateBatchApartmentNameState();
		if (saveBatchApartments.disabled || !batchApartmentForm.reportValidity()) return;

		for (const candidate of pendingBatchApartments) {
			let apartment = candidate.existing;
			if (!apartment) {
				apartment = new Apartment();
				apartment.address = candidate.address;
				apartments.push(apartment);
			}
			apartment.name = candidate.nameInput.value.trim();
			if (candidate.mergeData) {
				apartment.address = candidate.address;
				apartment.phoneNumbers = [...candidate.mergeData.phoneNumbers];
				apartment.teachingAreas = mergeUniqueAreas(candidate.mergeData.areas.existing, candidate.mergeData.areas.names);
			} else {
				apartment.phoneNumbers = mergeUniqueStrings(apartment.phoneNumbers, candidate.phoneNumbers);
				apartment.teachingAreas = mergeUniqueAreas(apartment.teachingAreas, candidate.teachingAreaNames);
			}
			apartment.visualPin = candidate.visualPin;
		}

		renderRouteLists();
		setDefaultChangesDirty(true);
		batchApartmentDialog.close();
	});

	sidebarToggle.addEventListener("click", () => {
		setSidebarOpen(!routesSidebar.classList.contains("is-open"));
	});
	sidebarBackdrop.addEventListener("click", () => setSidebarOpen(false));
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") setSidebarOpen(false);
	});

	function updateMapSize() {
		if (!overviewMap.naturalWidth || !mapScale) return;
		const width = overviewMap.naturalWidth * mapScale;
		const height = overviewMap.naturalHeight * mapScale;
		mapStage.style.setProperty("--map-width", `${width}px`);
		mapStage.style.setProperty("--map-height", `${height}px`);
		zoomLevel.textContent = `${Math.round(mapScale / minimumMapScale * 100)}%`;
		zoomOutButton.disabled = mapScale <= minimumMapScale + 0.0001;
		zoomInButton.disabled = mapScale >= minimumMapScale * 6 - 0.0001;
		renderMapPins();
	}

	function focusApartmentPin(apartment) {
		if (!apartment.visualPin || !overviewMap.naturalWidth) return;
		setSidebarOpen(false);
		window.requestAnimationFrame(() => {
			fitOverviewMap();
			mapScale = Math.max(mapScale, minimumMapScale * 2);
			updateMapSize();

			const imageOffsetX = (mapStage.clientWidth - overviewMap.naturalWidth * mapScale) / 2;
			const imageOffsetY = (mapStage.clientHeight - overviewMap.naturalHeight * mapScale) / 2;
			const pinX = imageOffsetX + apartment.visualPin.x * mapScale;
			const pinY = imageOffsetY + apartment.visualPin.y * mapScale;
			mapViewport.scrollTo({
				left: pinX - mapViewport.clientWidth / 2,
				top: pinY - mapViewport.clientHeight / 2,
				behavior: "smooth",
			});
		});
	}

	function startMapApartmentDrag(event, marker, apartment) {
		if (!editingRouteDraft || event.button !== 0) return;
		mapApartmentDrag = {
			apartment,
			marker,
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			moved: false,
			targetMarker: null,
		};
		marker.setPointerCapture(event.pointerId);
	}

	function updateMapApartmentDrag(event) {
		if (!mapApartmentDrag || event.pointerId !== mapApartmentDrag.pointerId) return;
		if (Math.hypot(event.clientX - mapApartmentDrag.startX, event.clientY - mapApartmentDrag.startY) > 5) {
			mapApartmentDrag.moved = true;
		}
		if (!mapApartmentDrag.moved) return;
		event.preventDefault();
		routesView.classList.add("map-apartment-dragging");
		const element = document.elementFromPoint(event.clientX, event.clientY);
		const nextTarget = element instanceof Element ? element.closest(".map-pin") : null;
		if (mapApartmentDrag.targetMarker !== nextTarget) {
			mapApartmentDrag.targetMarker?.classList.remove("map-drop-target");
			mapApartmentDrag.targetMarker = nextTarget;
			nextTarget?.classList.add("map-drop-target");
		}
	}

	function finishMapApartmentDrag(event) {
		if (!mapApartmentDrag || event.pointerId !== mapApartmentDrag.pointerId) return;
		const drag = mapApartmentDrag;
		mapApartmentDrag = null;
		routesView.classList.remove("map-apartment-dragging");
		drag.targetMarker?.classList.remove("map-drop-target");
		if (!drag.moved) return;

		suppressNextMapPinClick.add(drag.marker);
		const targetElement = document.elementFromPoint(event.clientX, event.clientY);
		const targetMarker = targetElement instanceof Element ? targetElement.closest(".map-pin") : null;
		const targetApartment = targetMarker ? apartmentForMapPin.get(targetMarker) : null;
		if (!targetApartment || targetApartment === drag.apartment) return;
		if (editingRouteDraft.moveApartmentToStop(drag.apartment, targetApartment)) renderRouteEditor();
	}

	function renderMapPins() {
		mapStage.querySelectorAll(".map-pin").forEach((marker) => marker.remove());
		mapStage.querySelectorAll(".route-lines-layer").forEach((layer) => layer.remove());
		if (!overviewMap.naturalWidth || !mapScale) return;
		renderRouteMap();

		const pendingExistingApartments = new Set(pendingBatchApartments.map(({ existing }) => existing));
		const savedPins = apartments
			.filter((apartment) => !pendingExistingApartments.has(apartment))
			.map((apartment) => ({
				apartment,
				visualPin: apartment === editingApartment ? editApartmentVisualPin : apartment.visualPin,
			}));
		if (singleApartmentDraft?.visualPin) {
			savedPins.push({ apartment: singleApartmentDraft, visualPin: singleApartmentDraft.visualPin });
		}
		const pendingPins = pendingBatchApartments.map((candidate) => ({
			apartment: { name: candidate.nameInput?.value || candidate.teachingAreaNames.join(", "), address: candidate.address },
			visualPin: candidate.visualPin,
		}));
		const imageOffsetX = (mapStage.clientWidth - overviewMap.naturalWidth * mapScale) / 2;
		const imageOffsetY = (mapStage.clientHeight - overviewMap.naturalHeight * mapScale) / 2;

		for (const { apartment, visualPin } of [...savedPins, ...pendingPins]) {
			if (!visualPin) continue;
			const marker = document.createElement("button");
			marker.className = "map-pin";
			marker.type = "button";
			apartmentForMapPin.set(marker, apartment);
			const apartmentLabel = apartment.name || apartment.address || "Apartment";
			marker.setAttribute("aria-label", `Apartment pin: ${apartmentLabel}`);
			marker.style.left = `${imageOffsetX + visualPin.x * mapScale}px`;
			marker.style.top = `${imageOffsetY + visualPin.y * mapScale}px`;
			marker.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" /><path d="m8.5 15 7.5-6 7.5 6M11 14v9h10v-9m-6 9v-6h3v6" /></svg>';
			const label = document.createElement("span");
			label.className = "map-pin-label";
			label.textContent = apartmentLabel;
			marker.append(label);
			marker.addEventListener("click", () => {
				if (suppressNextMapPinClick.has(marker)) {
					suppressNextMapPinClick.delete(marker);
					return;
				}
				if (editingRouteDraft && apartments.includes(apartment)) moveApartmentToRouteEnd(apartment);
			});
			marker.addEventListener("pointerdown", (event) => startMapApartmentDrag(event, marker, apartment));
			marker.addEventListener("pointermove", updateMapApartmentDrag);
			marker.addEventListener("pointerup", finishMapApartmentDrag);
			marker.addEventListener("pointercancel", finishMapApartmentDrag);
			mapStage.append(marker);
		}
	}

	function renderRouteMap() {
		if (!editingRouteDraft || editingRouteDraft.stops.length === 0) return;
		const namespace = "http://www.w3.org/2000/svg";
		const overlay = document.createElementNS(namespace, "svg");
		overlay.classList.add("route-lines-layer");
		overlay.setAttribute("viewBox", `0 0 ${mapStage.clientWidth} ${mapStage.clientHeight}`);
		overlay.setAttribute("aria-hidden", "true");
		const imageOffsetX = (mapStage.clientWidth - overviewMap.naturalWidth * mapScale) / 2;
		const imageOffsetY = (mapStage.clientHeight - overviewMap.naturalHeight * mapScale) / 2;
		const pointFor = (apartment) => apartment?.visualPin ? {
			x: imageOffsetX + apartment.visualPin.x * mapScale,
			y: imageOffsetY + apartment.visualPin.y * mapScale,
		} : null;
		const addLine = (start, end, secondary = false) => {
			if (!start || !end) return;
			const line = document.createElementNS(namespace, "line");
			line.setAttribute("x1", String(start.x));
			line.setAttribute("y1", String(start.y));
			line.setAttribute("x2", String(end.x));
			line.setAttribute("y2", String(end.y));
			line.setAttribute("class", secondary ? "route-secondary-line" : "route-primary-line");
			overlay.append(line);
		};

		for (let index = 0; index < editingRouteDraft.stops.length - 1; index += 1) {
			addLine(
				pointFor(editingRouteDraft.stops[index].primaryApartment),
				pointFor(editingRouteDraft.stops[index + 1].primaryApartment),
			);
		}
		for (const stop of editingRouteDraft.stops) {
			const primaryPoint = pointFor(stop.primaryApartment);
			for (const apartment of stop.secondaryApartments) addLine(primaryPoint, pointFor(apartment), true);
		}
		mapStage.append(overlay);
	}

	function getVisualPinAtPoint(clientX, clientY) {
		if (!overviewMap.naturalWidth || !overviewMap.naturalHeight) return null;
		const bounds = overviewMap.getBoundingClientRect();
		if (clientX < bounds.left || clientX > bounds.right || clientY < bounds.top || clientY > bounds.bottom) return null;
		return {
			x: Math.round((clientX - bounds.left) * overviewMap.naturalWidth / bounds.width),
			y: Math.round((clientY - bounds.top) * overviewMap.naturalHeight / bounds.height),
		};
	}

	function beginMapPinSelection(dialog, apartmentName, onSelect) {
		if (!overviewMap.naturalWidth) return;
		pinSelectionSession = {
			dialog,
			onSelect,
			previousTitle: mapTitle.textContent,
			returnFocus: document.activeElement,
		};
		dialog.close();
		homeView.hidden = true;
		tripView.hidden = true;
		routesView.hidden = false;
		setSidebarOpen(false);
			routesView.classList.add("pin-picking");
		pinPickBanner.hidden = false;
		mapTitle.textContent = apartmentName
			? `Select apartment location: ${apartmentName}`
			: "Select apartment location";
		window.requestAnimationFrame(() => {
			fitOverviewMap();
			mapViewport.focus();
		});
	}

	function finishMapPinSelection(visualPin = null) {
		if (!pinSelectionSession) return;
		const session = pinSelectionSession;
		pinSelectionSession = null;
		if (visualPin) session.onSelect(visualPin);
		routesView.classList.remove("pin-picking");
		pinPickBanner.hidden = true;
		mapTitle.textContent = session.previousTitle;
		renderMapPins();
		session.dialog.showModal();
		if (session.returnFocus instanceof HTMLElement) session.returnFocus.focus();
	}

	cancelPinSelection.addEventListener("click", () => finishMapPinSelection());

	function fitOverviewMap(resetScale = false) {
		if (!overviewMap.naturalWidth || !mapViewport.clientWidth || !mapViewport.clientHeight) return;
		minimumMapScale = Math.min(
			mapViewport.clientWidth / overviewMap.naturalWidth,
			mapViewport.clientHeight / overviewMap.naturalHeight,
		);
		if (resetScale || !mapScale || mapScale < minimumMapScale) mapScale = minimumMapScale;
		updateMapSize();
		if (resetScale) mapViewport.scrollTo(0, 0);
	}

	function changeMapScale(nextScale, focusX, focusY) {
		if (!minimumMapScale || !mapScale) return;
		const previousScale = mapScale;
		mapScale = Math.max(minimumMapScale, Math.min(minimumMapScale * 6, nextScale));
		updateMapSize();
		const ratio = mapScale / previousScale;
		window.requestAnimationFrame(() => {
			mapViewport.scrollLeft = Math.max(0, (mapViewport.scrollLeft + focusX) * ratio - focusX);
			mapViewport.scrollTop = Math.max(0, (mapViewport.scrollTop + focusY) * ratio - focusY);
		});
	}

	zoomOutButton.addEventListener("click", () => changeMapScale(mapScale / 1.25, mapViewport.clientWidth / 2, mapViewport.clientHeight / 2));
	zoomInButton.addEventListener("click", () => changeMapScale(mapScale * 1.25, mapViewport.clientWidth / 2, mapViewport.clientHeight / 2));
	zoomFitButton.addEventListener("click", () => fitOverviewMap(true));
	mapViewport.addEventListener("pointerdown", (event) => {
		if (event.button !== 0) return;
		if (!pinSelectionSession && event.pointerType !== "mouse") return;
		if (!pinSelectionSession && event.target instanceof Element && event.target.closest(".map-pin")) return;
		activePanPointer = event.pointerId;
		panStartX = event.clientX;
		panStartY = event.clientY;
		panStartScrollLeft = mapViewport.scrollLeft;
		panStartScrollTop = mapViewport.scrollTop;
		panMoved = false;
		mapViewport.classList.add("is-dragging");
		mapViewport.setPointerCapture(event.pointerId);
		event.preventDefault();
	});
	mapViewport.addEventListener("pointermove", (event) => {
		if (event.pointerId !== activePanPointer) return;
		if (Math.hypot(event.clientX - panStartX, event.clientY - panStartY) > 4) panMoved = true;
		mapViewport.scrollLeft = panStartScrollLeft - (event.clientX - panStartX);
		mapViewport.scrollTop = panStartScrollTop - (event.clientY - panStartY);
	});
	const finishMapPointer = (event) => {
		if (event.pointerId !== activePanPointer) return;
		const selectedPin = pinSelectionSession && !panMoved
			? getVisualPinAtPoint(event.clientX, event.clientY)
			: null;
		activePanPointer = null;
		mapViewport.classList.remove("is-dragging");
		if (selectedPin) finishMapPinSelection(selectedPin);
	};
	const stopMapPan = (event) => {
		if (event.pointerId !== activePanPointer) return;
		activePanPointer = null;
		mapViewport.classList.remove("is-dragging");
	};
	mapViewport.addEventListener("pointerup", finishMapPointer);
	mapViewport.addEventListener("pointercancel", stopMapPan);
	mapViewport.addEventListener("lostpointercapture", stopMapPan);
	mapViewport.addEventListener("wheel", (event) => {
		event.preventDefault();
		const bounds = mapViewport.getBoundingClientRect();
		const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
		changeMapScale(mapScale * factor, event.clientX - bounds.left, event.clientY - bounds.top);
	}, { passive: false });
	let timelinePan = null;
	tripTimelineViewport.addEventListener("pointerdown", (event) => {
		if (event.pointerType !== "mouse" || event.button !== 0 || timelinePan
			|| tripTimelineViewport.scrollWidth <= tripTimelineViewport.clientWidth) return;
		if (event.target instanceof Element
			&& event.target.closest('[draggable="true"], button:not(:disabled), a, input, select, textarea')) return;
		timelinePan = {
			pointerId: event.pointerId,
			startX: event.clientX,
			scrollLeft: tripTimelineViewport.scrollLeft,
		};
		tripTimelineViewport.classList.add("is-dragging");
		tripTimelineViewport.setPointerCapture(event.pointerId);
		event.preventDefault();
	});
	tripTimelineViewport.addEventListener("pointermove", (event) => {
		if (!timelinePan || event.pointerId !== timelinePan.pointerId) return;
		tripTimelineViewport.scrollLeft = timelinePan.scrollLeft - (event.clientX - timelinePan.startX);
	});
	const finishTimelinePan = (event) => {
		if (!timelinePan || event.pointerId !== timelinePan.pointerId) return;
		timelinePan = null;
		tripTimelineViewport.classList.remove("is-dragging");
	};
	tripTimelineViewport.addEventListener("pointerup", finishTimelinePan);
	tripTimelineViewport.addEventListener("pointercancel", finishTimelinePan);
	tripTimelineViewport.addEventListener("lostpointercapture", finishTimelinePan);
	tripTimelineViewport.addEventListener("wheel", (event) => {
		const list = event.target instanceof Element
			? event.target.closest(".trip-box-list, .trip-teaching-areas")
			: null;
		if (list && event.deltaY !== 0) {
			const canScrollList = event.deltaY < 0
				? list.scrollTop > 0
				: list.scrollTop + list.clientHeight < list.scrollHeight;
			if (canScrollList) return;
		}
		const delta = event.deltaX || event.deltaY;
		if (delta === 0) return;
		event.preventDefault();
		tripTimelineViewport.scrollLeft += delta;
	}, { passive: false });
	overviewMap.addEventListener("load", () => fitOverviewMap(routesView.hidden === false));
	window.addEventListener("resize", () => {
		if (!routesView.hidden) fitOverviewMap();
	});
	unindexedAreasButton.addEventListener("click", () => {
		renderUnindexedAreas();
		unindexedAreasDialog.showModal();
	});
	reindexUnindexedAreasButton.addEventListener("click", reindexUnindexedAreas);
	requireElement("close-unindexed-areas").addEventListener("click", () => unindexedAreasDialog.close());
	missingTransferTypesButton.addEventListener("click", () => {
		renderMissingTransferTypes();
		missingTransferTypesDialog.showModal();
	});
	recalculateMissingTransferTypesButton.addEventListener("click", recalculateMissingTransferTypes);
	requireElement("close-missing-transfer-types").addEventListener("click", () => missingTransferTypesDialog.close());
	missingApartmentsButton.addEventListener("click", () => {
		renderMissingApartments();
		missingApartmentsDialog.showModal();
	});
	refreshMissingApartmentsButton.addEventListener("click", refreshMissingApartments);
	requireElement("close-missing-apartments").addEventListener("click", () => missingApartmentsDialog.close());
	departingMissionariesButton.addEventListener("click", openDepartingMissionariesDialog);
	departingMissionarySearch.addEventListener("input", renderDepartingMissionaries);
	requireElement("cancel-departing-missionaries").addEventListener("click", () => departingMissionariesDialog.close());
	departingMissionariesForm.addEventListener("submit", (event) => {
		event.preventDefault();
		for (const missionary of missionaries) {
			if (missionary.transferType === TransferType.ULI) missionary.transferType = calculateTransferType(missionary);
		}
		for (const [missionary, isDeparting] of departingSelection) {
			if (isDeparting && missionaries.includes(missionary)) missionary.transferType = TransferType.ULI;
		}
		departingSelectionConfirmed = true;
		departingMissionariesDialog.close();
		renderImportedData();
	});
	defaultsInitialization = initializeDefaultData();

	function displayName(before, after, period) {
		return period === "before" ? before : after;
	}

	function displayChangedName(before, after) {
		if (before === after) return before || "—";
		return `${before || "—"} → ${after || "—"}`;
	}

	function formatArea(area, period) {
		if (!area) return "Not assigned";
		return [
			`Area: ${displayName(area.nameBefore, area.nameAfter, period) || "Not named"}`,
			`District: ${displayName(area.district.nameBefore, area.district.nameAfter, period) || "Not named"}`,
			`Zone: ${area.getZone(period) || "Not named"}`,
		].join("\n");
	}

	function formatApartment(apartment) {
		if (!apartment) return "Not assigned";
		const formatAreas = (areas) => areas.length
			? areas.map((area) => `${area.nameBefore || "—"} / ${area.nameAfter || "—"}`).join(", ")
			: "None";
		const pin = apartment.visualPin ? `${apartment.visualPin.x}, ${apartment.visualPin.y}` : "Not set";

		return [
			`Name: ${apartment.name || "—"}`,
			`Address: ${apartment.address || "—"}`,
			`Phone numbers: ${apartment.phoneNumbers.join(", ") || "None"}`,
			`Visual pin: ${pin}`,
			`Teaching areas: ${formatAreas(apartment.teachingAreas)}`,
		].join("\n");
	}

	function renderMissionaries() {
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

	function renderZones() {
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
			zoneHeading.textContent = `Zone: ${displayChangedName(zone.nameBefore, zone.nameAfter)}`;
			zoneSection.append(zoneHeading);

			for (const district of zone.districts) {
				const districtSection = document.createElement("section");
				districtSection.className = "district-entry";
				const districtHeading = document.createElement("h5");
				districtHeading.textContent = `District: ${displayChangedName(district.nameBefore, district.nameAfter)}`;
				districtSection.append(districtHeading);

				const areaList = document.createElement("ul");
				areaList.className = "area-list";
				for (const area of district.areas) {
					const item = document.createElement("li");
					item.textContent = `Area[${area.index}]: ${displayChangedName(area.nameBefore, area.nameAfter)}`;
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

	function renderImportedData() {
		renderMissionaries();
		renderZones();
		missionaryCount.textContent = String(missionaries.length);
		zoneCount.textContent = String(zones.length);
		dataSummary.textContent = `${missionaries.length} ${missionaries.length === 1 ? "missionary" : "missionaries"} · ${zones.length} ${zones.length === 1 ? "zone" : "zones"}`;
		updateWorkflowButtons();
	}

	function callTransferMessage(transferType) {
		const messages = new Map([
			[TransferType.STA, "STAY"],
			[TransferType.TWV, "TRANSFER without van"],
			[TransferType.NMN, "TRANSFER van going north"],
			[TransferType.SLS, "TRANSFER van going north"],
			[TransferType.STN, "TRANSFER van going north"],
			[TransferType.STD, "TRANSFER van going north"],
			[TransferType.DTN, "TRANSFER van going north"],
			[TransferType.DTS, "TRANSFER van going south"],
			[TransferType.NLN, "TRANSFER van going south"],
			[TransferType.NTS, "TRANSFER van going south"],
			[TransferType.NTD, "TRANSFER van going south"],
			[TransferType.SMS, "TRANSFER van going south"],
			[TransferType.ULI, "uli na"],
		]);
		return messages.get(transferType) ?? "Not set";
	}

	function positionRoles(position) {
		const roles = new Set();
		const roleCodes = new Map([
			["STL", new Set(["stlsc", "stljc", "stl", "stl1"])],
			["ZL", new Set(["zlsc", "zljc", "zl", "zl1"])],
			["DL", new Set(["dlsc", "dltr", "dl"])],
		]);
		for (const match of String(position ?? "").matchAll(/\(([^)]*)\)/g)) {
			const code = normalize(match[1]);
			for (const [role, codes] of roleCodes) {
				if (codes.has(code)) roles.add(role);
			}
		}
		return roles;
	}

	function callRoleNote(missionary) {
		const beforeRoles = positionRoles(missionary.positionBefore);
		if (beforeRoles.has("ZL")) return "";
		const afterRoles = positionRoles(missionary.positionAfter);
		if (afterRoles.has("DL") && !beforeRoles.has("DL")) return "New District Leader";
		if (afterRoles.has("STL") && !beforeRoles.has("STL")) return "New STL";
		if (afterRoles.has("ZL") && !beforeRoles.has("ZL")) return "New Zone Leader";
		return "";
	}

	function companionNameKeys(companions) {
		return String(companions ?? "")
			.split("/")
			.map((entry) => normalize(entry.replace(/\s*\([^)]*\)\s*$/, "").trim()))
			.filter(Boolean);
	}

	function missionaryNameKeys(missionary) {
		return [
			missionary.getRealName(),
			[missionary.type, missionary.firstName, missionary.lastName].filter(Boolean).join(" "),
			[missionary.firstName, missionary.lastName].filter(Boolean).join(" "),
			[missionary.lastName, missionary.firstName].filter(Boolean).join(", "),
		].map(normalize).filter(Boolean);
	}

	function trainerNameKeys() {
		return new Set(missionaries
			.filter((missionary) => !missionary.areaBefore)
			.flatMap((missionary) => companionNameKeys(missionary.compAfter)));
	}

	function renderCallView() {
		const selectedZone = callZoneSelect.value === "" ? null : zones[Number(callZoneSelect.value)] ?? null;
		const beforeZones = zones.filter((zone) => zone.nameBefore);
		callZoneSelect.replaceChildren();
		const placeholder = document.createElement("option");
		placeholder.value = "";
		placeholder.textContent = beforeZones.length ? "Select a zone" : "No zones available";
		callZoneSelect.append(placeholder);
		for (const [index, zone] of zones.entries()) {
			if (!zone.nameBefore) continue;
			const option = document.createElement("option");
			option.value = String(index);
			option.textContent = zone.nameBefore;
			callZoneSelect.append(option);
		}
		const selectedIndex = selectedZone ? zones.indexOf(selectedZone) : -1;
		callZoneSelect.value = selectedIndex >= 0 ? String(selectedIndex) : "";
		callZoneSelect.disabled = beforeZones.length === 0;
		callZoneEmpty.hidden = beforeZones.length > 0;
		callZoneOutput.hidden = beforeZones.length === 0;
		renderCallZoneTable();
	}

	function renderCallZoneTable() {
		callZoneOutput.replaceChildren();
		const zone = callZoneSelect.value === "" ? null : zones[Number(callZoneSelect.value)];
		copyCallTableButton.disabled = !zone;
		setStatus(callCopyStatus, "");
		if (!zone) {
			const empty = document.createElement("p");
			empty.className = "empty-state";
			empty.textContent = "Select a zone to view its missionaries.";
			callZoneOutput.append(empty);
			return;
		}

		const table = document.createElement("table");
		table.className = "call-table";
		const headers = ["District", "Area", "Missionary", "Transfer", "Notes"];
		const head = document.createElement("thead");
		const headingRow = document.createElement("tr");
		for (const label of headers) {
			const cell = document.createElement("th");
			cell.scope = "col";
			cell.textContent = label;
			headingRow.append(cell);
		}
		head.append(headingRow);
		table.append(head);

		const body = document.createElement("tbody");
		const trainerNames = trainerNameKeys();
		for (const district of zone.districts.filter((entry) => entry.nameBefore)) {
			const beforeAreas = district.areas.filter((area) => area.nameBefore);
			const areaRows = beforeAreas.flatMap((area) => {
				const assigned = missionaries.filter((missionary) => missionary.areaBefore === area);
				return assigned.length ? assigned.map((missionary) => ({ area, missionary })) : [{ area, missionary: null }];
			});
			const rows = areaRows.length ? areaRows : [{ area: null, missionary: null }];
			rows.forEach(({ area, missionary }, index) => {
				const row = document.createElement("tr");
				if (index === 0) {
					const districtCell = document.createElement("th");
					districtCell.scope = "rowgroup";
					districtCell.rowSpan = rows.length;
					districtCell.textContent = district.nameBefore || "Unnamed district";
					row.append(districtCell);
				}
				if (!area || index === 0 || rows[index - 1].area !== area) {
					const areaCell = document.createElement("th");
					areaCell.scope = "rowgroup";
					areaCell.rowSpan = area
						? Math.max(1, areaRows.filter((entry) => entry.area === area).length)
						: 1;
					areaCell.textContent = area?.nameBefore || "—";
					row.append(areaCell);
				}
				const nameCell = document.createElement("td");
				nameCell.textContent = missionary?.getRealName() || "—";
				const transferCell = document.createElement("td");
				transferCell.textContent = missionary ? callTransferMessage(missionary.transferType) : "—";
				const notesCell = document.createElement("td");
				if (missionary) {
					const notes = [callRoleNote(missionary)];
					if (missionaryNameKeys(missionary).some((name) => trainerNames.has(name))) {
						notes.push("Training a new missionary");
					}
					const generatedNote = notes.filter(Boolean).join("; ");
					const name = [missionary.type, missionary.firstName, missionary.lastName].filter(Boolean).join(" ");
					const renderNote = (focusEdit = false) => {
						notesCell.replaceChildren();
						const display = document.createElement("div");
						display.className = "call-note-display";
						const note = document.createElement("span");
						note.className = "call-note-text";
						note.textContent = callNoteOverrides.get(missionary) ?? generatedNote;
						const edit = document.createElement("button");
						edit.type = "button";
						edit.className = "apartment-row-action";
						edit.title = "Edit note";
						edit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" /></svg>';
						edit.setAttribute("aria-label", `Edit note for ${name}`);
						edit.addEventListener("click", () => {
							const form = document.createElement("form");
							form.className = "call-note-editor";
							const input = document.createElement("textarea");
							input.setAttribute("aria-label", `Note for ${name}`);
							input.value = callNoteOverrides.get(missionary) ?? generatedNote;
							const actions = document.createElement("div");
							actions.className = "call-note-actions";
							const save = document.createElement("button");
							save.type = "submit";
							save.className = "call-note-button";
							save.textContent = "Save";
							const cancel = document.createElement("button");
							cancel.type = "button";
							cancel.className = "call-note-button";
							cancel.textContent = "Cancel";
							cancel.addEventListener("click", () => renderNote(true));
							form.addEventListener("submit", (event) => {
								event.preventDefault();
								callNoteOverrides.set(missionary, input.value);
								renderNote(true);
							});
							actions.append(save, cancel);
							form.append(input, actions);
							notesCell.replaceChildren(form);
							input.focus();
						});
						display.append(note);
						if (callNoteOverrides.has(missionary)) {
							const reset = document.createElement("button");
							reset.type = "button";
							reset.className = "apartment-row-action";
							reset.title = "Restore generated note";
							reset.setAttribute("aria-label", `Restore generated note for ${name}`);
							reset.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>';
							reset.addEventListener("click", () => {
								callNoteOverrides.delete(missionary);
								renderNote(true);
							});
							display.append(reset);
						}
						display.append(edit);
						notesCell.append(display);
						if (focusEdit) edit.focus();
					};
					renderNote();
				}
				row.append(nameCell, transferCell, notesCell);
				body.append(row);
			});
		}
		if (zone.districts.length === 0) {
			const row = document.createElement("tr");
			const cell = document.createElement("td");
			cell.colSpan = headers.length;
			cell.textContent = "No districts in this zone.";
			row.append(cell);
			body.append(row);
		}
		table.append(body);
		callZoneOutput.append(table);
	}

	function normalize(value) {
		return value.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
	}

	function createStatusIcon(status) {
		if (status === "none") return null;
		const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		icon.setAttribute("viewBox", "0 0 24 24");
		icon.setAttribute("aria-hidden", "true");
		icon.setAttribute("fill", "none");
		icon.setAttribute("stroke", "currentColor");
		icon.setAttribute("stroke-width", "2");
		icon.setAttribute("stroke-linecap", "round");
		icon.setAttribute("stroke-linejoin", "round");
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", status === "complete"
			? "m5 12 4 4L19 6"
			: "M12 3 2.8 20h18.4L12 3Zm0 6v4m0 3h.01");
		icon.append(path);
		return icon;
	}

	function setWorkflowButton(button, label, status, isDisabled) {
		button.disabled = isDisabled;
		button.classList.toggle("is-complete", status === "complete");
		button.classList.toggle("is-warning", status === "warning");
		button.replaceChildren();
		const icon = createStatusIcon(status);
		if (icon) button.append(icon);
		button.append(document.createTextNode(label));
	}

	function updateWorkflowButtons() {
		const unindexedCount = [...unindexedAreas].filter((area) => !ignoredUnindexedAreas.has(area)).length;
		setWorkflowButton(
			unindexedAreasButton,
			hasBeforeBoard ? `Areas not indexed (${unindexedCount})` : "Areas not indexed",
			!hasBeforeBoard ? "none" : (unindexedCount > 0 ? "warning" : "complete"),
			!hasBeforeBoard || unindexedCount === 0,
		);

		const boardsReady = hasBeforeBoard && hasAfterBoard;
		const missingTransferTypes = missionaries.filter((missionary) =>
			missionary.type !== MissionaryType.Senior
			&& missionary.transferType == null
			&& !ignoredTransferTypeMissionaries.has(missionary)).length;
		setWorkflowButton(
			missingTransferTypesButton,
			boardsReady ? `Missionaries without transfer type (${missingTransferTypes})` : "Missionaries without transfer type",
			boardsReady ? (missingTransferTypes > 0 ? "warning" : "complete") : "none",
			!boardsReady,
		);

		const missingApartments = missionaries.filter((missionary) =>
			missionary.areaBefore
			&& !missionary.currentLoc
			&& !ignoredMissingApartmentMissionaries.has(missionary)).length;
		setWorkflowButton(
			missingApartmentsButton,
			hasBeforeBoard ? `Missionaries without apartments (${missingApartments})` : "Missionaries without apartments",
			!hasBeforeBoard ? "none" : (missingApartments > 0 ? "warning" : "complete"),
			!hasBeforeBoard,
		);

		const departingCount = missionaries.filter((missionary) => missionary.transferType === TransferType.ULI).length;
		setWorkflowButton(
			departingMissionariesButton,
			departingSelectionConfirmed ? `${departingCount} departing missionaries` : "Select departing missionaries",
			!hasAfterBoard ? "none" : (departingSelectionConfirmed ? "complete" : "warning"),
			!hasAfterBoard,
		);

		const canContinue = hasBeforeBoard
			&& unindexedCount === 0
			&& boardsReady
			&& missingTransferTypes === 0
			&& missingApartments === 0
			&& departingSelectionConfirmed;
		gatedViewButtons.forEach((button) => { button.disabled = !canContinue; });

		const tripIssueCount = Number(hasBeforeBoard && unindexedCount > 0)
			+ Number(boardsReady && missingTransferTypes > 0)
			+ Number(hasBeforeBoard && missingApartments > 0)
			+ Number(hasAfterBoard && !departingSelectionConfirmed);
		const tripStatus = tripIssueCount > 0
			? "warning"
			: (hasBeforeBoard && boardsReady && departingSelectionConfirmed ? "complete" : "none");
		for (const button of tripNavigationButtons) {
			button.replaceChildren();
			const icon = createStatusIcon(tripStatus);
			if (icon) button.append(icon);
			button.append(document.createTextNode(tripIssueCount > 0 ? `Trip (${tripIssueCount})` : "Trip"));
			button.classList.toggle("has-review-issues", tripIssueCount > 0);
			button.setAttribute("aria-label", tripIssueCount > 0
				? `Trip, ${tripIssueCount} incomplete review ${tripIssueCount === 1 ? "task" : "tasks"}`
				: "Trip");
		}
		const routeValidationCounts = canContinue ? getTripRouteValidationCounts() : new Map();
		updateStopsNavigationStatus(canContinue, routeValidationCounts);
	}

	function appendReviewMessage(list, message) {
		const item = document.createElement("li");
		item.className = "review-empty";
		item.textContent = message;
		list.append(item);
	}

	function appendReviewItem(list, text, isIgnored, onIgnore, onDeparting = null) {
		const item = document.createElement("li");
		item.className = "review-item";
		item.classList.toggle("is-ignored", isIgnored);
		const label = document.createElement("span");
		label.className = "review-item-text";
		label.textContent = text;
		const ignoreButton = document.createElement("button");
		ignoreButton.className = "secondary review-ignore-button";
		ignoreButton.type = "button";
		ignoreButton.textContent = isIgnored ? "Unignore" : "Ignore";
		ignoreButton.addEventListener("click", onIgnore);
		item.append(label, ignoreButton);
		if (onDeparting) {
			const departingButton = document.createElement("button");
			departingButton.className = "secondary review-ignore-button";
			departingButton.type = "button";
			departingButton.textContent = "Departing";
			departingButton.addEventListener("click", onDeparting);
			item.append(departingButton);
		}
		list.append(item);
	}

	function renderUnindexedAreas() {
		unindexedAreasList.replaceChildren();
		const areas = [...unindexedAreas].sort((first, second) =>
			(first.nameAfter || first.nameBefore).localeCompare(second.nameAfter || second.nameBefore));
		if (areas.length === 0) {
			appendReviewMessage(unindexedAreasList, "No unindexed areas.");
			return;
		}
		for (const area of areas) {
			const areaName = area.nameAfter || area.nameBefore || "Not named";
			const districtName = area.district.nameAfter || area.district.nameBefore || "Not named";
			const zoneName = area.getZone("after") || area.getZone("before") || "Not named";
			const isIgnored = ignoredUnindexedAreas.has(area);
			appendReviewItem(
				unindexedAreasList,
				`${areaName} · ${districtName} District · ${zoneName} Zone`,
				isIgnored,
				() => {
					if (isIgnored) ignoredUnindexedAreas.delete(area);
					else ignoredUnindexedAreas.add(area);
					renderUnindexedAreas();
					updateWorkflowButtons();
				},
			);
		}
	}

	function renderMissingTransferTypes() {
		const debugNames = new Set(["Elder Emberga", "Sister Dela Cruz", "Elder Aquino", "Elder Baron"]);
		console.table(missionaries
			.filter((missionary) => debugNames.has(missionary.getRealName()))
			.map((missionary) => ({
				name: missionary.getRealName(),
				transferType: missionary.transferType,
			})));
		missingTransferTypesList.replaceChildren();
		const missing = missionaries
			.filter((missionary) => missionary.type !== MissionaryType.Senior && missionary.transferType == null)
			.sort((first, second) => first.lastName.localeCompare(second.lastName) || first.firstName.localeCompare(second.firstName));
		if (missing.length === 0) {
			appendReviewMessage(missingTransferTypesList, "Every missionary has a transfer type.");
			return;
		}
		for (const missionary of missing) {
			const isIgnored = ignoredTransferTypeMissionaries.has(missionary);
			appendReviewItem(
				missingTransferTypesList,
				missionary.getRealName(),
				isIgnored,
				() => {
					if (isIgnored) ignoredTransferTypeMissionaries.delete(missionary);
					else ignoredTransferTypeMissionaries.add(missionary);
					renderMissingTransferTypes();
					updateWorkflowButtons();
				},
				() => {
					missionary.transferType = TransferType.ULI;
					departingSelection.set(missionary, true);
					ignoredTransferTypeMissionaries.delete(missionary);
					renderMissingTransferTypes();
					renderImportedData();
				},
			);
		}
	}

	function renderMissingApartments() {
		missingApartmentsList.replaceChildren();
		const missing = missionaries
			.filter((missionary) => missionary.areaBefore && !missionary.currentLoc)
			.sort((first, second) => first.lastName.localeCompare(second.lastName) || first.firstName.localeCompare(second.firstName));
		if (missing.length === 0) {
			appendReviewMessage(missingApartmentsList, "Every missionary has an apartment.");
			return;
		}
		for (const missionary of missing) {
			const isIgnored = ignoredMissingApartmentMissionaries.has(missionary);
			appendReviewItem(
				missingApartmentsList,
				missionary.getRealName(),
				isIgnored,
				() => {
					if (isIgnored) ignoredMissingApartmentMissionaries.delete(missionary);
					else ignoredMissingApartmentMissionaries.add(missionary);
					renderMissingApartments();
					updateWorkflowButtons();
				},
			);
		}
	}

	function refreshMissingApartments() {
		for (const missionary of missionaries) {
			if (missionary.currentLoc || !missionary.areaBefore) continue;
			const areaNames = [missionary.areaBefore.nameBefore, missionary.areaBefore.nameAfter]
				.filter(Boolean)
				.map(normalize);
			if (areaNames.length === 0) continue;
			missionary.currentLoc = apartments.find((apartment) => apartment.teachingAreas.some((teachingArea) =>
				areaNames.includes(normalize(teachingArea.nameBefore)) || areaNames.includes(normalize(teachingArea.nameAfter)))) ?? null;
			if (missionary.currentLoc) ignoredMissingApartmentMissionaries.delete(missionary);
		}
		renderMissingApartments();
		renderImportedData();
	}

	function recalculateMissingTransferTypes() {
		for (const missionary of missionaries) {
			if (missionary.transferType != null) continue;
			missionary.transferType = calculateTransferType(missionary);
			if (missionary.transferType != null) ignoredTransferTypeMissionaries.delete(missionary);
		}
		renderMissingTransferTypes();
		renderImportedData();
	}

	function reindexUnindexedAreas() {
		for (const area of unindexedAreas) {
			const index = findIndex(area.nameAfter || area.nameBefore);
			if (index === null) continue;
			area.index = index;
			unindexedAreas.delete(area);
			ignoredUnindexedAreas.delete(area);
		}
		renderUnindexedAreas();
		updateWorkflowButtons();
	}

	function renderDepartingMissionaries() {
		departingMissionariesList.replaceChildren();
		const selectedCount = [...departingSelection.values()].filter(Boolean).length;
		departingMissionariesConfirm.textContent = `Confirm selection (${selectedCount})`;
		const query = normalize(departingMissionarySearch.value.trim());
		const sortedMissionaries = [...missionaries].sort((first, second) =>
			first.lastName.localeCompare(second.lastName) || first.firstName.localeCompare(second.firstName));
		const matchingMissionaries = sortedMissionaries.filter((missionary) =>
			!query || normalize(`${missionary.lastName} ${missionary.firstName}`).includes(query));
		if (matchingMissionaries.length === 0) {
			appendReviewMessage(departingMissionariesList, missionaries.length ? "No missionaries match your search." : "No missionaries loaded.");
			return;
		}
		for (const missionary of matchingMissionaries) {
			const item = document.createElement("li");
			const label = document.createElement("label");
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = departingSelection.get(missionary) ?? false;
			checkbox.addEventListener("change", () => {
				departingSelection.set(missionary, checkbox.checked);
				const selectedCount = [...departingSelection.values()].filter(Boolean).length;
				departingMissionariesConfirm.textContent = `Confirm selection (${selectedCount})`;
			});
			const name = document.createElement("span");
			name.textContent = missionary.getRealName();
			label.append(checkbox, name);
			item.append(label);
			departingMissionariesList.append(item);
		}
	}

	function openDepartingMissionariesDialog() {
		if (!hasAfterBoard) return;
		departingSelection = new Map(missionaries.map((missionary) => [
			missionary,
			missionary.transferType === TransferType.ULI,
		]));
		departingMissionarySearch.value = "";
		renderDepartingMissionaries();
		departingMissionariesDialog.showModal();
	}

	function getTripRoutePlans(route) {
		let routePlan = tripPlansByRoute.get(route);
		if (!routePlan) {
			const routeApartments = [...new Set(route.stops.flatMap((stop) => stop.apartments))];
			const areaEntries = new Map(routeApartments.map((apartment) => [
				apartment,
				new Set(apartment.teachingAreas.map((area) => ({
					area,
					originalApartment: apartment,
					currentApartment: apartment,
				}))),
			]));
			const missionaryAreaEntries = new Map();
			for (const missionary of missionaries) {
				if (!missionary.areaBefore) continue;
				const areaNames = new Set([missionary.areaBefore.nameBefore, missionary.areaBefore.nameAfter]
					.filter(Boolean)
					.map(normalize));
				const candidateApartments = missionary.currentLoc && areaEntries.has(missionary.currentLoc)
					? [missionary.currentLoc, ...routeApartments.filter((apartment) => apartment !== missionary.currentLoc)]
					: routeApartments;
				for (const apartment of candidateApartments) {
					const entry = [...areaEntries.get(apartment)].find(({ area }) =>
						areaNames.has(normalize(area.nameBefore)) || areaNames.has(normalize(area.nameAfter)));
					if (!entry) continue;
					missionaryAreaEntries.set(missionary, entry);
					break;
				}
			}
			routePlan = { route, stops: new Map(), areaEntries, missionaryAreaEntries };
			tripPlansByRoute.set(route, routePlan);
		}
		return routePlan;
	}

	function getTripStopPlan(routePlan, stop) {
		let plan = routePlan.stops.get(stop);
		if (!plan) {
			const houseBefore = getTripHouseBefore(routePlan, stop);
			plan = {
				houseBefore,
			houseBeforeSnapshot: new Set(houseBefore),
				houseAfter: new Set(houseBefore),
				houseAfterOverrides: new Set(),
				boarding: new Set(),
				automaticPickUp: new Set(),
				alighting: new Set(),
				automaticDropOff: new Set(),
			};
			routePlan.stops.set(stop, plan);
		}
		return plan;
	}

	function getMorningRoutes() {
		const morningRouteNames = new Set(["North to Duma", "South to Duma"]);
		return routes.filter((candidate) =>
			morningRouteNames.has(candidate.name) && candidate.time === TripTime.Morning);
	}

	function getAfternoonRoutes() {
		const afternoonRouteNames = new Set(["Duma to North", "Duma to South"]);
		return routes.filter((candidate) =>
			afternoonRouteNames.has(candidate.name) && candidate.time === TripTime.Afternoon);
	}

	function getMorningRouteFor(route) {
		const morningRouteName = {
			"Duma to North": "North to Duma",
			"Duma to South": "South to Duma",
		}[route.name];
		if (!morningRouteName) return null;
		return getMorningRoutes().find((candidate) => candidate.name === morningRouteName) ?? null;
	}

	function refreshSharedAfternoonFirstStopHouseBefore() {
		const members = new Set(missionaries.filter((missionary) => !missionary.areaBefore));
		for (const morningRoute of getMorningRoutes()) {
			const finalStop = morningRoute.stops.at(-1);
			if (!finalStop) continue;
			const plan = getTripStopPlan(getTripRoutePlans(morningRoute), finalStop);
			for (const missionary of [...plan.houseAfter, ...plan.alighting, ...plan.automaticDropOff]) {
				members.add(missionary);
			}
		}
		sharedAfternoonFirstStopHouseBefore.clear();
		for (const missionary of members) sharedAfternoonFirstStopHouseBefore.add(missionary);
	}

	function syncSharedAfternoonFirstStopHouseAfter(afternoonRoutes) {
		const firstStopPlans = afternoonRoutes
			.filter((route) => route.stops[0])
			.map((route) => ({
				plan: getTripStopPlan(getTripRoutePlans(route), route.stops[0]),
			}));

		for (const { plan } of firstStopPlans) {
			const otherPickUps = new Set(firstStopPlans
				.filter((candidate) => candidate.plan !== plan)
				.flatMap((candidate) => [...candidate.plan.boarding]));
			for (const missionary of plan.houseBefore) {
				if (otherPickUps.has(missionary)) {
					plan.houseAfter.delete(missionary);
				} else if (!plan.boarding.has(missionary) && !plan.houseAfterOverrides.has(missionary)) {
					plan.houseAfter.add(missionary);
				}
			}
		}
	}

	function getTripHouseBefore(routePlan, stop) {
		if (routePlan.route.time === TripTime.Afternoon && routePlan.route.stops[0] === stop) {
			return sharedAfternoonFirstStopHouseBefore;
		}
		let houseBefore = null;
		if (routePlan.route.time === TripTime.Afternoon) {
			const apartmentName = stop.primaryApartment?.name;
			const morningRoute = getMorningRouteFor(routePlan.route);
			const apartmentNameKey = apartmentName ? normalize(apartmentName) : "";
			const morningStop = apartmentNameKey && morningRoute?.stops.find((candidate) =>
				normalize(candidate.primaryApartment?.name ?? "") === apartmentNameKey);
			if (morningRoute && morningStop) {
				const morningPlan = getTripStopPlan(getTripRoutePlans(morningRoute), morningStop);
				houseBefore = new Set([
					...morningPlan.houseAfter,
					...morningPlan.alighting,
					...morningPlan.automaticDropOff,
				]);
			}
		}
		if (!houseBefore) {
			houseBefore = new Set([...routePlan.missionaryAreaEntries]
				.filter(([, entry]) => stop.apartments.includes(entry.currentApartment))
				.map(([missionary]) => missionary));
		}

		return houseBefore;
	}

	function automaticPickUpTypes(routeName) {
		const typesByRoute = {
			"North to Duma": [TransferType.NLN, TransferType.NTS, TransferType.NTD],
			"South to Duma": [TransferType.SLS, TransferType.STN, TransferType.STD],
			"Duma to North": [TransferType.NMN, TransferType.DTN, TransferType.STN],
			"Duma to South": [TransferType.SMS, TransferType.DTS, TransferType.NTS],
		};
		return new Set(typesByRoute[routeName] ?? []);
	}

	function missionaryAfterAreaIsAtStop(missionary, routePlan, stop) {
		if (!missionary.areaAfter) return false;
		const areaNames = new Set([missionary.areaAfter.nameBefore, missionary.areaAfter.nameAfter]
			.filter(Boolean)
			.map(normalize));
		return stop.apartments.some((apartment) =>
			[...(routePlan.areaEntries.get(apartment) ?? [])].some(({ area }) =>
				areaNames.has(normalize(area.nameBefore)) || areaNames.has(normalize(area.nameAfter))));
	}

	function getTripHouseAfterValidation(routePlan, stop, plan) {
		const actual = new Set([...plan.houseAfter, ...plan.alighting, ...plan.automaticDropOff]
			.filter((missionary) => missionary.transferType !== TransferType.ULI));
		if (routePlan.route.time === TripTime.Morning) {
			return { isInvalid: actual.size === 1, missing: [], unexpected: [] };
		}

		const expected = new Set(missionaries.filter((missionary) =>
			missionary.transferType !== TransferType.ULI
			&& missionaryAfterAreaIsAtStop(missionary, routePlan, stop)));
		const missing = [...expected].filter((missionary) => !actual.has(missionary));
		const unexpected = [...actual].filter((missionary) => !expected.has(missionary));		
		return { isInvalid: missing.length > 0 || unexpected.length > 0, missing, unexpected };
	}

	function applyAutomaticTripMoves(routePlan) {
		for (const stop of routePlan.route.stops) {
			const plan = getTripStopPlan(routePlan, stop);
			for (const missionary of plan.automaticPickUp) {
				plan.boarding.delete(missionary);
				if (plan.houseBefore.has(missionary) && !plan.houseAfterOverrides.has(missionary)) {
					plan.houseAfter.add(missionary);
				}
			}
			plan.automaticPickUp.clear();
			for (const missionary of plan.automaticDropOff) plan.alighting.delete(missionary);
			plan.automaticDropOff.clear();
		}

		const pickupTypes = automaticPickUpTypes(routePlan.route.name);
		let vanBefore = [];
		for (const [index, stop] of routePlan.route.stops.entries()) {
			const plan = getTripStopPlan(routePlan, stop);
			for (const missionary of plan.houseAfter) {
				if (!pickupTypes.has(missionary.transferType)) continue;
				plan.houseAfter.delete(missionary);
				plan.boarding.add(missionary);
				plan.automaticPickUp.add(missionary);
			}

			const vanAfterBeforeDropOff = [...new Set([
				...vanBefore.filter((missionary) => !plan.alighting.has(missionary)),
				...plan.boarding,
			])];
			const automaticDropOffs = index === routePlan.route.stops.length - 1
				? vanAfterBeforeDropOff
				: vanAfterBeforeDropOff.filter((missionary) =>
					vanBefore.includes(missionary) && missionaryAfterAreaIsAtStop(missionary, routePlan, stop));
			for (const missionary of automaticDropOffs) {
				plan.alighting.add(missionary);
				plan.automaticDropOff.add(missionary);
			}
			vanBefore = vanAfterBeforeDropOff.filter((missionary) => !plan.alighting.has(missionary));
		}
	}

	function refreshTripHouseBefore(routePlan) {
		for (const stop of routePlan.route.stops) {
			const plan = getTripStopPlan(routePlan, stop);
			const sharedHouseBefore = getTripHouseBefore(routePlan, stop);
			const nextHouseBefore = new Set(sharedHouseBefore);
			for (const missionary of plan.houseBeforeSnapshot) {
				if (!nextHouseBefore.has(missionary) && !plan.houseAfterOverrides.has(missionary)) {
					plan.houseAfter.delete(missionary);
				}
			}
			for (const missionary of nextHouseBefore) {
				if (!plan.houseBefore.has(missionary) && !plan.houseAfterOverrides.has(missionary)) {
					plan.houseAfter.add(missionary);
				}
			}
			plan.houseBefore = routePlan.route.time === TripTime.Afternoon && routePlan.route.stops[0] === stop
				? sharedHouseBefore
				: nextHouseBefore;
			plan.houseBeforeSnapshot = nextHouseBefore;
		}
	}

	function createTripAreaChip(entry, routePlan) {
		const areaButton = document.createElement("button");
		areaButton.className = "trip-area-chip";
		areaButton.classList.toggle("is-moved", entry.currentApartment !== entry.originalApartment);
		areaButton.type = "button";
		areaButton.draggable = true;
		areaButton.textContent = formatTripArea(entry.area);
		areaButton.title = entry.currentApartment === entry.originalApartment
			? "Drag onto another teaching area to reassign it"
			: "Moved from its original assignment";
		areaButton.addEventListener("dragstart", (event) => {
			tripAreaDrag = { entry, sourceApartment: entry.currentApartment, routePlan };
			if (event.dataTransfer) {
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.setData("text/plain", "teaching-area");
			}
		});
		areaButton.addEventListener("dragend", () => { tripAreaDrag = null; });
		return areaButton;
	}

	function createTripTeachingAreas(stop, routePlan) {
		const teachingAreas = document.createElement("div");
		teachingAreas.className = "trip-teaching-areas";
		teachingAreas.setAttribute("aria-label", "Teaching areas at this stop");
		teachingAreas.addEventListener("dragover", (event) => {
			if (!tripAreaDrag || tripAreaDrag.routePlan !== routePlan
				|| tripAreaDrag.sourceApartment === stop.primaryApartment) return;
			event.preventDefault();
			if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
			teachingAreas.classList.add("is-area-drop-target");
		});
		teachingAreas.addEventListener("dragleave", (event) => {
			if (!teachingAreas.contains(event.relatedTarget)) teachingAreas.classList.remove("is-area-drop-target");
		});
		teachingAreas.addEventListener("drop", (event) => {
			if (!tripAreaDrag || tripAreaDrag.routePlan !== routePlan
				|| tripAreaDrag.sourceApartment === stop.primaryApartment) return;
			event.preventDefault();
			teachingAreas.classList.remove("is-area-drop-target");
			const drag = tripAreaDrag;
			const sourceEntries = routePlan.areaEntries.get(drag.sourceApartment);
			const destinationEntries = routePlan.areaEntries.get(stop.primaryApartment);
			if (!sourceEntries || !destinationEntries || !sourceEntries.delete(drag.entry)) return;
			destinationEntries.add(drag.entry);
			drag.entry.currentApartment = stop.primaryApartment;
			tripAreaDrag = null;
			refreshTripHouseBefore(routePlan);
			renderTripTimeline(routePlan.route);
		});
		const entries = stop.apartments.flatMap((apartment) => [...(routePlan.areaEntries.get(apartment) ?? [])]);
		if (entries.length === 0) {
			const empty = document.createElement("p");
			empty.className = "trip-teaching-areas-empty";
			empty.textContent = "No teaching areas";
			teachingAreas.append(empty);
		}
		for (const entry of entries) {
			teachingAreas.append(createTripAreaChip(entry, routePlan));
		}
		return teachingAreas;
	}

	function createTripMissionary(missionary, stop, source, draggable = false) {
		if (departingSelection.get(missionary)) return null;
		const token = document.createElement("button");
		token.className = "trip-missionary";
		token.type = "button";
		token.textContent = missionary.getRealName() || "Unidentified missionary";
		token.draggable = draggable;
		token.disabled = !draggable;
		if (draggable) {
			token.title = "Drag to the paired box";
			token.addEventListener("dragstart", (event) => {
				tripDrag = { missionary, stop, source };
				if (event.dataTransfer) {
					event.dataTransfer.effectAllowed = "move";
					event.dataTransfer.setData("text/plain", "missionary");
				}
			});
			token.addEventListener("dragend", () => { tripDrag = null; });
		}
		return token;
	}

	function createTripBox(stop, areaClass, title, members, draggableMembers = new Set(), acceptsDrop = false) {
		const box = document.createElement("section");
		box.className = `trip-box ${areaClass}`;
		const heading = document.createElement("h3");
		heading.textContent = title;
		const list = document.createElement("ul");
		list.className = "trip-box-list";
		list.setAttribute("aria-label", title);
		for (const missionary of members) {
			const token = createTripMissionary(missionary, stop, areaClass, draggableMembers.has(missionary));
			if (!token) continue;
			const item = document.createElement("li");
			item.append(token);
			list.append(item);
		}
		if (list.childElementCount === 0) {
			const empty = document.createElement("li");
			empty.className = "trip-box-empty";
			empty.textContent = "None";
			list.append(empty);
		}
		box.append(heading, list);
		if (acceptsDrop) {
			box.addEventListener("dragover", (event) => {
				if (!tripDrag || tripDrag.stop !== stop || !isTripDropAllowed(tripDrag.source, areaClass)) return;
				event.preventDefault();
				if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
				box.classList.add("is-drop-target");
			});
			box.addEventListener("dragleave", (event) => {
				if (!box.contains(event.relatedTarget)) box.classList.remove("is-drop-target");
			});
			box.addEventListener("drop", (event) => {
				if (!tripDrag || tripDrag.stop !== stop || !isTripDropAllowed(tripDrag.source, areaClass)) return;
				event.preventDefault();
				box.classList.remove("is-drop-target");
				moveTripMissionary(stop, tripDrag.missionary, tripDrag.source, areaClass);
				tripDrag = null;
			});
		}
		return box;
	}

	function isTripDropAllowed(source, destination) {
		return (source === "house-after" && destination === "pick-up")
			|| (source === "pick-up" && destination === "house-after")
			|| (source === "drop-off" && destination === "van-after")
			|| (source === "van-after" && destination === "drop-off");
	}

	function moveTripMissionary(stop, missionary, source, destination) {
		const plan = getTripStopPlan(getTripRoutePlans(activeTripRoute), stop);
		if (!plan || !isTripDropAllowed(source, destination)) return;
		if (source === "house-after") {
			plan.houseAfter.delete(missionary);
			plan.houseAfterOverrides.add(missionary);
			plan.boarding.add(missionary);
		} else if (source === "pick-up") {
			plan.boarding.delete(missionary);
			plan.houseAfter.add(missionary);
			plan.houseAfterOverrides.add(missionary);
		} else if (source === "van-after") {
			plan.alighting.add(missionary);
		} else if (source === "drop-off") {
			plan.alighting.delete(missionary);
		}
		renderTripTimeline(activeTripRoute);
	}

	function formatTripArea(area) {
		if (!area.nameBefore || area.nameBefore === area.nameAfter) return area.nameBefore || area.nameAfter || "Unnamed area";
		return `${area.nameBefore} → ${area.nameAfter || "—"}`;
	}

	function renderTripStop(stop, index, plans, vanBefore) {
		const plan = getTripStopPlan(plans, stop);
		const houseBefore = [...plan.houseBefore];
		const houseAfter = [...new Set([...plan.houseAfter, ...plan.alighting, ...plan.automaticDropOff])];
		const draggableHouseAfter = new Set(houseAfter.filter((missionary) =>
			!plan.alighting.has(missionary) && !plan.automaticDropOff.has(missionary)));
		const carriedRiders = vanBefore.filter((missionary) =>
			!plan.alighting.has(missionary) && !plan.automaticDropOff.has(missionary));
		const vanAfter = [...new Set([...carriedRiders, ...plan.boarding])]
			.filter((missionary) => !plan.alighting.has(missionary) && !plan.automaticDropOff.has(missionary));
		const primaryApartment = stop.primaryApartment;
		const stopElement = document.createElement("article");
		stopElement.className = "trip-stop";
		stopElement.setAttribute("aria-label", `Stop ${index + 1}: ${primaryApartment?.name || "Unnamed apartment"}`);

		const house = document.createElement("section");
		house.className = "trip-stop-house";
		const houseLabel = document.createElement("span");
		houseLabel.className = "trip-stop-kicker";
		houseLabel.textContent = "Primary apartment";
		const houseName = document.createElement("h2");
		houseName.textContent = primaryApartment?.name || primaryApartment?.address || "Unnamed apartment";
		house.append(houseLabel, houseName, createTripTeachingAreas(stop, plans));
		const houseAfterBox = createTripBox(
			stop,
			"house-after",
			"In house after",
			houseAfter,
			draggableHouseAfter,
			true,
		);
		const houseAfterValidation = getTripHouseAfterValidation(plans, stop, plan);
		houseAfterBox.classList.toggle("is-invalid", houseAfterValidation.isInvalid);
		if (plans.route.time === TripTime.Afternoon && houseAfterValidation.isInvalid) {
			const formatNames = (members) => members
				.map((missionary) => missionary.getRealName() || "Unidentified missionary")
				.sort((first, second) => first.localeCompare(second))
				.join(", ") || "None";
			houseAfterBox.title = [
				`Missing: ${formatNames(houseAfterValidation.missing)}`,
				`Should not be here: ${formatNames(houseAfterValidation.unexpected)}`,
			].join("\n");
		}
		stopElement.append(
			house,
			createTripBox(stop, "house-before", "In house before", houseBefore),
			houseAfterBox,
			createTripBox(
				stop,
				"pick-up",
				"Get on the van",
				[...plan.boarding],
				new Set([...plan.boarding].filter((missionary) => !plan.automaticPickUp.has(missionary))),
				true,
			),
		);

		const marker = document.createElement("div");
		marker.className = "trip-stop-marker";
		marker.innerHTML = `<span>${index + 1}</span><small>Stop</small>`;
		stopElement.append(
			marker,
			createTripBox(
				stop,
				"drop-off",
				"Get off the van",
				[...new Set([...plan.alighting, ...plan.automaticDropOff])],
				new Set([...plan.alighting].filter((missionary) => !plan.automaticDropOff.has(missionary))),
				true,
			),
			createTripBox(
				stop,
				"van-after",
				"In the van after",
				vanAfter,
				new Set(vanAfter.filter((missionary) =>
					!plan.boarding.has(missionary)
					&& !plan.automaticPickUp.has(missionary)
					&& !plan.automaticDropOff.has(missionary))),
				true,
			),
			createTripBox(stop, "van-before", "In the van before", vanBefore),
		);

		const vanFigure = document.createElement("div");
		vanFigure.className = "trip-van-figure";
		vanFigure.setAttribute("aria-label", "Transfer van");
		vanFigure.innerHTML = '<svg viewBox="0 0 120 62" role="img" aria-hidden="true"><path d="M8 13h68v34H8zM76 25h21l15 14v8H76z" /><path d="M84 28v11h21M19 22h45M19 30h45" /><circle cx="29" cy="49" r="8" /><circle cx="95" cy="49" r="8" /></svg><span>Transfer van</span>';
		stopElement.append(vanFigure);
		return { element: stopElement, vanAfter };
	}

	function refreshTripRoutePlans() {
		const preparedRoutes = new Set();
		const morningRoutes = getMorningRoutes();
		for (const morningRoute of morningRoutes) {
			const plans = getTripRoutePlans(morningRoute);
			refreshTripHouseBefore(plans);
			applyAutomaticTripMoves(plans);
			preparedRoutes.add(morningRoute);
		}

		const afternoonRoutes = getAfternoonRoutes();
		if (afternoonRoutes.length > 0) {
			refreshSharedAfternoonFirstStopHouseBefore();
			for (const afternoonRoute of afternoonRoutes) {
				const plans = getTripRoutePlans(afternoonRoute);
				refreshTripHouseBefore(plans);
				applyAutomaticTripMoves(plans);
				preparedRoutes.add(afternoonRoute);
			}
			syncSharedAfternoonFirstStopHouseAfter(afternoonRoutes);
		}

		for (const route of routes) {
			if (preparedRoutes.has(route)) continue;
			const plans = getTripRoutePlans(route);
			refreshTripHouseBefore(plans);
			applyAutomaticTripMoves(plans);
		}
	}

	function getTripRouteValidationCounts() {
		refreshTripRoutePlans();
		return new Map(routes.map((route) => {
			const plans = getTripRoutePlans(route);
			const invalidCount = route.stops.filter((stop) =>
				getTripHouseAfterValidation(plans, stop, getTripStopPlan(plans, stop)).isInvalid).length;
			return [route, invalidCount];
		}));
	}

	function updateStopsNavigationStatus(isEnabled, routeValidationCounts) {
		const invalidCount = [...routeValidationCounts.values()].reduce((total, count) => total + count, 0);
		const status = !isEnabled ? "none" : (invalidCount > 0 ? "warning" : "complete");
		for (const button of stopsNavigationButtons) {
			button.replaceChildren();
			const icon = createStatusIcon(status);
			if (icon) button.append(icon);
			button.append(document.createTextNode(invalidCount > 0 ? `Stops (${invalidCount})` : "Stops"));
			button.classList.toggle("has-review-issues", isEnabled && invalidCount > 0);
			button.setAttribute("aria-label", !isEnabled
				? "Stops"
				: invalidCount > 0
					? `Stops, ${invalidCount} invalid house-after ${invalidCount === 1 ? "placement" : "placements"}`
					: "Stops");
		}
	}

	function renderTripTimeline(route = null) {
		const selectedRoute = routes.includes(route)
			? route
			: (routes.includes(activeTripRoute) ? activeTripRoute : routes[0] ?? null);
		if (selectedRoute !== activeTripRoute) tripTimelineViewport.scrollLeft = 0;
		activeTripRoute = selectedRoute;
		const routeValidationCounts = getTripRouteValidationCounts();
		const canContinue = gatedViewButtons.length > 0 && [...gatedViewButtons].every((button) => !button.disabled);
		updateStopsNavigationStatus(canContinue, routeValidationCounts);
		tripRouteSelect.replaceChildren();
		printRouteSelect.replaceChildren();
		for (const [index, candidate] of routes.entries()) {
			for (const select of [tripRouteSelect, printRouteSelect]) {
				const option = document.createElement("option");
				option.value = String(index);
				const invalidCount = routeValidationCounts.get(candidate) ?? 0;
				const status = invalidCount > 0 ? "⚠" : "✓";
				option.textContent = `${status} ${candidate.name || `Route ${index + 1}`} (${invalidCount})`;
				select.append(option);
			}
		}
		if (selectedRoute) {
			const selectedIndex = String(routes.indexOf(selectedRoute));
			tripRouteSelect.value = selectedIndex;
			printRouteSelect.value = selectedIndex;
		}
		tripRouteSelect.disabled = routes.length === 0;
		printRouteSelect.disabled = routes.length === 0;
		tripRouteEmpty.hidden = routes.length > 0;
		printRouteEmpty.hidden = routes.length > 0;
		tripTimeline.replaceChildren();
		if (!selectedRoute) {
			renderPrintTimeline(null);
			return;
		}
		if (selectedRoute.stops.length === 0) {
			const empty = document.createElement("p");
			empty.className = "trip-timeline-empty";
			empty.textContent = "This route has no stops yet.";
			tripTimeline.append(empty);
			renderPrintTimeline(selectedRoute);
			return;
		}

		const plans = getTripRoutePlans(selectedRoute);
		let vanBefore = [];
		for (const [index, stop] of selectedRoute.stops.entries()) {
			const rendered = renderTripStop(stop, index, plans, vanBefore);
			tripTimeline.append(rendered.element);
			vanBefore = rendered.vanAfter;
		}
		renderPrintTimeline(selectedRoute, plans);
	}

	function renderPrintTimeline(route, plans = null) {
		printTimeline.replaceChildren();
		printRouteName.textContent = route?.name || "Route";
		if (!route) return;
		if (route.stops.length === 0) {
			const empty = document.createElement("p");
			empty.className = "trip-timeline-empty";
			empty.textContent = "This route has no stops yet.";
			printTimeline.append(empty);
			return;
		}

		for (const [index, stop] of route.stops.entries()) {
			const plan = getTripStopPlan(plans ?? getTripRoutePlans(route), stop);
			const pickUps = [...plan.boarding];
			const dropOffs = [...new Set([...plan.alighting, ...plan.automaticDropOff])];
			const isMissionOffice = (route.time === TripTime.Morning && index === route.stops.length - 1)
				|| (route.time === TripTime.Afternoon && index === 0);
			const officeMembers = route.time === TripTime.Morning ? dropOffs : pickUps;
			if (isMissionOffice ? officeMembers.length === 0 : pickUps.length === 0 && dropOffs.length === 0) continue;

			const apartment = stop.primaryApartment;
			const card = document.createElement("article");
			card.className = "print-stop";
			if (isMissionOffice) card.classList.add("print-stop-mission-office");
			const heading = document.createElement("header");
			heading.className = "print-stop-header";
			const details = document.createElement("div");
			details.className = "print-stop-details";
			const phone = document.createElement("span");
			phone.textContent = apartment?.phoneNumbers.join(",\n") ?? "";
			const time = document.createElement("span");
			time.className = "print-stop-time";
			time.textContent = " ";
			const name = document.createElement("h2");
			name.textContent = apartment?.name || apartment?.address || "Unnamed apartment";
			details.append(phone, time);
			heading.append(details, name);

			const columns = document.createElement("div");
			columns.className = "print-stop-columns";
			if (isMissionOffice) {
				const heading = document.createElement("h3");
				heading.className = "print-stop-columns-heading";
				heading.textContent = route.time === TripTime.Morning ? "Drop Off" : "Pick Up";
				const midpoint = Math.ceil(officeMembers.length / 2);
				columns.append(
					heading,
					createPrintColumn("", officeMembers.slice(0, midpoint)),
					createPrintColumn("", officeMembers.slice(midpoint)),
				);
			} else {
				columns.append(
					createPrintColumn("Pick Up", pickUps),
					createPrintColumn("Drop Off", dropOffs),
				);
			}
			card.append(heading, columns);
			printTimeline.append(card);
		}
	}

	function createPrintColumn(title, missionariesAtStop) {
		const column = document.createElement("section");
		column.className = "print-stop-column";
		const list = document.createElement("ul");
		for (const missionary of missionariesAtStop) {
			const item = document.createElement("li");
			item.textContent = missionary.getRealName() || "Unidentified missionary";
			list.append(item);
		}
		if (title) {
			const heading = document.createElement("h3");
			heading.textContent = title;
			column.append(heading);
		}
		column.append(list);
		return column;
	}

	function readField(row, aliases) {
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

	function periodAliases(field, period) {
		return [`${field}${period}`, `${period}${field}`, field];
	}

	function missionaryType(value) {
		switch (normalize(value)) {
			case "elder": return MissionaryType.Elder;
			case "sister": return MissionaryType.Sister;
			case "seniorcouple": return MissionaryType.Senior;
			case "temporaryassignment": return MissionaryType.Temporary;
			default: return null;
		}
	}

	function parseAssignment(row, period) {
		let firstName = readField(row, ["first name", "first", "given name", "fname", "first missionary name"]);
		let lastName = readField(row, ["last name", "last", "surname", "lname", "last missionary name"]);
		let type = missionaryType(readField(row, ["type", "missionary type", "elder sister", "gender"]));
		const fullName = readField(row, ["full name", "missionary name", "missionary", "name"]);

		const commaIndex = fullName.indexOf(",");
		if (commaIndex !== -1) {
			const lastNameParts = fullName.slice(0, commaIndex).trim().split(/\s+/).filter(Boolean);
			const leadingType = lastNameParts.length ? missionaryType(lastNameParts[0]) : null;
			if (!type && leadingType) {
				type = leadingType;
				lastNameParts.shift();
			}
			lastName = lastNameParts.join(" ");
			firstName = fullName.slice(commaIndex + 1).trim();
		} else if ((!firstName || !lastName) && fullName) {
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
			companion: readField(row, [
				...periodAliases("companion", period),
				...periodAliases("companions", period),
				...periodAliases("companion name", period),
			]),
		};
	}

	async function readAssignments(file, period) {
		if (!window.XLSX) throw new Error("The spreadsheet reader did not load. Check your internet connection and reload the page.");
		const workbook = window.XLSX.read(await file.arrayBuffer(), { type: "array" });
		const firstSheetName = workbook.SheetNames[0];
		if (!firstSheetName) throw new Error("The workbook does not contain a worksheet.");

		const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: "", raw: false });
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

	function assignName(target, period, name) {
		if (period === "before") target.nameBefore = name;
		else target.nameAfter = name;
	}

	function findOrCreateZone(name, period) {
		let zone = zones.find((candidate) => candidate.nameBefore === name || candidate.nameAfter === name);
		if (!zone) {
			zone = new Zone();
			zones.push(zone);
		}
		assignName(zone, period, name);
		return zone;
	}

	function findOrCreateDistrict(zone, name, period) {
		let district = zone.districts.find((candidate) => candidate.nameBefore === name || candidate.nameAfter === name);
		if (!district) district = new District(zone);
		assignName(district, period, name);
		return district;
	}

	function findOrCreateArea(district, name, period) {
		let area = district.areas.find((candidate) => candidate.nameBefore === name || candidate.nameAfter === name);
		if (!area) {
			let index = findIndex(name);
			area = new Area(district, index);
			if (index === null) unindexedAreas.add(area);
		}
		assignName(area, period, name);
		return area;
	}

	function findIndex(name) {
		const areaKey = normalize(name);
		const findRouteIndex = (routeName, direction) => {
			const route = routes.find((candidate) => normalize(candidate.name) === normalize(routeName));
			if (!route) return null;

			for (const [stopIndex, stop] of route.stops.entries()) {
				const hasArea = stop.apartments.some((apartment) => apartment.teachingAreas.some((area) =>
					normalize(area.nameBefore) === areaKey || normalize(area.nameAfter) === areaKey));
				if (hasArea) return stopIndex * direction;
			}
			return null;
		};

		return findRouteIndex("Duma to North", 1)
			?? findRouteIndex("Duma to South", -1)
			?? null;
	}

	function identityKey(firstName, lastName) {
		return `${normalize(firstName)}|${normalize(lastName)}`;
	}

	function calculateTransferType(missionary) {

		const beforeArea = missionary.areaBefore;
		const afterArea = missionary.areaAfter;
		if (!afterArea || afterArea.index === null || (beforeArea && beforeArea.index === null)) return null;
		//if (!afterArea) return beforeArea ? TransferType.ULI : null;
		//if (afterArea.index === null || (beforeArea && beforeArea.index === null)) return null;

		const beforeIndex = beforeArea?.index ?? 0;
		const afterIndex = afterArea.index;
		if (beforeArea === afterArea) return TransferType.STA;
		if (beforeIndex === afterIndex) return TransferType.TWV;

		if (beforeIndex > 0) {
			if (afterIndex > beforeIndex) return TransferType.NMN;
			if (afterIndex > 0) return TransferType.NLN;
			if (afterIndex < 0) return TransferType.NTS;
			if (afterIndex === 0) return TransferType.NTD;
		}

		if (beforeIndex < 0) {
			if (afterIndex < beforeIndex) return TransferType.SMS;
			if (afterIndex < 0) return TransferType.SLS;
			if (afterIndex > 0) return TransferType.STN;
			if (afterIndex === 0) return TransferType.STD;
		}

		if (beforeIndex === 0) {
			if (afterIndex > 0) return TransferType.DTN;
			if (afterIndex < 0) return TransferType.DTS;
		}

		return null;
	}

	function applyAssignments(assignments, period) {
		if (period === "before") {
			missionaries.splice(0, missionaries.length);
			zones.splice(0, zones.length);
			unindexedAreas.clear();
			ignoredUnindexedAreas.clear();
			ignoredTransferTypeMissionaries.clear();
			ignoredMissingApartmentMissionaries.clear();
		}

		const matchedThisUpload = new Set();
		let added = 0;
		let matched = 0;

		for (const assignment of assignments) {
			let missionary;
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
				missionary.compBefore = assignment.companion;
				const areaKey = normalize(assignment.area);
				missionary.currentLoc = apartments.find((apartment) => apartment.teachingAreas.some((teachingArea) =>
					normalize(teachingArea.nameBefore) === areaKey || normalize(teachingArea.nameAfter) === areaKey)) ?? null;
			} else {
							missionary.areaAfter = area;
				missionary.positionAfter = assignment.position;
				missionary.compAfter = assignment.companion;
				missionary.transferType = calculateTransferType(missionary);
			}
		}

		return { added, matched };
	}

	function setStatus(element, message, isError = false) {
		element.textContent = message;
		element.classList.toggle("error", isError);
	}

	async function importFile(file, period, nameElement, statusElement) {
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
			if (period === "before") {
				hasBeforeBoard = true;
				hasAfterBoard = false;
				departingSelectionConfirmed = false;
			} else {
				hasAfterBoard = true;
				departingSelectionConfirmed = false;
				ignoredTransferTypeMissionaries.clear();
			}
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

	function setupUploader(period) {
		const input = requireElement(`${period}-board-file`);
		const card = input.closest(".upload-card");
		if (!card) throw new Error(`Missing upload card for ${period} board.`);
		const nameElement = requireElement(`${period}-board-name`);
		const statusElement = requireElement(`${period}-board-status`);
		let dragDepth = 0;

		const handleFile = (file) => {
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

	renderImportedData();
	setupUploader("before");
	setupUploader("after");
})();
