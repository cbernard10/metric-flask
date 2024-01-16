const mongoose = require("mongoose");
const Metric = require("../models/metric");
const User = require("../models/user");
require('dotenv').config();

const emptyDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {});
  await Metric.deleteMany({});
  await User.deleteMany({});
};

if (process.env.NODE_ENV === "development") {
  emptyDb();
}
