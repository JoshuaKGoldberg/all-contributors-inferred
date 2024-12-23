export function parseBadgeTemplate(count: number, readmeMd: string) {
	return /<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->(.+)<!-- ALL-CONTRIBUTORS-BADGE:END -->/s
		.exec(readmeMd)?.[1]
		?.replaceAll(/\d+/g, (value) =>
			value === count.toString() ? "<%= contributors.length %>" : value,
		)
		.trimEnd()
		.replaceAll(/^\n+/g, "")
		.replaceAll("	", "\t");
}
