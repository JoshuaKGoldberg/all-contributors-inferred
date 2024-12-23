import { describe, expect, it } from "vitest";

import { parseBadgeTemplate } from "./parseBadgeTemplate.js";

describe("parseBadgeTemplate", () => {
	it("returns undefined when the locator comment does not exist", () => {
		const actual = parseBadgeTemplate(
			2,
			`ALL-CONTRIBUTORS-BADGE:START (invalid) ALL-CONTRIBUTORS-BADGE:END`,
		);

		expect(actual).toBeUndefined();
	});

	it("replaces only full digit matches of counts when counts match", () => {
		const actual = parseBadgeTemplate(
			1,
			`
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
`,
		);

		expect(actual).toBe(
			`\t<a href="#contributors" target="_blank"><img alt="👪 All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg" /></a>`,
		);
	});
});
