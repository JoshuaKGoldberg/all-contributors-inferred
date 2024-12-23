// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { withoutUndefinedProperties } from "without-undefined-properties";

import { isTagOfName } from "./dom.js";
import { ContributorCells } from "./parseAllContributorCells.js";
import { Contributor } from "./types.js";

/**
 * @see https://allcontributors.org/docs/en/emoji-key
 */
const titlesToTypes: Record<string, string> = {
	Accessibility: "a11y",
	"Answering Questions": "question",
	Blogposts: "blog",
	"Bug reports": "bug",
	"Business Development": "business",
	Documentation: "doc",
	"Event Organizers": "eventOrganizing",
	"Financial Support": "financial",
	"Funding/Grant Finders": "fundingFinding",
	"Ideas & Planning": "ideas",
	"Ideas, Planning, & Feedback": "ideas",
	"Infrastructure (Hosting, Build-Tools, etc)": "infra",
	"Plugin/utility libraries": "plugin",
	"Project Management": "projectManagement",
	"Reviewed Pull Requests": "review",
	Talks: "talk",
	Tests: "test",
	Tools: "tool",
	Tutorials: "tutorial",
	"User Testing": "userTesting",
};

export function parseContributorFromCell(
	cells: ContributorCells,
): Partial<Contributor> {
	const img = cells.avatar?.children.find((child) => isTagOfName(child, "img"));

	const contributions = cells.contributions
		?.map(
			(node) =>
				titlesToTypes[node.attribs.title] ?? node.attribs.title.toLowerCase(),
		)
		.filter(Boolean);

	return withoutUndefinedProperties({
		avatar_url: img?.attribs.src.replace(/\??s=\d+$/, "") || undefined,
		contributions: contributions?.length ? contributions : undefined,
		login:
			cells.contributions?.at(0)?.attribs.href.split(/%3A|=/).at(-1) ||
			undefined,
		name: img?.attribs.alt,
		profile: cells.avatar?.attribs.href,
	});
}
