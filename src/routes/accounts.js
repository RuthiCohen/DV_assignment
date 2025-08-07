export default async function (fastify, opts) {
  const accounts = {
    '12345': 1000,
    '67890': 500,
  };

  fastify.get('/:account_number/balance', {
    schema: {
      params: {
        type: 'object',
        required: ['account_number'],
        properties: {
          account_number: { type: 'string', pattern: '^[0-9]+$' }
        }
      }
    }
  }, async (req, res) => {
    const { account_number } = req.params;
    const balance = accounts[account_number];
  
    if (balance === undefined) {
      return res.code(404).send({ error: 'Account not found' });
    }
  
    return { account_number, balance };
  });
  
  fastify.post('/:account_number/deposit', {
    schema: {
      body: {
        type: 'object',
        required: ['amount'],
        properties: {
          amount: { type: 'number', minimum: 0.01 }
        }
      }
    }
  }, async (req, res) => {
    const { account_number } = req.params;
    const { amount } = req.body;
  
    if (!(account_number in accounts)) {
      return res.code(404).send({ error: 'Account not found' });
    }
  
    accounts[account_number] += amount;
    return { account_number, new_balance: accounts[account_number] };
  });

  fastify.post('/:account_number/withdraw', {
    schema: {
      body: {
        type: 'object',
        required: ['amount'],
        properties: {
          amount: { type: 'number'}
        }
      }
    }
  }, async (req, res) => {
    const { account_number } = req.params;
    const { amount } = req.body;
  
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
