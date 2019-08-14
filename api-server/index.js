require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 1331;
var cors = require("cors");
require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require("./routes/user");
app.use("/api/v1", userRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
