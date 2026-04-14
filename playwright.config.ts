import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'src/steps/**/*.ts',
});

export default defineConfig({
  testDir, 
  timeout: 15 * 1000, 
  reporter: 'html', 
  
  use: {
    headless: !!process.env.CI, 
    
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      args: ['--window-size=1920,1080', '--window-position=0,0']
    },
    trace: 'retain-on-failure', 
    screenshot: 'only-on-failure',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
});