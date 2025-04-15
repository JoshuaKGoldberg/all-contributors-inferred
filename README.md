<h1 align="center">All Contributors Inferred</h1>

<p align="center">
	Infers All Contributors settings from an existing README.md table and package.json.
	💗
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/all-contributors-inferred" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/all-contributors-inferred?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/all-contributors-inferred" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/all-contributors-inferred?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

Use this package's exported `inferAllContributors` function to infer [`.all-contributorsrc` configuration options](https://allcontributors.org/docs/en/bot/configuration) from `package.json` and `README.md` contents.

```shell
npm i all-contributors-inferred
```

```ts
import { inferAllContributors } from "all-contributors-inferred";
import fs from "node:fs/promises";

inferAllContributors({
	packageJson: JSON.parse((await fs.readFile("package.json")).toString()),
	readmeMd: (await fs.readFile("README.md")).toString(),
});
/*
[
	{
		"contributors": ...,
		"projectName": ...,
		"projectOwner": ...
	}
]
*/
```

### Options

`inferAllContributors` takes in a required options object.
It may have the following required properties:

- `packageJson`: Data from a parsed `package.json` file
- `readmeMd`: Text read from the `README.md` file

### Return Type

The returned value is the same shape as you'd see in [`.all-contributorsrc` configuration options](https://allcontributors.org/docs/en/bot/configuration), but with everything optional.
See the exported `InferredAllContributors` type.

## Why?

[All Contributors](https://allcontributors.org) is one of many great pieces of tooling available for repositories.
Repositories that use many tools often end up with a dauntingly large number of configuration files -- over a dozen in many cases.

Many users find it exhausting and overwhelming to open a new repository with many config files.
Reducing the number of config files in repositories can help make developing them more approachable.

> 💡 Wish this was built into All Contributors?
> Lend a 👍 to [all-contributors/all-contributors#808 Make the .all-contributorsrc file optional (infer contributors from README.md)](https://github.com/all-contributors/all-contributors/issues/808)!

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💗

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/pulls?q=is%3Apr+reviewed-by%3AJoshuaKGoldberg" title="Reviewed Pull Requests">👀</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/JoshuaKGoldberg/all-contributors-inferred/commits?author=JoshuaKGoldberg" title="Tests">⚠️</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo engine](https://create.bingo).
