const mongoose = require("mongoose");

const metricPropertiesSchema = new mongoose.Schema({
  metric: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Metric",
  },
  trace: String,
  determinant: String,
  inverse: String,
  partial_derivatives: String,
  christoffel_1: {
    x: String,
    y: String,
    z: String,
  },
  christoffel_2: {
    x: String,
    y: String,
    z: String,
  },
});

metricPropertiesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports =
  mongoose.models.MetricProperties ||
  mongoose.model("MetricProperties", metricPropertiesSchema);
