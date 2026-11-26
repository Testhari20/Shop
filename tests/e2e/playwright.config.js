// Lets Playwright find the agent's browser tests (*.e2e.js); jest and vitest ignore them.
// Chromium's own sandbox is switched off because the sandbox container runs as root.
module.exports = {
  testDir: '.',
  testMatch: '*.e2e.js',
  use: { launchOptions: { args: ['--no-sandbox'] } },
};
