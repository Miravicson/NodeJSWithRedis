# NodeJs Starter Pack

## Features

- Flow integration
- VS Code setup
- Eslint configuration
- WesBos VS Code Setup
- Prettier Configuration
- Attempts using functional programming paradigm
- VS Code Debug Setup
- Uses mocha and chai for testing
- Uses ES6 Modules i.e `import` and `export`

## Setup Instructions

1. Pull the repository
2. Run `npm install`
3. Modify the `.gitignore` to ignore the following list of files which have otherwise been committed to ensure hassle-free setup;
   1. `.env`
   2. `.babelrc`
   3. `.vscode/*`
4. Run `flow-typed install` to get the flow types setup for your system.

## House keeping and running the projects

1. `npm start` starts up the production build of the project
2. `npm run debug` starts up the development build of the project with the `--inspect` flag passed in to nodemon. This enables debugging using vscode launch task and `attach to process` feature.
3. `npm run develop` starts checks the code for static typing errors using flow and starts a development server powered by nodemon.
4. `npm run build` compiles a development build of your project into the folder `lib/`
5. `npm run test` runs the test suites using `mocha`
