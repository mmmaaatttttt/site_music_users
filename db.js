const { Client } = require("pg");

const db = new Client({ connectionString: "postgresql:///site_music" });

db.connect();

module.exports = db;
