const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/database");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// get available funds
app.get("/funds", (req, res) => {
  db.getFunds().then((funds) => res.json(funds));
});

// save investment
app.post("/invest", (req, res) => {
  const { fundId, amount } = req.body;
  db.createInvestment(fundId, amount).then((result) =>
    res.status(201).send(result)
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
