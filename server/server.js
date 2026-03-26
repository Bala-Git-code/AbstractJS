const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const env = require('./config/env');
const { connectDatabase } = require('./config/db');
const workflowRoutes = require('./routes/workflowRoutes');
const executionRoutes = require('./routes/executionRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: false,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/workflows', workflowRoutes);
app.use('/execution', executionRoutes);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`AbstractJS server listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

module.exports = app;
