import type { PartialDeep } from "type-fest";

import { withoutUndefinedProperties } from "without-undefined-properties";

import { parseAllContributorCells } from "./parseAllContributorCells.ts";
import { parseBadgeTemplate } from "./parseBadgeTemplate.ts";
import { parseContributorFromCell } from "./parseContributorFromCell.ts";
import { parseContributorsSortAlphabetically } from "./parseContributorsSortAlphabetically.ts";
import { parseImageSize } from "./parseImageSize.ts";
import { parseProject } from "./parseProject.ts";
import { AllContributorsData, InferAllContributorsOptions } from "./types.ts";

export type InferredAllContributors = PartialDeep<
	AllContributorsData,
	{
		recurseIntoArrays: true;
	}
>;

export function inferAllContributors({
	packageJson,
	readmeMd,
}: InferAllContributorsOptions): InferredAllContributors {
	const allContributorCells = parseAllContributorCells(readmeMd);
	const contributors = allContributorCells.map(parseContributorFromCell);

	return withoutUndefinedProperties({
		...parseProject(packageJson),
		badgeTemplate: parseBadgeTemplate(contributors.length, readmeMd),
		contributors: contributors.length ? contributors : undefined,
		contributorsSortAlphabetically:
			parseContributorsSortAlphabetically(contributors),
		imageSize: parseImageSize(allContributorCells),
	});
}
