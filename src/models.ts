export interface VisualPin {
	x: number;
	y: number;
}

export enum Direction {
	North = "north",
	South = "south",
}

export enum MissionaryType {
	Elder = "Elder",
	Sister = "Sister",
	Senior = "Senior",
	Temporary = "Temporary",
}

export enum TransferType {
	STA = "Stay",
	TWV = "Transfer without Van",
	NTM = "North to more North",
	NTL = "North to Less North",
	NTS = "North to South",
	STM = "South to more South",
	STL = "South to less South",
	STN = "South to North",
    ULI = "home",
    NEW = "Trainee",
}

export class Apartment {
	name = "";
	address = "";
	phoneNumbers: string[] = [];
	visualPin: VisualPin | null = null;
	teachingAreas: Area[] = [];
	pickupAreas: Area[] = [];
	dropoffAreas: Area[] = [];
}

export { Apartment as Appartment };

export class Area {
	nameBefore = "";
	nameAfter = "";
	private readonly parentDistrict: District;

	constructor(district: District) {
		this.parentDistrict = district;
		district.areas.push(this);
	}

	get district(): District {
		return this.parentDistrict;
	}

	getZone(period: "before" | "after"): string {
		return this.parentDistrict.getZone(period);
	}
}

export class District {
	nameBefore = "";
	nameAfter = "";
	areas: Area[] = [];
	readonly zone: Zone;

	constructor(zone: Zone) {
		this.zone = zone;
		zone.districts.push(this);
	}

	getZone(period: "before" | "after"): string {
		return period === "before" ? this.zone.nameBefore : this.zone.nameAfter;
	}
}

export class Zone {
	nameBefore = "";
	nameAfter = "";
	districts: District[] = [];
}

export class Route {
	private readonly apartmentList: Apartment[] = [];
	private readonly travelTimeTable: (number | null)[][] = [];

	get apartments(): ReadonlyArray<Apartment> {
		return this.apartmentList;
	}

	get travelTimes(): ReadonlyArray<ReadonlyArray<number | null>> {
		return this.travelTimeTable;
	}

	addApartment(apartment: Apartment): void {
		if (this.apartmentList.includes(apartment)) {
			throw new Error("This apartment is already on the route.");
		}

		const newSize = this.apartmentList.length + 1;
		for (const row of this.travelTimeTable) {
			row.push(null);
		}
		this.travelTimeTable.push(Array.from({ length: newSize }, () => null));
		this.apartmentList.push(apartment);
	}

	setTravelTime(from: Apartment, to: Apartment, minutes: number): void {
		const fromIndex = this.indexOfApartment(from);
		const toIndex = this.indexOfApartment(to);
		this.travelTimeTable[fromIndex][toIndex] = minutes;
	}

	travelTime(from: Apartment, to: Apartment): number | null {
		const fromIndex = this.indexOfApartment(from);
		const toIndex = this.indexOfApartment(to);
		return this.travelTimeTable[fromIndex][toIndex];
	}

	nextStop(currentLoc: Apartment, dir: Direction): Apartment | null {
		const currentIndex = this.indexOfApartment(currentLoc);
		const offset = dir === Direction.North ? 1 : -1;
		return this.apartmentList[currentIndex + offset] ?? null;
	}

	private indexOfApartment(apartment: Apartment): number {
		const index = this.apartmentList.indexOf(apartment);
		if (index === -1) {
			throw new Error("Apartment is not on this route.");
		}
		return index;
	}
}

export class Missionary {
	type: MissionaryType | null = null;
	lastName = "";
	firstName = "";
	areaBefore: Area | null = null;
	areaAfter: Area | null = null;
	positionBefore = "";
	positionAfter = "";
	currentLoc: Apartment | null = null;
	transferType: TransferType | null = null;
}
