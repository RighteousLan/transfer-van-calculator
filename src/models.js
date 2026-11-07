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

	const TripTime = Object.freeze({
		Morning: "morning",
		Afternoon: "afternoon",
	});

	const TransferType = Object.freeze({
		STA: "Stay",				 //Same area before and after transfer
		TWV: "Transfer without Van", //Same apartment index, no van needed, just a transfer
		NTM: "North to more North",  //afternoon van going north
		NTL: "North to Less North",	 //morning van going south, does not reach duma
		NTS: "North to South",		 //morning van going south, duma, afternoon van south
		NTD: "North to Duma",		 //morning van going south, duma
		STM: "South to more South",  //afternoon van going south
		STL: "South to less South",  //morning van going north
		STN: "South to North",		 //morning van going north, duma, afternoon north
		STD: "South to Duma",		 //morning van going south, duma
		DTN: "Duma to North",		 //start index 0, afternoon van going north
		DTS: "Duma to South",		 //start index 0, afternoon van going south
		ULI: "home",				 //already gone
		//NEW: "Trainee",
	});

	class Apartment {
		name = "";
		address = "";
		phoneNumbers = [];
		visualPin = null;
		teachingAreas = [];
	}

	class Area {
		nameBefore = "";
		nameAfter = "";
		index = 0;

		constructor(district, index = 0) {
			this.parentDistrict = district;
			this.index = index;
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

	class Stop {
		primaryApartment = null;
		secondaryApartments = [];

		constructor(primaryApartment = null) {
			this.primaryApartment = primaryApartment;
		}

		get apartments() {
			return [this.primaryApartment, ...this.secondaryApartments].filter(Boolean);
		}

		addSecondaryApartment(apartment) {
			if (this.apartments.includes(apartment)) return false;
			this.secondaryApartments.push(apartment);
			return true;
		}
	}

	class Route {
		name = "";
		time = TripTime.Morning;
		stops = [];
		travelTimeTable = [];

		get apartments() {
			return this.stops.flatMap((stop) => stop.apartments);
		}

		get travelTimes() {
			return this.travelTimeTable;
		}

		addStop(apartment) {
			if (this.apartments.includes(apartment)) {
				throw new Error("This apartment is already on the route.");
			}

			const newSize = this.stops.length + 1;
			for (const row of this.travelTimeTable) row.push(null);
			this.travelTimeTable.push(Array.from({ length: newSize }, () => null));
			const stop = new Stop(apartment);
			this.stops.push(stop);
			return stop;
		}

		addApartment(apartment) {
			return this.addStop(apartment);
		}

		addSecondaryApartment(stop, apartment) {
			if (!this.stops.includes(stop) || this.apartments.includes(apartment)) return false;
			return stop.addSecondaryApartment(apartment);
		}

		moveApartmentToStop(apartment, targetApartment) {
			if (apartment === targetApartment) return false;
			let targetStop = this.stops.find((stop) => stop.apartments.includes(targetApartment));
			if (!targetStop) targetStop = this.addStop(targetApartment);

			const sourceStop = this.stops.find((stop) => stop.apartments.includes(apartment));
			if (!sourceStop) return targetStop.addSecondaryApartment(apartment);
			if (sourceStop === targetStop) return false;

			this.removeApartment(apartment);
			return targetStop.addSecondaryApartment(apartment);
		}

		mergeStops(sourceStop, targetStop) {
			const sourceIndex = this.stops.indexOf(sourceStop);
			if (sourceIndex === -1 || !this.stops.includes(targetStop) || sourceStop === targetStop) return false;

			for (const apartment of sourceStop.apartments) targetStop.addSecondaryApartment(apartment);
			this.stops.splice(sourceIndex, 1);
			this.travelTimeTable.splice(sourceIndex, 1);
			for (const row of this.travelTimeTable) row.splice(sourceIndex, 1);
			return true;
		}

		removeApartment(apartment) {
			const stopIndex = this.stops.findIndex((stop) => stop.primaryApartment === apartment);
			if (stopIndex !== -1) {
				const stop = this.stops[stopIndex];
				if (stop.secondaryApartments.length > 0) {
					stop.primaryApartment = stop.secondaryApartments.shift();
				} else {
					this.stops.splice(stopIndex, 1);
					this.travelTimeTable.splice(stopIndex, 1);
					for (const row of this.travelTimeTable) row.splice(stopIndex, 1);
				}
				return true;
			}
			const parentStop = this.stops.find((stop) => stop.secondaryApartments.includes(apartment));
			if (!parentStop) return false;
			parentStop.secondaryApartments.splice(parentStop.secondaryApartments.indexOf(apartment), 1);
			return true;
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
			return this.stops[currentIndex + offset]?.primaryApartment ?? null;
		}

		indexOfApartment(apartment) {
			const index = this.stops.findIndex((stop) => stop.apartments.includes(apartment));
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
		//pickupApartment = null;
		//dropoffApartment = null;

		getRealName() {
			return [this.type, this.lastName].filter(Boolean).join(" ");
		}
	}

	class TripStop {
		teachingAreas = [];
		inHouseBefore = [];
		inHouseAfter = [];
		pickUp = [];
		dropOff = [];
		inVanBefore = [];
		inVanAfter = [];
		finalTransfer = [];
	}

	class Trip {
		name = "";
		time = TripTime.Morning;
		stops = [];
	}

	window.TransferVanModels = {
		Direction,
		MissionaryType,
		TripTime,
		TransferType,
		Apartment,
		Appartment: Apartment,
		Area,
		District,
		Zone,
		Stop,
		Route,
		Missionary,
		TripStop,
		Trip,
	};
})();
