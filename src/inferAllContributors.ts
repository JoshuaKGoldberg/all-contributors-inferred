import { PartialDeep } from "type-fest";
import { withoutUndefinedProperties } from "without-undefined-properties";

import { parseAllContributorCells } from "./parseAllContributorCells.js";
import { parseBadgeTemplate } from "./parseBadgeTemplate.js";
import { parseContributorFromCell } from "./parseContributorFromCell.js";
import { parseContributorsSortAlphabetically } from "./parseContributorsSortAlphabetically.js";
import { parseImageSize } from "./parseImageSize.js";
import { parseProject } from "./parseProject.js";
import { AllContributorsData, InferAllContributorsOptions } from "./types.js";

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
