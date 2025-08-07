const fp = require('fastify-plugin');

const accounts = {
  '12345': 1000.0,
  '67890': 500.0,
};

module.exports = fp(async (fastify, opts) => {
  // Get balance method
  fastify.get('/:account_number/balance', async (req, res) => {
    const { account_number } = req.params;
    const balance = accounts[account_number];

    if (balance === undefined) {
      return res.code(404).send({ error: 'Account not found' });
    }

    return { account_number, balance };
  });

  // Withdraw method
  fastify.post('/:account_number/withdraw', async (req, res) => {
    const { account_number } = req.params;
    const { amount } = req.body;

    if (!isValidAmount(amount)) {
      return res.code(400).send({ error: 'Invalid amount' });
    }

    if (!(account_number in accounts)) {
      return res.code(404).send({ error: 'Account not found' });
    }

    if (accounts[account_number] < amount) {
      return res.code(400).send({ error: 'Insufficient funds' });
    }

    accounts[account_number] -= amount;
    return { account_number, new_balance: accounts[account_number] };
  });

  // Deposit method
  fastify.post('/:account_number/deposit', async (req, res) => {
    const { account_number } = req.params;
    const { amount } = req.body;

    if (!isValidAmount(amount)) {
      return res.code(400).send({ error: 'Invalid amount' });
    }

    if (!(account_number in accounts)) {
      return res.code(404).send({ error: 'Account not found' });
    }

    accounts[account_number] += amount;
    return { account_number, new_balance: accounts[account_number] };
  });

  // Utility
  function isValidAmount(amount) {
    return typeof amount === 'number' && amount > 0;
  }
});
