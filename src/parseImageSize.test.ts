import { ElementType } from "htmlparser2";
import { describe, expect, it } from "vitest";

import { ElementOfName } from "./dom.js";
import { parseImageSize } from "./parseImageSize.js";

function createFakeAvatar(overrides?: Partial<ElementOfName<"a">>) {
	return {
		children: [],
		type: ElementType.Tag,
		...overrides,
	} as ElementOfName<"a">;
}

function createFakeImg(overrides?: Partial<ElementOfName<"img">>) {
	return {
		name: "img",
		type: ElementType.Tag,
		...overrides,
	} as ElementOfName<"img">;
}

describe("parseImageSize", () => {
	it("returns undefined when there are no cells", () => {
		const actual = parseImageSize([]);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when no cell has an img", () => {
		const actual = parseImageSize([
			{
				avatar: createFakeAvatar(),
				contributions: [],
			},
		]);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when no cell image includes a s=", () => {
		const actual = parseImageSize([
			{
				avatar: createFakeAvatar({
					children: [
						createFakeImg({
							attribs: {
								src: "https://avatars.githubusercontent.com/u/3335181?v=4",
							},
						}),
					],
				}),
				contributions: [],
			},
		]);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when a cell image includes a s= with the default size of 100", () => {
		const actual = parseImageSize([
			{
				avatar: createFakeAvatar({
					children: [
						createFakeImg({
							attribs: {
								src: "https://avatars.githubusercontent.com/u/3335181?v=4?s=100",
							},
						}),
					],
				}),
				contributions: [],
			},
		]);

		expect(actual).toBeUndefined();
	});

	it("returns the image size when a cell image includes a s= with a custom size", () => {
		const actual = parseImageSize([
			{
				avatar: createFakeAvatar({
					children: [
						createFakeImg({
							attribs: {
								src: "https://avatars.githubusercontent.com/u/3335181?v=4?s=123",
							},
						}),
					],
				}),
				contributions: [],
			},
		]);

		expect(actual).toBe(123);
	});
});
