# Getting Started

## Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- Git, if you are cloning the repository

You can verify your installations with:

```bash
node --version
npm --version
```

## Installation

Clone the repository and move into the project directory:

```bash
git clone <repository-url>
cd <repository-folder>
```

Install the project dependencies:

```bash
npm install
```

## Start the Application

Run the client and server together with:

```bash
npm start
```

This starts:

- The React client using `react-scripts start`
- The Node.js server using `node server.js`

The client will usually be available at:

```text
http://localhost:3000
```

## Available Commands

### Start the client and server

```bash
npm start
```

### Start only the React client

```bash
npm run client
```

### Start only the Node.js server

```bash
npm run server
```

### Create a production build

```bash
npm run build
```

The production files will be generated in the `build` directory.

### Run tests

```bash
npm test
```

### Eject the Create React App configuration

```bash
npm run eject
```

> `npm run eject` is irreversible. Use it only if you need full control over the underlying build configuration.

## Typical Workflow

```bash
npm install
npm start
```

Then open the client application in your browser at:

```text
http://localhost:3000
```