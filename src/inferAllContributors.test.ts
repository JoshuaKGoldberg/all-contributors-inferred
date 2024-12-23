import { describe, expect, it } from "vitest";

import { inferAllContributors } from "./inferAllContributors.js";

const packageJson = {
	repository: {
		type: "git",
		url: "https://github.com/JoshuaKGoldberg/all-contributors-inferred",
	},
};

const readmeMd = `
<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/all-contributors-inferred" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/all-contributors-inferred?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/all-contributors-inferred"><img alt="📦 npm version" src="https://img.shields.io/npm/v/all-contributors-inferred?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

...

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/pulls?q=is%3Apr+reviewed-by%3AJoshuaKGoldberg" title="Reviewed Pull Requests">👀</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/commits?author=JoshuaKGoldberg" title="Tests">⚠️</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->
			`;

describe("inferAllContributors", () => {
	it("returns an empty object when no data is present", () => {
		const actual = inferAllContributors({ packageJson: {}, readmeMd: "" });

		expect(actual).toEqual({});
	});

	it("returns a partial object when data is only present in the packageJson", () => {
		const actual = inferAllContributors({
			packageJson,
			readmeMd: "",
		});

		expect(actual).toEqual({
			projectName: "all-contributors-inferred",
			projectOwner: "JoshuaKGoldberg",
		});
	});

	it("returns a partial object when data is only present in the readmeMd", () => {
		const actual = inferAllContributors({
			packageJson: {},
			readmeMd,
		});

		expect(actual).toEqual({
			badgeTemplate:
				'\t<a href="#contributors" target="_blank"><img alt="👪 All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg" /></a>',
			contributors: [
				{
					avatar_url: "https://avatars.githubusercontent.com/u/3335181?v=4",
					contributions: [
						"bug",
						"code",
						"maintenance",
						"review",
						"tool",
						"doc",
						"infra",
						"test",
						"ideas",
					],
					login: "JoshuaKGoldberg",
					name: "Josh Goldberg",
					profile: "http://www.joshuakgoldberg.com",
				},
			],
		});
	});

	it("returns a full object when data is present in the packageData and readmeMd", () => {
		const actual = inferAllContributors({ packageJson, readmeMd });

		expect(actual).toEqual({
			badgeTemplate:
				'\t<a href="#contributors" target="_blank"><img alt="👪 All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg" /></a>',
			contributors: [
				{
					avatar_url: "https://avatars.githubusercontent.com/u/3335181?v=4",
					contributions: [
						"bug",
						"code",
						"maintenance",
						"review",
						"tool",
						"doc",
						"infra",
						"test",
						"ideas",
					],
					login: "JoshuaKGoldberg",
					name: "Josh Goldberg",
					profile: "http://www.joshuakgoldberg.com",
				},
			],
			projectName: "all-contributors-inferred",
			projectOwner: "JoshuaKGoldberg",
		});
	});
});
