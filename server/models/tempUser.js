const mongoose = require("mongoose");

const tempSchema = mongoose.Schema({
  userId: String,
  hash: String,
});

const Temp = mongoose.model("Temp", tempSchema);

module.exports = Temp;
