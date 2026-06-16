const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: true,
  },

  receiverEmail: {
    type: String,
    required: true,
  },

  offer: {
    type: String,
    required: true,
  },

  want: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: "pending" // pending | accepted | rejected
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Request", requestSchema);