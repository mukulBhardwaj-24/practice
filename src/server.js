const app = require('./app');
const config = require('./config');

const server = app.listen(config.port, () => {
  console.log(`[${config.appEnv}] v${config.appVersion} listening on http://localhost:${config.port}`);
});

// Graceful shutdown: when a platform stops your app (deploys, scaling down),
// it sends SIGTERM first. Finish in-flight requests, then exit.
function shutdown(signal) {
  console.log(`${signal} received, shutting down...`);
  server.close(() => {
    console.log('Closed all connections. Bye!');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
