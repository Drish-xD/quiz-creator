import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/index.ts',
    setupNodeEvents(on, config) {},
    env: {
      APP_ENV: 'testing',
      AF_DB_URL: 'http://localhost:3000',
      AF_BEARER_TOKEN: 'test',
      AF_TOPIC_ARN: 'test',
      AF_ACCESS_KEY_ID: '',
      AF_SECRET_ACCESS_KEY: '',
    },
  },
});
