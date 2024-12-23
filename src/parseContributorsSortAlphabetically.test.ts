import { describe, expect, it } from "vitest";

import { parseContributorsSortAlphabetically } from "./parseContributorsSortAlphabetically.js";
import { Contributor } from "./types.js";

function createFakeContributor(overrides?: Partial<Contributor>) {
	return {
		avatar_url: "",
		contributions: [],
		login: "",
		name: "",
		profile: "",
		...overrides,
	};
}

describe("parseContributorsSortAlphabetically", () => {
	it("returns undefined when there are no contributors", () => {
		const actual = parseContributorsSortAlphabetically([]);

		expect(actual).toBe(undefined);
	});

	it("returns undefined when there is only one contributor", () => {
		const actual = parseContributorsSortAlphabetically([
			createFakeContributor(),
		]);

		expect(actual).toBe(undefined);
	});

	it("returns undefined when there are multiple contributors and only one has a login", () => {
		const actual = parseContributorsSortAlphabetically([
			createFakeContributor({}),
			createFakeContributor({ login: "a" }),
		]);

		expect(actual).toBe(undefined);
	});

	it("returns undefined when there are multiple contributors out of alphabetical order", () => {
		const actual = parseContributorsSortAlphabetically([
			createFakeContributor({ login: "b" }),
			createFakeContributor({ login: "a" }),
		]);

		expect(actual).toBe(undefined);
	});

	it("returns true when there are multiple contributors in alphabetical order", () => {
		const actual = parseContributorsSortAlphabetically([
			createFakeContributor({ login: "a" }),
			createFakeContributor({ login: "b" }),
		]);

		expect(actual).toBe(true);
	});
});
