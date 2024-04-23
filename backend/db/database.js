const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/cushon.db");

db.serialize(() => {
  db.run("CREATE TABLE funds (id INTEGER PRIMARY KEY, name TEXT)");
  db.run(
    "INSERT INTO funds (name) VALUES ('Cushon Equities Fund'), ('Cushon Bonds Fund')"
  );
  db.run(
    "CREATE TABLE investments (id INTEGER PRIMARY KEY, fundId INTEGER, amount REAL)"
  );
});

const getFunds = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM funds", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const createInvestment = (fundId, amount) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO investments (fundId, amount) VALUES (?, ?)",
      [fundId, amount],
      function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID });
      }
    );
  });
};

module.exports = { getFunds, createInvestment };
