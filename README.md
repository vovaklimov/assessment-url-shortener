# URL Shortener

## Getting Started

### Prerequisites

1. [Node](https://nodejs.org/en/download/). Supported Node version is listed in the [.tool-versions](./.tool-versions) file.
2. [pnpm](https://pnpm.io/installation). Use [corepack](https://nodejs.org/api/corepack.html) to automatically install pnpm for this project. It will install the correct version of pnpm for you based on `packageManager` field in the [`package.json`](./package.json) file.

### Starting development

**Install the dependencies**

```sh
pnpm install
```

**Create a `.env` file in the project root**

```sh
touch .env
```

Use `.env.example` as a template for the `.env` file.

**Start app in the development mode**

```sh
pnpm dev
```

## Some Available scripts

A brief overview of each script defined in the `package.json`.

- **`pnpm dev`** - Start app in development mode with hot reloading and typechecking in parallel

- **`pnpm build`** - Create a production bundle

- **`pnpm start`** - Start the production bundle

- **`pnpm lint`** - Run all linting scripts (will fail if any linting errors are found)

- **`pnpm lint:fix`** - Run all lint scripts and try to automatically fix issues

- **`pnpm test`** - Run all test suites

- **`pnpm test:coverate`** - Run all test suites and generate coverage report
