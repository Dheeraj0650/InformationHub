module.exports = {
    apps: [
      {
        name: "InformationHub",
        script: "npm",
        args: "run dev",
        interpreter: "none",
        autorestart: true,
        watch: false,
        max_memory_restart: "300M",
        log_date_format: "YYYY-MM-DD HH:mm Z"
      },
    ],
  };
  