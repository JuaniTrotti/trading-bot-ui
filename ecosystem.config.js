module.exports = {
  apps: [{
    name: 'ui-bot-operations',
    script: 'npm',
    args: 'start',
    interpreter: 'none',
    watch: false,
    autorestart: true,
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
