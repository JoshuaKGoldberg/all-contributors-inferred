import { PackageJson } from "type-fest";

export interface InferAllContributorsOptions {
	overrides?: Partial<AllContributorsData>;
	packageJson: PackageJson.PackageJsonStandard;
	readmeMd: string;
}

/** @see https://allcontributors.org/docs/en/bot/configuration */
export interface AllContributorsData {
	/**
	 * Mandatory, name of the project.
	 * @example "all-contributors-cli"
	 */
	projectName: string;

	/**
	 * Mandatory, name of the user the project is hosted by.
	 * @example "tenshiAMD"
	 */
	projectOwner: string;

	/**
	 * Type of repository.
	 * @default "github"`
	 */
	repoType: RepoType;

	/**
	 * Points to the repository hostname. Change it if you use a self-hosted repository.
	 * @default "https://github.com" if `repoType` is `github`, and "https://gitlab.com" if `repoType` is `gitlab`.
	 */
	repoHost?: string;

	/**
	 * Array of files to update.
	 * @default ['README.md']
	 */
	files?: string[];

	/**
	 * Size (in px) of the user's avatar.
	 * @default 100
	 */
	imageSize?: number;

	/**
	 * Auto-commit badge when adding contributors.
	 * @default false
	 */
	commit?: boolean;

	/**
	 * @default "angular"
	 */
	commitConvention?: CommitConvention;

	/**
	 * Maximum number of columns for the contributors table.
	 * @default 7
	 */
	contributorsPerLine?: number;

	/**
	 * Whether to sort alphabetically instead of in order of addition.
	 * @default false
	 */
	contributorsSortAlphabetically?: boolean;

	/**
	 * Define your own lodash template to generate the badge.
	 */
	badgeTemplate?: string;

	/**
	 * Define your own lodash template to generate contributors.
	 */
	contributorTemplate?: string;

	/**
	 * Define your own lodash template to wrap the list of contributors.
	 */
	wrapperTemplate?: string;

	/**
	 * Specify custom symbols or link templates for contribution types.
	 * Can override the documented types.
	 */
	types?: Record<string, CustomContributionType>;

	/**
	 * Adds a footer with link to usage.
	 * @default true
	 */
	linkToUsage?: boolean;

	/**
	 * Makes CI ignore the commit.
	 * @default true
	 */
	skipCi?: boolean;

	/**
	 * List of contributors for this project, this is updated by `@all-contributors add`.
	 */
	contributors?: Contributor[];
}

export type CommitConvention =
	| "angular"
	| "atom"
	| "ember"
	| "eslint"
	| "gitmoji"
	| "jshint"
	| "none";

export interface Contributor {
	avatar_url: string;
	contributions: string[];
	login: string;
	name: string;
	profile: string;
}

export interface CustomContributionType {
	description: string;
	link: string;
	symbol: string;
}

export type RepoType = "github" | "gitlab";
