#!/bin/bash
set -a
source .env
set +a

echo "Running Fastify ATM API tests..."
# Select base URL based on ENV
if [ "$ENV" = "prod" ]; then
  BASE_URL=$BASE_URL_PROD
else
  BASE_URL=$BASE_URL_DEV
fi

echo "DEBUG: ENV=$ENV | ACCOUNT_NUM=$ACCOUNT_NUM | BASE_URL=$BASE_URL"

echo "Environment: $ENV"
echo "Running tests on: $BASE_URL"

echo "Get balance for accunt # ($ACCOUNT_NUM)"
curl -s "$BASE_URL/accounts/$ACCOUNT_NUM/balance" | jq .

echo "Deposit 200$ to account # ($ACCOUNT_NUM)"
curl -s -X POST "$BASE_URL/accounts/$ACCOUNT_NUM/deposit" \
  -H "Content-Type: application/json" \
  -d '{"amount": 200}' | jq .

echo "Withdraw 100 from account # ($ACCOUNT_NUM)"
curl -s -X POST "$BASE_URL/accounts/$ACCOUNT_NUM/withdraw" \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}' | jq .

# Trying invalid (non existent) account
NON_EXISTING_ACCOUNT=0000
echo "Attempt to access balance of non existent account #$NON_EXISTING_ACCOUNT"
curl -s "$BASE_URL/accounts/$NON_EXISTING_ACCOUNT/balance" | jq .
echo

echo "Checking is done!"
