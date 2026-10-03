# cocktail-Jostraca
A small standalone [Jostraca](https://jostraca.org/) generator that writes one TypeScript entity file per entity in a model — the same structure the [Voxgig SDK generator](https://voxgig.com/sdk) produces for the [24cocktails Recipe API](https://24cocktails.com)

This exists to demonstrate what Jostraca looks like when you write it
directly, without the Voxgig CLI in front of it. The article that goes
with this repo is on Hashnode: **[link to your article]**.

## What it does

Given a model of four entities (`Search`, `Recipe`, `ByIngredient`, `Random`),
it generates:

```text
out/cocktails/src/entity/SearchEntity.ts
out/cocktails/src/entity/RecipeEntity.ts
out/cocktails/src/entity/ByIngredientEntity.ts
out/cocktails/src/entity/RandomEntity.ts
```

```text

Each file is a minimal TypeScript class with a single method that calls
`this.client.request(...)`. The point isn't the code — it's the shape of
the generator.

## Run it

```bash
npm install
node generator.mjs
```
The generated files land in out/.

## Why .mjs
Jostraca uses ES modules. Node treats .js as CommonJS by default, so
running node generator.js throws:
```text
SyntaxError: Cannot use import statement outside a module
```
Renaming the file to .mjs (or adding "type": "module" to
package.json) fixes it. I went with .mjs to keep the change local to
the script.

## Notes
- Two things in the Jostraca API aren't obvious from the docs:
`cmp()` wraps a function so it can call Jostraca components, and
`props.ctx$` gives a component access to the model.

- The `existing: { ts: { write: true, merge: true } }` option is what
makes regeneration safe over edited output - it three-way merges
against the previous generation instead of clobbering.

- This is a toy generator. The real Voxgig generator handles types,
errors, and multiple language targets. This is just enough to show
how the pieces fit.
