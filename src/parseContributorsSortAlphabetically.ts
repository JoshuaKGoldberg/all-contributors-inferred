import { Contributor } from "./types.js";

export function parseContributorsSortAlphabetically(
	contributors: Partial<Contributor>[],
) {
	const logins = contributors
		.map((contributor) => contributor.login)
		.filter((login): login is string => !!login);

	return (
		(logins.length > 1 &&
			logins.every(
				(login, i) => i === 0 || login.localeCompare(logins[i - 1]) > 0,
			)) ||
		undefined
	);
}
