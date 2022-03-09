// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  // Look for test files in the directory, relative to this configuration file
  testDir: 'src/tests/e2e/',
  use: {
    // Configure browser and context here
    headless: false
  }
}
export default config
