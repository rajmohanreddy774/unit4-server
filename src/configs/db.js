const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://RajMohanReddy:LUh3sl7jMzWSHGh1@cluster0.jg2fm.mongodb.net/shoppers?retryWrites=true&w=majority"
  );
};