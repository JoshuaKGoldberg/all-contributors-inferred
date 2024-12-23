import { isTagOfName } from "./dom.js";
import { ContributorCells } from "./parseAllContributorCells.js";

const defaultImageSize = 100;

export function parseImageSize(cells: Partial<ContributorCells>[]) {
	for (const cell of cells) {
		const imageSize = Number(
			cell.avatar?.children
				.find((child) => isTagOfName(child, "img"))
				?.attribs.src.match(/\??s=(\d+)$/)?.[1],
		);

		if (imageSize && imageSize !== defaultImageSize) {
			return imageSize;
		}
	}

	return undefined;
}
