import hostedGitInfo from "hosted-git-info";
import { PackageJson } from "type-fest";
import { withoutUndefinedProperties } from "without-undefined-properties";

import { AllContributorsData } from "./types.js";

export function parseProject(
	packageJson: PackageJson.PackageJsonStandard,
): Partial<AllContributorsData> | undefined {
	switch (typeof packageJson.repository) {
		case "object": {
			return parseFromRepositoryLocator(packageJson.repository.url);
		}

		case "string": {
			return parseFromRepositoryLocator(packageJson.repository);
		}

		case "undefined":
			return undefined;
	}
}

/**
 * @see https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository
 */
function parseFromRepositoryLocator(locator: string) {
	const info = hostedGitInfo.fromUrl(locator);

	return info
		? withoutUndefinedProperties({
				projectName: info.project,
				projectOwner: info.user,
				repoType: info.type === "gitlab" ? info.type : undefined,
			})
		: undefined;
}
