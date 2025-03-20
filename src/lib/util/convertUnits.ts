// todo: handle singular/plural unit names
export type ConversionResult = {
	unit: string;
	value: number;
	descriptions?: Record<string, string>; // Optional descriptions for the conversion
};

type ConversionFunction = {
	function: (value: number) => number; // Conversion logic
	descriptions: Record<string, string>; // Human-readable descriptions
};

export class Converter {
	private conversions: Record<string, Record<string, number | ConversionFunction>> = {
		// Length
		length: {
			meters: 1,
			kilometers: 0.001,
			centimeters: 100,
			millimeters: 1000,
			micrometers: 1e6,
			nanometers: 1e9,
			inches: 39.3701,
			feet: 3.28084,
			yards: 1.09361,
			miles: 0.000621371,
			nauticalMiles: 0.000539957
		},
		// Mass
		mass: {
			grams: 1,
			kilograms: 0.001,
			milligrams: 1000,
			metricTons: 1e-6,
			usTons: 0.00000110231,
			pounds: 0.00220462,
			ounces: 0.03527396
		},
		// Volume
		volume: {
			liters: 1,
			milliliters: 1000,
			cubicMeters: 0.001,
			cubicCentimeters: 1000,
			cubicInches: 61.0237,
			cubicFeet: 0.0353147,
			gallons: 0.264172,
			gallonsImperial: 0.219969,
			teaspoons: 202.884,
			tablespoons: 67.628
		},
		// Time
		time: {
			seconds: 1,
			minutes: 1 / 60,
			hours: 1 / 3600,
			days: 1 / 86400,
			weeks: 1 / 604800,
			months: 1 / 2629800,
			years: 1 / 31556952,
			decades: 1 / 315569520
		},
		// Temperature
		temperature: {
			celsius: 1,
			fahrenheit: {
				function: (value: number) => (value * 9) / 5 + 32,
				descriptions: {
					celsius: '°F = °C × 9/5 + 32',
					kelvin: '°F = (°K - 273.15) × 9/5 + 32'
				}
			},
			kelvin: {
				function: (value: number) => value + 273.15,
				descriptions: {
					celsius: '°K = °C + 273.15',
					fahrenheit: '°K = (°F - 32) × 5/9 + 273.15'
				}
			}
		},
		// Speed
		speed: {
			metersPerSecond: 1,
			kilometersPerHour: 3.6,
			milesPerHour: 2.23694,
			feetPerSecond: 3.28084,
			knots: 1.94384
		},
		// Pressure
		pressure: {
			pascal: 1,
			bar: 1e-5,
			psi: 0.0001450377,
			atmosphere: 9.86923e-6,
			torr: 0.00750062,
			millimetersOfMercury: 0.00750062,
			kilopascals: 0.001
		},
		// Current
		current: {
			amperes: 1,
			milliamperes: 1000,
			microamperes: 1e6
		},
		// Voltage
		voltage: {
			volts: 1,
			millivolts: 1000,
			microvolts: 1e6
		},
		// Power
		power: {
			watts: 1,
			kilowatts: 0.001,
			megawatts: 1e-6,
			horsepower: 0.00134102,
			btuPerHour: 3.41214
		},
		// Force
		force: {
			newtons: 1,
			dynes: 1e5,
			poundsForce: 0.224809,
			kilonewtons: 0.001
		},
		// Resistance
		resistance: {
			ohms: 1,
			kiloohms: 0.001,
			megaohms: 1e-6
		},
		// Energy
		energy: {
			joules: 1,
			kilojoules: 0.001,
			calories: 0.2388459,
			kilocalories: 0.0002388459,
			wattHours: 1 / 3600
		},
		// Density
		density: {
			kilogramsPerCubicMeter: 1,
			gramsPerCubicCentimeter: 1000,
			poundsPerCubicFoot: 0.06242796,
			gramsPerMilliliter: 1000
		},
		// Area
		area: {
			squareMeters: 1,
			squareKilometers: 1e-6,
			squareCentimeters: 10000,
			squareMillimeters: 1e6,
			squareInches: 1550.0031,
			squareFeet: 10.7639,
			acres: 0.000247105,
			hectares: 1e-4
		},
		// Magnetic Field Strength
		magneticFieldStrength: {
			tesla: 1,
			gauss: 10000
		},
		// Concentration
		concentration: {
			molesPerLiter: 1,
			molar: 1,
			percent: 100
		}
	};

	convert(value: string, fromUnit: string, measure: string): ConversionResult[] {
		const numValue = parseFloat(value);
		if (isNaN(numValue)) return [];

		const measureConversions = this.conversions[measure];
		if (!measureConversions) return [];

		return Object.entries(measureConversions).map(([unit, conversion]) => {
			const isFunction = typeof conversion === 'object';
			return {
				unit,
				value: this.convertUnit(numValue, fromUnit, unit, measure),
				descriptions: isFunction ? conversion.descriptions : undefined
			};
		});
	}

	private convertUnit(value: number, fromUnit: string, toUnit: string, measure: string): number {
		const conversionFrom = this.conversions[measure][fromUnit];
		const conversionTo = this.conversions[measure][toUnit];

		if (typeof conversionFrom === 'object') {
			value = conversionFrom.function(value); // Apply the conversion function
		} else {
			value = value / conversionFrom; // Simple multiplier
		}

		if (typeof conversionTo === 'object') {
			return conversionTo.function(value); // Apply the conversion function
		}

		return value * conversionTo; // Simple multiplier
	}

	getMeasures() {
		return Object.keys(this.conversions);
	}

	getUnits(measure: string) {
		return Object.keys(this.conversions[measure] || {});
	}

	getUnitType(unit: string): string | null {
		return Object.keys(this.conversions).find((measure) => this.conversions[measure][unit]) || null;
	}
}

export const converter = new Converter();
