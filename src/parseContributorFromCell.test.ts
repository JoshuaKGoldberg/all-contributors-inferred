import { ElementType } from "htmlparser2";
import { describe, expect, it } from "vitest";

import { ElementOfName } from "./dom.js";
import { parseContributorFromCell } from "./parseContributorFromCell.js";

function createFakeAvatar(overrides?: Partial<ElementOfName<"a">>) {
	return {
		attribs: {},
		children: [createFakeImg()],
		type: ElementType.Tag,
		...overrides,
	} as ElementOfName<"a">;
}

function createFakeContribution(overrides?: Partial<ElementOfName<"a">>) {
	return {
		attribs: {
			href: "",
			title: "",
		},
		name: "a",
		type: ElementType.Tag,
		...overrides,
	} as ElementOfName<"a">;
}

function createFakeImg(overrides?: Partial<ElementOfName<"img">>) {
	return {
		attribs: {
			src: "",
		},
		name: "img",
		type: ElementType.Tag,
		...overrides,
	} as ElementOfName<"img">;
}

describe("parseContributorFromCell", () => {
	it("returns an empty object when data does not exist", () => {
		const actual = parseContributorFromCell({
			avatar: createFakeAvatar(),
			contributions: [createFakeContribution()],
		});

		expect(actual).toEqual({});
	});

	it("returns a full object when data exists", () => {
		const actual = parseContributorFromCell({
			avatar: createFakeAvatar({
				attribs: {
					href: "https://www.joshuakgoldberg.com",
				},
				children: [
					createFakeImg({
						attribs: {
							alt: "Josh Goldberg",
							src: "https://avatars.githubusercontent.com/u/3335181?v=4",
						},
					}),
				],
			}),
			contributions: [
				createFakeContribution({
					attribs: {
						href: "https://github.com/JoshuaKGoldberg/all-contributors-inferred/issues?q=author%3AJoshuaKGoldberg",
						title: "Bug reports",
					},
				}),
			],
		});

		expect(actual).toEqual({
			avatar_url: "https://avatars.githubusercontent.com/u/3335181?v=4",
			contributions: ["bug"],
			login: "JoshuaKGoldberg",
			name: "Josh Goldberg",
			profile: "https://www.joshuakgoldberg.com",
		});
	});
});
