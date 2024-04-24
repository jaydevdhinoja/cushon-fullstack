const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/cushon.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the cushon.db database.");
});

db.serialize(() => {
  // only create table if it does not exist
  db.run(`CREATE TABLE IF NOT EXISTS funds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

  // only create table if it does not exist
  db.run(`CREATE TABLE IF NOT EXISTS investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fundId INTEGER,
    amount REAL,
    FOREIGN KEY (fundId) REFERENCES funds (id)
  )`);

  // add default funds only if the funds table is empty
  db.get("SELECT COUNT(*) AS count FROM funds", (err, row) => {
    if (row.count === 0) {
      db.run(
        "INSERT INTO funds (name) VALUES ('Cushon Equities Fund'), ('Cushon Bonds Fund')"
      );
    }
  });
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

const getInvestments = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT investments.id, investments.amount, funds.name AS fundName from investments JOIN funds ON investments.fundId = funds.id`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

module.exports = { getFunds, createInvestment, getInvestments };
