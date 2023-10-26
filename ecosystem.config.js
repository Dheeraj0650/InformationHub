// module.exports = {
//     apps: [
//       {
//         name: "InformationHub",
//         script: "npm",
//         args: "run dev"
//       },
//     ],
//   };
  
  module.exports = {
    apps : [{
      name        : "demo-app",
      script      : "npm start --prefix client",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
         "NODE_ENV": "production"
      }
    },{
      name       : "demo-cluster-app",
      script     : "node app.js",
      instances  : 2,
      exec_mode  : "cluster"
    }]
  }