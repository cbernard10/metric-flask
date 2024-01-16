const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

metricSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports =
  mongoose.models.Metric ?? mongoose.model("Metric", metricSchema);
