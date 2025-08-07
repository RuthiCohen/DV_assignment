export default async function (fastify, opts) {
  const accounts = {
    '12345': 1000,
    '67890': 500,
  };

  fastify.get('/:account_number/balance', async (req, res) => {
    const { account_number } = req.params;
    const balance = accounts[account_number];
    if (balance === undefined) {
      return res.code(404).send({ error: 'Account not found' });
    }
    return { account_number, balance };
  });

  fastify.post('/:account_number/deposit', async (req, res) => {
    const { account_number } = req.params;
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      return res.code(400).send({ error: 'Invalid amount' });
    }
    if (!(account_number in accounts)) {
      return res.code(404).send({ error: 'Account not found' });
    }
    accounts[account_number] += amount;
    return { account_number, new_balance: accounts[account_number] };
  });

  fastify.post('/:account_number/withdraw', async (req, res) => {
    const { account_number } = req.params;
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
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
};
