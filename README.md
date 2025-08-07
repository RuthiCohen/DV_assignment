# DV_assignment — Fastify ATM API

A simple backend-only ATM system built using **Fastify**.  
The application uses **in-memory storage** (no database) and supports balance inquiries, deposits, and withdrawals via RESTful API.

---

## Tech Stack

- **Node.js** with Fastify — lightweight, fast backend framework
- **dotenv** — manage environment variables
- **Shell script** (`test.sh`) — for automated curl-based testing
- **jq** — to format JSON output from test script

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/RuthiCohen/DV_assignment.git
cd DV_assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Running the server
```bash
npm start
```

### 4. Testing the API
#### Step 1: Make the test file executable
```bash
chmod +x test.sh
```

#### Step 2: Install jq
- For MacOS: 
```bash
brew install jq
```

- For Ubuntu: 
```bash
sudo apt install jq
```
#### Step 3: Run the test file
```bash
npm run test
```

### Author
Ruthie Cohen :) 




