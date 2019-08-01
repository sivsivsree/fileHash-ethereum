module.exports = {
    apps: [
        {
            name: "main",
            script: "./index.js",
            watch: false,
            // instances: "max",
            // exec_mode: "cluster",
            env: {
                "NODE_ENV": "testnet"
            },
            env_mainnet: {
                "NODE_ENV": "mainnet"
            }
        }
    ]
};
