import Fastify from 'fastify';
import accountsRoutes from './routes/accounts.js';
import dotenv from 'dotenv';

dotenv.config();
const fastify = Fastify({ logger: true });

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
