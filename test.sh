#!/bin/bash
set -a
source .env
set +a

echo "Running Fastify ATM API tests..."
echo "Using BASE_URL: $BASE_URL"
echo "Using USER_ACCOUNT: $ACCOUNT_NUM"

echo "Get balance for accunt # ($ACCOUNT_NUM)"
curl -s "$BASE_URL/accounts/$ACCOUNT_NUM/balance" | jq .

echo "Deposit 200 $ to account # ($ACCOUNT_NUM)"
curl -s -X POST "$BASE_URL/accounts/$ACCOUNT_NUM/deposit" \
  -H "Content-Type: application/json" \
  -d '{"amount": 200}' | jq .

echo "Withdraw 100 from account # ($ACCOUNT_NUM)"
curl -s -X POST "$BASE_URL/accounts/$ACCOUNT_NUM/withdraw" \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}' | jq .

echo "Checking is done!"
