module.exports = {
    apps: [
      {
        name: "Frontend",
        script: "npm",
        args: "run dev",
        cwd:'/var/lib/jenkins/workspace/InformationHub',
        interpreter: "none",
        autorestart: true,
        watch: false,
        max_memory_restart: "300M",
        log_date_format: "YYYY-MM-DD HH:mm Z",
        env_production: {
          "PORT": 3000,
          "NODE_ENV": "production",
        }
      },
      {
        name: "Backend",
        script: "npm",
        args: "run server",
        cwd:'/var/lib/jenkins/workspace/InformationHub',
        interpreter: "none",
        autorestart: true,
        watch: false,
        max_memory_restart: "300M",
        log_date_format: "YYYY-MM-DD HH:mm Z",
        env_production: {
          "PORT": 9000,
          "NODE_ENV": "production",
        }
      }
    ],
  };

// module.exports = {
//   apps : [{
//     name: "frontend",
//     script: "npm run client",
//     instances: "max",
//     max_memory_restart: "256M",
//     env: {
//       NODE_ENV: "development"
//     },
//     env_production: {
//       NODE_ENV: "production"
//     },
//     exec_mode:"cluster",
//     watch: true
//   },
//   {
//     name: "backend",
//     script: "npm run start",
//     instances: "max",
//     max_memory_restart: "256M",
//     env: {
//       NODE_ENV: "development"
//     },
//     env_production: {
//       NODE_ENV: "production"
//     },
//     exec_mode:"cluster",
//     watch: true
//   }]
// };
  