import { describe, expect, test } from "vitest";

import { parseProject } from "./parseProject.js";

describe("parseProject", () => {
	test.each([
		[{}, undefined],
		[{ repository: "" }, undefined],
		[{ repository: "unknown" }, undefined],
		[{ repository: "abc/def" }, { projectName: "def", projectOwner: "abc" }],
		[
			{ repository: "github:abc/def" },
			{ projectName: "def", projectOwner: "abc" },
		],
		[
			{ repository: "gitlab:abc/def" },
			{ projectName: "def", projectOwner: "abc", repoType: "gitlab" },
		],
		[{ repository: { type: "", url: "" } }, undefined],
		[
			{ repository: { type: "", url: "abc/def" } },
			{ projectName: "def", projectOwner: "abc" },
		],
		[
			{ repository: { type: "", url: "gitlab:abc/def" } },
			{ projectName: "def", projectOwner: "abc", repoType: "gitlab" },
		],
	])("%j", (input, expected) => {
		const actual = parseProject(input);

		expect(actual).toEqual(expected);
	});
});
