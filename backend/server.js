const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// get available funds
app.get("/funds", (req, res) => {
  db.getFunds()
    .then((funds) => res.json(funds))
    .catch((error) => {
      console.error("Failed to fetch the funds", error);
      res.status(500).send("Failed to fetch the funds");
    });
});

// get investments
app.get("/investments", (req, res) => {
  db.getInvestments()
    .then((investments) => {
      return res.json(investments);
    })
    .catch((error) => {
      console.error("Failed to fetch the investments", error);
      res.status(500).send("Failed to fetch the investments");
    });
});

// save investment
app.post("/invest", (req, res) => {
  const { fundId, amount } = req.body;
  db.createInvestment(fundId, amount)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      console.error("Failed to save investment", error);
      res.status(500).send("Failed to save investment");
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
