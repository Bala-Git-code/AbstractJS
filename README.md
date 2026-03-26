# 🚀 AbstractJS — AI Workflow Platform

AbstractJS is a **production-ready AI workflow platform** that allows users to design, execute, and manage programmable workflows using a node-based system.

It enables dynamic data flow, AI integration, and modular execution — built with scalability and clean architecture in mind.

---

# 🧠 Features

* 🧩 Visual workflow builder (node-based)
* 🔗 Dynamic data flow between nodes
* 🤖 AI integration (OpenAI)
* ⚙️ Workflow execution engine (DAG-based)
* 📊 Execution logs & results tracking
* 💾 MongoDB persistence
* 🧱 Modular backend architecture
* ⚡ Scalable design (queue-ready)

---

# 🏗️ Tech Stack

## Frontend

* React (Vite)
* React Flow
* Axios

## Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

## AI

* OpenAI API (`gpt-4o-mini`)

---

# 📁 Project Structure

```
project-root/
│
├── client/                 # Frontend (React)
├── server/                 # Backend (Node.js)
├── shared/                 # Shared utilities/types
├── .env.example
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```
git clone <your-repo-url>
cd abstractjs
```

---

## 2️⃣ Setup Backend

```
cd server
npm install
```

Create `.env` file and add variables.

Run backend:

```
npm run dev
```

---

## 3️⃣ Setup Frontend

```
cd client
npm install
```

Create `.env` file.

Run frontend:

```
npm run dev
```

---

# 🔄 Workflow Execution

AbstractJS processes workflows as **Directed Acyclic Graphs (DAGs)**:

### Node Types

* **Input Node** → Accepts user input
* **Transform Node** → Modifies data
* **AI Node** → Calls OpenAI API
* **Output Node** → Returns result

---

# 🧠 Execution Flow

1. Parse nodes and edges
2. Validate graph (no cycles)
3. Execute nodes in order
4. Pass data between nodes
5. Return final output

---

# 🔐 Security

* Environment-based configuration
* API keys stored securely in backend
* Input validation
* Error handling middleware

---

# ⚡ Future Improvements

* Queue system (BullMQ + Redis)
* Real-time execution updates (WebSockets)
* Multi-user authentication
* Workflow versioning
* Deployment pipelines
