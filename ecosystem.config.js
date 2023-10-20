module.exports = {
    apps: [
      {
        name: "InformationHub",
        script: "npm",
        args: "run dev",
        cwd: "/Users/kottedheeru/Documents/InformationHub",
        interpreter: "none",
        autorestart: true,
        watch: false,
        max_memory_restart: "300M",
        log_date_format: "YYYY-MM-DD HH:mm Z",
      },
    ],
  };
  