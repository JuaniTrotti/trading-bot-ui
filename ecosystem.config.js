module.exports = {
  apps: [{
    name: 'ui-bot-operations',
    script: 'npm',
    args: 'run dev',
    interpreter: 'none',
    watch: false,
    autorestart: true,
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
}
