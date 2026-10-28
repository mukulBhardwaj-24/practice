// All settings come from environment variables, with safe defaults for local dev.
// The same code runs in dev, staging and prod; only these values change.
module.exports = {
  port: Number(process.env.PORT) || 3000,
  appEnv: process.env.APP_ENV || 'development',
  appVersion: process.env.APP_VERSION || require('../package.json').version,
  greeting: process.env.GREETING || 'Hello from my first deployable app!',
};
