import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost:3000',

    headless: false, // set true for CI

    viewport: { width: 1280, height: 720 },

    actionTimeout: 10000,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  webServer: {
    command: 'docker run -d -p 3000:3000 bkimminich/juice-shop',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});