# AbstractJS

AbstractJS is a production-oriented AI workflow platform with a React/Vite client, an Express/MongoDB server, and a workflow execution engine built around directed acyclic graphs.

## Final Structure

```text
project-root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── engine/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── package.json
│   └── server.js
├── shared/
│   └── constants.js
├── .env.example
└── README.md
```

## Core Capabilities

- Create workflows visually with `INPUT`, `TRANSFORM`, `AI`, and `OUTPUT` nodes
- Connect nodes into a DAG using React Flow
- Save workflows to MongoDB
- Execute workflows through a decoupled workflow engine
- Call OpenAI dynamically from AI nodes
- Inspect execution status, logs, runtime, and structured results
- Extend execution later with a queue system without rewriting the engine

## Backend Design

- `server/models/Workflow.js`
  Stores workflow metadata, nodes, and edges.
- `server/models/Execution.js`
  Stores execution state, logs, result payload, and timing.
- `server/engine/workflowEngine.js`
  Validates DAG order, runs nodes asynchronously, isolates node failures, and captures logs.
- `server/services/aiService.js`
  Wraps OpenAI calls with retries and structured JSON responses.
- `server/routes/*`
  Exposes REST APIs for workflow CRUD and execution runs.

### API Endpoints

- `POST /workflows`
- `GET /workflows`
- `GET /workflows/:id`
- `PUT /workflows/:id`
- `DELETE /workflows/:id`
- `POST /execution/run`
- `GET /execution/:id`
- `GET /health`

## Frontend Design

- Dashboard for workflow discovery and deletion
- Builder for graph editing, property inspection, save, and run
- Execution viewer for status, logs, and final output
- Dedicated API service layer
- Zustand-backed builder state

## Environment Variables

Copy `.env.example` to `.env` and set:

```bash
PORT=4000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/abstractjs
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
VITE_API_BASE_URL=http://localhost:4000
```

## Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Start MongoDB

Run a local MongoDB instance or update `MONGO_URI` to point at your managed cluster.

### 3. Start the server

```bash
cd server
npm run dev
```

### 4. Start the client

```bash
cd client
npm run dev
```

### 5. Open the platform

Visit `http://localhost:5173`.

## Workflow Execution Semantics

- Workflows are validated as DAGs before save and before execution
- Nodes are executed in topological order
- `INPUT` nodes read from runtime input payloads
- `TRANSFORM` nodes reshape upstream data through templates or merge mode
- `AI` nodes hydrate prompts from upstream results and call OpenAI
- `OUTPUT` nodes package final results for the execution record

## Verification Completed

- `server`: `npm install`
- `server`: recursive `node --check` on source files
- `client`: `npm install`
- `client`: `npm run build`

## Notes

- The server requires valid `MONGO_URI` and `OPENAI_API_KEY` values for full runtime behavior.
- AI workflows will fail gracefully at execution time if the OpenAI API key is missing or invalid.
