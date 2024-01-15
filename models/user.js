const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  image: String,
  emailVerified: Boolean,
  metrics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metric",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.emailVerified;
  },
});

console.log(mongoose.models);
module.exports = mongoose.models.User ?? mongoose.model("User", userSchema);
