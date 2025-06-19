# mpeg-sdl-editor

[![version](https://img.shields.io/github/v/release/flowscripter/mpeg-sdl-editor?sort=semver)](https://github.com/flowscripter/mpeg-sdl-editor/releases)
[![build](https://img.shields.io/github/actions/workflow/status/flowscripter/mpeg-sdl-editor/release-deno-webapp.yml)](https://github.com/flowscripter/mpeg-sdl-editor/actions/workflows/release-deno-webapp.yml)
[![coverage](https://codecov.io/gh/flowscripter/mpeg-sdl-editor/branch/main/graph/badge.svg?token=EMFT2938ZF)](https://codecov.io/gh/flowscripter/mpeg-sdl-editor)
[![deno doc](https://doc.deno.land/badge.svg)](https://jsr.io/@flowscripter/mpeg-sdl-editor/doc)
[![license: MIT](https://img.shields.io/github/license/flowscripter/mpeg-sdl-editor)](https://github.com/flowscripter/mpeg-sdl-editor/blob/main/LICENSE)

> ISO/IEC 14496-34 Syntactic Description Language (MPEG SDL) web based editor.

## Hosted Instance

Go to: https://flowscripter.github.io/mpeg-sdl-editor/

## Development

Install dependencies:

`bun install`

Test:

`bun test`

Serve dev version:

`bun html/index.html`

Bundle:

`bun run build`

**NOTE**: The following tasks use Deno as it excels at these and Bun does not
currently provide such functionality:

Format:

`deno fmt`

Lint:

`deno lint src/ tests/`

## Functional Tests

Refer to [functional_tests/README.md](functional_tests/README.md)

## License

MIT © Flowscripter

