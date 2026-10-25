(() => {
	const Direction = Object.freeze({
		North: "north",
		South: "south",
	});

	const MissionaryType = Object.freeze({
		Elder: "Elder",
		Sister: "Sister",
		Senior: "Senior",
		Temporary: "Temporary",
	});

	const TransferType = Object.freeze({
		STA: "Stay",
		TWV: "Transfer without Van",
		NTM: "North to more North",
		NTL: "North to Less North",
		NTS: "North to South",
		STM: "South to more South",
		STL: "South to less South",
		STN: "South to North",
		ULI: "home",
		NEW: "Trainee",
	});

	class Apartment {
		name = "";
		address = "";
		phoneNumbers = [];
		visualPin = null;
		teachingAreas = [];
		pickupAreas = [];
		dropoffAreas = [];
	}

	class Area {
		nameBefore = "";
		nameAfter = "";

		constructor(district) {
			this.parentDistrict = district;
			district.areas.push(this);
		}

		get district() {
			return this.parentDistrict;
		}

		getZone(period) {
			return this.parentDistrict.getZone(period);
		}
	}

	class District {
		nameBefore = "";
		nameAfter = "";
		areas = [];

		constructor(zone) {
			this.zone = zone;
			zone.districts.push(this);
		}

		getZone(period) {
			return period === "before" ? this.zone.nameBefore : this.zone.nameAfter;
		}
	}

	class Zone {
		nameBefore = "";
		nameAfter = "";
		districts = [];
	}

	class Route {
		name = "";
		apartmentList = [];
		travelTimeTable = [];

		get apartments() {
			return this.apartmentList;
		}

		get travelTimes() {
			return this.travelTimeTable;
		}

		addApartment(apartment) {
			if (this.apartmentList.includes(apartment)) {
				throw new Error("This apartment is already on the route.");
			}

			const newSize = this.apartmentList.length + 1;
			for (const row of this.travelTimeTable) row.push(null);
			this.travelTimeTable.push(Array.from({ length: newSize }, () => null));
			this.apartmentList.push(apartment);
		}

		setTravelTime(from, to, minutes) {
			this.travelTimeTable[this.indexOfApartment(from)][this.indexOfApartment(to)] = minutes;
		}

		travelTime(from, to) {
			return this.travelTimeTable[this.indexOfApartment(from)][this.indexOfApartment(to)];
		}

		nextStop(currentLoc, dir) {
			const currentIndex = this.indexOfApartment(currentLoc);
			const offset = dir === Direction.North ? 1 : -1;
			return this.apartmentList[currentIndex + offset] ?? null;
		}

		indexOfApartment(apartment) {
			const index = this.apartmentList.indexOf(apartment);
			if (index === -1) throw new Error("Apartment is not on this route.");
			return index;
		}
	}

	class Missionary {
		type = null;
		lastName = "";
		firstName = "";
		areaBefore = null;
		areaAfter = null;
		positionBefore = "";
		positionAfter = "";
		currentLoc = null;
		transferType = null;
	}

	window.TransferVanModels = {
		Direction,
		MissionaryType,
		TransferType,
		Apartment,
		Appartment: Apartment,
		Area,
		District,
		Zone,
		Route,
		Missionary,
	};
})();
