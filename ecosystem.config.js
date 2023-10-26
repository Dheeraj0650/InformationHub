// module.exports = {
//     apps: [
//       {
//         name: "InformationHub",
//         script: "npm",
//         args: "run dev",
//         interpreter: "none",
//         autorestart: true,
//         watch: false,
//         max_memory_restart: "300M",
//         log_date_format: "YYYY-MM-DD HH:mm Z"
//       },
//     ],
//   };

module.exports = {
  apps : [{
    name: "My App",
    script: "npm run dev",
    instances: "max",
    max_memory_restart: "256M",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    },
    exec_mode:"cluster",
    watch: true
  }]
};
  