import * as dom from "domhandler";
import { ElementType } from "htmlparser2";

export type ElementOfName<Name extends string> = dom.Element & { name: Name };

export function isNodeWithChildren(
	node: dom.Node,
): node is dom.NodeWithChildren {
	return "children" in node;
}

export function isTagOfName<Name extends string>(
	node: dom.ChildNode,
	name: Name,
): node is ElementOfName<Name> {
	return node.type === ElementType.Tag && node.name === name;
}

export function toTagOfNameWithChildren<Name extends string>(name: Name) {
	return (node: dom.ChildNode) =>
		isNodeWithChildren(node) && isTagOfName(node, name);
}
