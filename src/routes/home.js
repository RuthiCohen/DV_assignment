const homeRoute = async (fastify, opts) => {
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
};
  
  export default homeRoute;
  