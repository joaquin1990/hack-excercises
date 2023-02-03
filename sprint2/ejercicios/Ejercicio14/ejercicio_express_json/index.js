const express = require("express");
const allData = require("./db/db");

const app = express();
const PORT = 3000;
const { teams } = allData;
const uruguay = {
  id: "uy",
  name: "Uruguay",
  flag: " ",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/teams", (req, res) => {
  res.send(teams);
});

app.get("/teams/:id", (req, res) => {
  const { id } = req.params;
  for (country in teams) {
    if (id === teams[country].id) {
      res.send(teams[country]);
    }
  }
  res.send(teams);
});

app.post("/teams", (req, res) => {
  const id = req.body.id;
  teams[id] = req.body;
  res.send({ status: "Success", message: `ID: '${id}' was added!` });
});

app.delete("/teams/:id", (req, res) => {
  const { id } = req.params;

  for (country in teams) {
    if (teams[country].id === id) {
      delete teams[country];
    }
  }
  res.send({ status: "Success", message: `ID: '${id}' was deleted!` });
});

app.patch("/teams/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  let countryToModify;
  console.log(countryToModify);
  for (country in teams) {
    if (teams[country].id === id) {
      countryToModify = teams[country];
    }
  }
  console.log(countryToModify);
  res.send({ status: "Success", message: `ID: '${id}' was deleted!` });
});

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
