(() => {
	const {
		Apartment,
		Area,
		District,
		Missionary,
		MissionaryType,
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
	const routesView = requireElement("routes-view");
	const missionaryOutput = requireElement("missionary-output");
	const zoneOutput = requireElement("zone-output");
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
	const zoomOutButton = requireElement("zoom-out");
	const zoomInButton = requireElement("zoom-in");
	const zoomFitButton = requireElement("zoom-fit");
	const zoomLevel = requireElement("zoom-level");
	const singleApartmentDialog = requireElement("single-apartment-dialog");
	const singleApartmentForm = requireElement("single-apartment-form");
	const singleApartmentName = requireElement("single-apartment-name");
	const editApartmentDialog = requireElement("edit-apartment-dialog");
	const editApartmentForm = requireElement("edit-apartment-form");
	const editApartmentName = requireElement("edit-apartment-name");
	const editApartmentAddress = requireElement("edit-apartment-address");
	const editApartmentPhones = requireElement("edit-apartment-phones");
	const editApartmentTeachingAreas = requireElement("edit-apartment-teaching-areas");
	const editApartmentPickupAreas = requireElement("edit-apartment-pickup-areas");
	const editApartmentDropoffAreas = requireElement("edit-apartment-dropoff-areas");
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
	let minimumMapScale = 0;
	let mapScale = 0;
	let pendingBatchApartments = [];
	let editingApartment = null;
	let apartmentTeachingAreaDistrict = null;
	let activePanPointer = null;
	let panStartX = 0;
	let panStartY = 0;
	let panStartScrollLeft = 0;
	let panStartScrollTop = 0;

	requireElement("new-trip").addEventListener("click", () => {
		homeView.hidden = true;
		tripView.hidden = false;
		window.scrollTo(0, 0);
	});

	requireElement("back-to-home").addEventListener("click", () => {
		tripView.hidden = true;
		homeView.hidden = false;
		window.scrollTo(0, 0);
	});

	function setSidebarOpen(isOpen) {
		routesSidebar.classList.toggle("is-open", isOpen);
		routesView.classList.toggle("menu-open", isOpen);
		sidebarToggle.setAttribute("aria-expanded", String(isOpen));
		sidebarToggle.setAttribute("aria-label", isOpen ? "Close routes and apartments" : "Open routes and apartments");
		sidebarToggle.title = isOpen ? "Close menu" : "Open menu";
	}

	function renderRouteLists() {
		routesList.replaceChildren();
		apartmentsList.replaceChildren();
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
				item.className = "collection-item";
				item.textContent = `Route ${index + 1} · ${route.apartments.length} apartments`;
				routesList.append(item);
			});
		}

		if (apartments.length === 0) {
			const empty = document.createElement("li");
			empty.className = "collection-empty";
			empty.textContent = "No apartments yet";
			apartmentsList.append(empty);
		} else {
			apartments.forEach((apartment, index) => {
				const item = document.createElement("li");
				item.className = "apartment-list-row";
				const label = document.createElement("span");
				label.className = "apartment-list-name";
				label.textContent = apartment.name || apartment.address || `Apartment ${index + 1}`;
				const actions = document.createElement("div");
				actions.className = "apartment-list-actions";
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
		editApartmentPickupAreas.value = apartmentAreaText(apartment.pickupAreas);
		editApartmentDropoffAreas.value = apartmentAreaText(apartment.dropoffAreas);
		updateNameInputState(editApartmentName, isDuplicateApartmentName(apartment.name, apartment));
		editApartmentDialog.showModal();
		editApartmentName.focus();
	}

	function deleteApartment(apartment) {
		const index = apartments.indexOf(apartment);
		if (index === -1) return;
		apartments.splice(index, 1);
		for (const route of routes) {
			const apartmentIndex = route.apartmentList.indexOf(apartment);
			if (apartmentIndex === -1) continue;
			route.apartmentList.splice(apartmentIndex, 1);
			route.travelTimeTable.splice(apartmentIndex, 1);
			for (const row of route.travelTimeTable) row.splice(apartmentIndex, 1);
		}
		renderRouteLists();
	}

	function resetBatchApartmentDialog() {
		pendingBatchApartments = [];
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
		batchApartmentDropzone.hidden = false;
		batchApartmentDropzone.classList.remove("drag-over");
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

		const reviewedAddresses = new Set(pendingBatchApartments.map(({ key }) => key));
		const nameCounts = new Map();
		for (const apartment of apartments) {
			if (reviewedAddresses.has(normalize(apartment.address))) continue;
			const nameKey = normalize(apartment.name);
			if (nameKey) nameCounts.set(nameKey, (nameCounts.get(nameKey) ?? 0) + 1);
		}
		for (const { nameInput } of pendingBatchApartments) {
			const nameKey = normalize(nameInput.value.trim());
			if (nameKey) nameCounts.set(nameKey, (nameCounts.get(nameKey) ?? 0) + 1);
		}
		const duplicateNameKeys = new Set([...nameCounts]
			.filter(([, count]) => count > 1)
			.map(([nameKey]) => nameKey));
		for (const { nameInput } of pendingBatchApartments) {
			updateNameInputState(nameInput, duplicateNameKeys.has(normalize(nameInput.value.trim())));
		}
		const duplicateCount = [...nameCounts.values()]
			.filter((count) => count > 1)
			.reduce((total, count) => total + count, 0);
		batchApartmentDuplicateCount.textContent = `${duplicateCount} ${duplicateCount === 1 ? "apartment has a duplicate name" : "apartments have duplicate names"}`;
		batchApartmentDuplicateCount.hidden = duplicateCount === 0;
		const hasInvalidFields = [...batchApartmentForm.elements]
			.some((field) => field.willValidate && !field.validity.valid);
		saveBatchApartments.disabled = missingCount > 0 || duplicateCount > 0 || hasInvalidFields;
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

	function renderBatchApartmentReview(candidates) {
		pendingBatchApartments = candidates.map((candidate, index) => {
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
			nameInput.value = existing?.name || (candidate.teachingAreaNames.length === 1 ? candidate.teachingAreaNames[0] : "");
			nameInput.addEventListener("input", updateBatchApartmentNameState);
			nameLabel.append(nameInput);
			const pinButton = document.createElement("button");
			pinButton.className = "secondary pin-action";
			pinButton.type = "button";
			pinButton.textContent = "Add pin";
			entry.append(nameLabel, addressText, phoneText, areaText, pinButton);
			batchApartmentReviewList.append(entry);
			return { ...candidate, nameInput };
		});

		batchApartmentReviewSummary.textContent = `${candidates.length} unique ${candidates.length === 1 ? "address" : "addresses"}. Review the details and enter a name for each apartment.`;
		batchApartmentReview.hidden = false;
		saveBatchApartments.hidden = false;
		updateBatchApartmentNameState();
	}

	async function loadBatchApartmentFile(file) {
		pendingBatchApartments = [];
		batchApartmentFilename.textContent = file.name;
		batchApartmentStatus.classList.remove("error");
		batchApartmentReview.hidden = true;
		batchApartmentReviewList.replaceChildren();
		batchApartmentUnnamedCount.hidden = true;
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

	requireElement("define-default-routes").addEventListener("click", () => {
		homeView.hidden = true;
		tripView.hidden = true;
		routesView.hidden = false;
		setSidebarOpen(false);
		window.requestAnimationFrame(() => fitOverviewMap(true));
	});

	requireElement("routes-back").addEventListener("click", () => {
		routesView.hidden = true;
		homeView.hidden = false;
		setSidebarOpen(false);
		window.scrollTo(0, 0);
	});

	requireElement("add-route").addEventListener("click", () => {
		routes.push(new Route());
		renderRouteLists();
	});

	requireElement("add-apartment").addEventListener("click", () => {
		singleApartmentForm.reset();
		updateNameInputState(singleApartmentName);
		singleApartmentDialog.showModal();
		singleApartmentName.focus();
	});
	singleApartmentName.addEventListener("input", () => {
		updateNameInputState(singleApartmentName, isDuplicateApartmentName(singleApartmentName.value));
	});
	singleApartmentForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const apartment = new Apartment();
		apartment.name = singleApartmentName.value.trim();
		const duplicate = isDuplicateApartmentName(apartment.name);
		updateNameInputState(singleApartmentName, duplicate);
		if (!apartment.name || duplicate) return;
		apartments.push(apartment);
		renderRouteLists();
		singleApartmentDialog.close();
	});
	requireElement("cancel-single-apartment").addEventListener("click", () => singleApartmentDialog.close());
	singleApartmentDialog.addEventListener("cancel", (event) => event.preventDefault());

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
		editingApartment.pickupAreas = mergeUniqueAreas([], splitCellValues(editApartmentPickupAreas.value));
		editingApartment.dropoffAreas = mergeUniqueAreas([], splitCellValues(editApartmentDropoffAreas.value));

		renderRouteLists();
		editApartmentDialog.close();
	});
	requireElement("cancel-edit-apartment").addEventListener("click", () => editApartmentDialog.close());
	editApartmentDialog.addEventListener("cancel", (event) => event.preventDefault());
	editApartmentDialog.addEventListener("close", () => { editingApartment = null; });

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
			let apartment = apartments.find((existing) => normalize(existing.address) === candidate.key);
			if (!apartment) {
				apartment = new Apartment();
				apartment.address = candidate.address;
				apartments.push(apartment);
			}
			apartment.name = candidate.nameInput.value.trim();
			apartment.phoneNumbers = mergeUniqueStrings(apartment.phoneNumbers, candidate.phoneNumbers);
			apartment.teachingAreas = mergeUniqueAreas(apartment.teachingAreas, candidate.teachingAreaNames);
		}

		renderRouteLists();
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
	}

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
		if (event.button !== 0 || event.pointerType !== "mouse") return;
		activePanPointer = event.pointerId;
		panStartX = event.clientX;
		panStartY = event.clientY;
		panStartScrollLeft = mapViewport.scrollLeft;
		panStartScrollTop = mapViewport.scrollTop;
		mapViewport.classList.add("is-dragging");
		mapViewport.setPointerCapture(event.pointerId);
		event.preventDefault();
	});
	mapViewport.addEventListener("pointermove", (event) => {
		if (event.pointerId !== activePanPointer) return;
		mapViewport.scrollLeft = panStartScrollLeft - (event.clientX - panStartX);
		mapViewport.scrollTop = panStartScrollTop - (event.clientY - panStartY);
	});
	const stopMapPan = (event) => {
		if (event.pointerId !== activePanPointer) return;
		activePanPointer = null;
		mapViewport.classList.remove("is-dragging");
	};
	mapViewport.addEventListener("pointerup", stopMapPan);
	mapViewport.addEventListener("pointercancel", stopMapPan);
	mapViewport.addEventListener("lostpointercapture", stopMapPan);
	mapViewport.addEventListener("wheel", (event) => {
		event.preventDefault();
		const bounds = mapViewport.getBoundingClientRect();
		const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
		changeMapScale(mapScale * factor, event.clientX - bounds.left, event.clientY - bounds.top);
	}, { passive: false });
	overviewMap.addEventListener("load", () => fitOverviewMap(routesView.hidden === false));
	window.addEventListener("resize", () => {
		if (!routesView.hidden) fitOverviewMap();
	});
	renderRouteLists();

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
			`Pickup areas: ${formatAreas(apartment.pickupAreas)}`,
			`Dropoff areas: ${formatAreas(apartment.dropoffAreas)}`,
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
					item.textContent = `Area: ${displayChangedName(area.nameBefore, area.nameAfter)}`;
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
	}

	function normalize(value) {
		return value.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
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
			case "senior": return MissionaryType.Senior;
			case "temporary": return MissionaryType.Temporary;
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
		if (!area) area = new Area(district);
		assignName(area, period, name);
		return area;
	}

	function identityKey(firstName, lastName) {
		return `${normalize(firstName)}|${normalize(lastName)}`;
	}

	function applyAssignments(assignments, period) {
		if (period === "before") {
			missionaries.splice(0, missionaries.length);
			zones.splice(0, zones.length);
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
			} else {
				missionary.areaAfter = area;
				missionary.positionAfter = assignment.position;
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
