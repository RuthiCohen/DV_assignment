const fastify = require('fastify')({ logger: true });
const accountsRoutes = require('./routes/accounts');

fastify.register(accountsRoutes, { prefix: '/accounts' });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    fastify.log.info('Server is up and running');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
