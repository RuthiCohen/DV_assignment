import {
  getBalance,
  depositToAccount,
  withdrawFromAccount,
} from '../services/accountService.js';

const accountsRoutes = async (fastify, opts) => {
  fastify.get('/:account_number/balance', async (req, res) => {
    try {
      const result = getBalance(req.params.account_number);
      return result;
    } catch (err) {
      return res.code(404).send({ error: err.message });
    }
  });

  fastify.post('/:account_number/deposit', {
    schema: {
      body: {
        type: 'object',
        required: ['amount'],
        properties: {
          amount: { type: 'number', minimum: 1 },
        },
      },
    },
  }, async (req, res) => {
    try {
      const result = depositToAccount(req.params.account_number, req.body.amount);
      return result;
    } catch (err) {
      return res.code(400).send({ error: err.message });
    }
  });

  fastify.post('/:account_number/withdraw', {
    schema: {
      body: {
        type: 'object',
        required: ['amount'],
        properties: {
          amount: { type: 'number', minimum: 1 },
        },
      },
    },
  }, async (req, res) => {
    try {
      const result = withdrawFromAccount(req.params.account_number, req.body.amount);
      return result;
    } catch (err) {
      return res.code(400).send({ error: err.message });
    }
  });
}

export default accountsRoutes;
