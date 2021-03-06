module.exports = {
  apps : [{
    name: 'API-new-' + process.argv.env,
    script: 'src/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_MAIN_CLIENT: 'server-development',
      SWAGGER_HOST:'web.robotagro.com',
      SWAGGER_BASE_PATH: '/api/development/'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3002,
      DB_MAIN_CLIENT:'server-production',
      SWAGGER_HOST:'web.robotagro.com',
      SWAGGER_BASE_PATH: '/api/latest/'
    }
  }],
  deploy : {
    production : {
      key  : '~/.ssh/robotagro',
      user : 'root',
      host : '66.97.36.28',
      port: "5822",
      ref  : 'origin/master',
      repo : 'git@gitlab.com:intelliDrone/api_new.git',
      path : '/root/NodeApps/api-new-production',
      ssh_options : ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      'post-deploy' : './scripts/init_service.sh p && npm install && pm2 reload ecosystem.config.js --env production'
    },
    development : {
      key  : '~/.ssh/robotagro',
      user : 'root',
      host : '66.97.36.28',
      port: "5822",
      ref  : 'origin/develop',
      repo : 'git@gitlab.com:intelliDrone/api_new.git',
      path : '/root/NodeApps/api-new-develop',
      ssh_options : ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      'post-deploy' : './scripts/init_service.sh d && npm install && pm2 reload ecosystem.config.js --env development'
    }
  }
};
