# DV_assignment — Fastify ATM API

A simple backend-only ATM system built using **Fastify**.  
The application uses **in memory storage** (no database) and supports balance inquiries, deposits, and withdrawals via RESTful API.

---

### Approach

I chose Fastify to build a lightweight, modular backend API. The app uses in memory storage and includes three main endpoints: get balance, deposit, and withdraw.

I modularized the code by separating routes, added validation using Fastify's schema, and included a curl-based test script with `.env` support to make testing easy and consistent.

#### Design Decisions:

- Used Fastify instead of Express for better performance and modern patterns.
- Added schema validation to automatically reject invalid requests (e.g., wrong types, negative amounts).
- Created `test.sh` with `jq` formatting for simple API testing via terminal.
- Stored config like `BASE_URL` and `ACCOUNT_NUM` in `.env` for clean control.

#### Challenges:

- Ensuring consistent JSON structure in both success and error responses
- Validating numeric input and handling edge cases

But I must admit I enjoied it :)

---

#### Git Repository:

All code and documentation is available at:
https://github.com/RuthiCohen/DV_assignment

#### Live API (deployed on Render):

https://dv-assignment-api.onrender.com

---

### Project Structure

- `src/index.js` - Main Fastify server
- `src/routes/home.js` - Root route (`/`) with welcome message and route list
- `src/routes/accounts.js` - Handles balance, deposit, and withdraw routes
- `src/services/accountService.js` - In memory data logic for accounts
- `test.sh` - Bash script that tests all endpoints

----

##### Check the API:

- In **Development** I ran all tests using a custom Bash script:
```bash
npm test
```

- In **Production** I manually verified the API with curl (example account number: 12345):

    - Get account balance:
    ```bash
    curl http://localhost:3000/accounts/12345/balance
    ```
    - Deposit money:
    ```bash
    curl -X POST http://localhost:3000/accounts/12345/deposit \
    -H "Content-Type: application/json" \
    -d '{"amount": 200}'
    ```
    - Withdraw money:
    ```bash
    curl -X POST http://localhost:3000/accounts/12345/withdraw \
    -H "Content-Type: application/json" \
    -d '{"amount": 100}'
    ```

---

## Tech Stack

- **Node.js** with Fastify lightweight, fast backend framework
- **dotenv** manage environment variables
- **Shell script** (`test.sh`) for automated curl-based testing
- **jq** to format JSON output from test script

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

Create `.env` file in project root:

```bash
touch .env
```

And then enter this to .env content:

```bash
ENV=dev
PORT=3000
ACCOUNT_NUM=12345
BASE_URL_DEV=http://localhost:3000
BASE_URL_PROD=https://dv-assignment-api.onrender.com/
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

The script will:

- Check balance
- Deposit money
- Withdraw money
- Show error handling (invalid/negative amounts, unknown accounts)

### Author

Ruthie Cohen :)
