module.exports = Object.freeze({
  database: {
    url:
      process.env.MONGO_DB ||
      // "mongodb://geophrey:thugs123legitcluster.v2vwa.mongodb.net/cafe?ssl=false&retryWrites=true&w=majority",
      // "mongodb://localhost/cafe",
      // "mongodb://172.17.0.2:27017/kf",
			"mongodb://localhost:27017/kf",

    connectRetry: 5,
  },
  SECRET_KEY: "dsW7UoHqhl1FnQJmXm75NgpGb8243z7s",
  DEFAULT_ADMIN: {
    USERNAME: "admin",
    PASSWORD: "admin",
  },
  // SECRET_KEY: "yMTcfpmBgdliIANsYNxoiyl4jOMTV07g",
});
