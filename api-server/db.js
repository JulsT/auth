const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
  () => {
    console.log("DB is connected");
  },
  err => {
    console.log("Error connect db " + err);
  }
);
