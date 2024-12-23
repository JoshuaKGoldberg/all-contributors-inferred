import { parseDocument } from "htmlparser2";

import { ElementOfName, toTagOfNameWithChildren } from "./dom.js";

export interface ContributorCells {
	avatar?: ElementOfName<"a">;
	contributions?: ElementOfName<"a">[];
}

export function parseAllContributorCells(readmeMd: string) {
	const raw =
		/<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->(?:\s*<!--[^\n]*-->)*(.+)<!--/s
			.exec(readmeMd)?.[1]
			.trim();
	if (!raw) {
		return [];
	}

	const document = parseDocument(raw);
	const contributorTable = document.children.find(
		toTagOfNameWithChildren("table"),
	);
	if (!contributorTable) {
		return [];
	}

	const body =
		contributorTable.children.find(toTagOfNameWithChildren("tbody")) ??
		contributorTable;

	return body.children
		.filter(toTagOfNameWithChildren("tr"))
		.flatMap((row) => row.children.filter(toTagOfNameWithChildren("td")))
		.map((child) => {
			const [avatar, ...contributions] = child.children.filter(
				toTagOfNameWithChildren("a"),
			);

			return { avatar, contributions };
		});
}
