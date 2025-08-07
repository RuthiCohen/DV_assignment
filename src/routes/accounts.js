import {
  getBalance,
  depositToAccount,
  withdrawFromAccount,
} from "../services/accountService.js";

const accountsRoutes = async (fastify, opts) => {
  fastify.get('/', async (req, res) => {
    return {
      message: 'Hi there! welcome to the Fastify ATM API :)',
      available_routes: {
        'GET /accounts/:account_number/balance': 'Check account balance',
        'POST /accounts/:account_number/deposit': 'Deposit money',
        'POST /accounts/:account_number/withdraw': 'Withdraw money'
      }
    };
  });

  fastify.get("/:account_number/balance", async (req, res) => {
    try {
      const result = getBalance(req.params.account_number);
      return result;
    } catch (err) {
      return res.code(404).send({ error: err.message });
    }
  });

  fastify.post(
    "/:account_number/deposit",
    {
      schema: {
        body: {
          type: "object",
          required: ["amount"],
          properties: {
            amount: { type: "number", minimum: 1 },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const result = depositToAccount(
          req.params.account_number,
          req.body.amount,
        );
        return result;
      } catch (err) {
        return res.code(400).send({ error: err.message });
      }
    },
  );

  fastify.post(
    "/:account_number/withdraw",
    {
      schema: {
        body: {
          type: "object",
          required: ["amount"],
          properties: {
            amount: { type: "number", minimum: 1 },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const result = withdrawFromAccount(
          req.params.account_number,
          req.body.amount,
        );
        return result;
      } catch (err) {
        return res.code(400).send({ error: err.message });
      }
    },
  );
};

export default accountsRoutes;
