const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  skillHave: {
    type: [String],
    default: []
  },

  skillWant: {
    type: [String],
    default: []
  },

  rate: {
    type: Number,
    default: 30
  },

  address: {
    type: String,
    default: ""
  },

  qualification: {
    type: String,
    default: ""
  },

  isPro: {
    type: Boolean,
    default: false
  },

  hourlyRate: {
    type: Number,
    default: 0
  },

  proBio: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);