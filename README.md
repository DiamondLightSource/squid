# Turborepo Docker starter

This is from an official Docker starter Turborepo.

To start a particular application go to its readme in `/apps/[app of interest]`.

## Apps and Packages

- `b18-csv-generator`: a config generator for a beamline
- `bluegui`: a test client for blueapi
- `bluedev`: another test client for blueapi
- `gda-scan-definition`: various pages for daq spectroscopy
- `roi-demo`: demo for the UI component 'range picker'
- `TEMPLATE-nextjs-app`: a template for making NEXTjs apps
- `TEMPLATE-vite-app`: a template for making vite apps
- `TEMPLATE-express-app`: a template for making express apis for websockets and Rest
- `TEMPLATE-next-safe-action`: a test of the next safe action setup
- `visr`: a vite app to control the demos at the ViSR beamline
- `xraylib`: a [deployed page](https://xraylib.diamond.ac.uk/) to display elements and their spectroscopy parameters 


Packages:
- `@repo/eslint-config`: ESLint presets
- `@repo/jest-presets`: Jest configurations
- `@repo/logger`: Isomorphic logger (a small wrapper around console.log)
- `@repo/periodic-table`: One location for periodic tables
- `@repo/test-add`: Example package, can be used as template
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo
- `@repo/ui`: a React component library for generic components
- `@repo/vite-config`: vite config setups used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
