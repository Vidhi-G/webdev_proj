// models/Reply.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  replyText: {
    type: String,
    required: true,
  },
  userId: {
    // Reference to the user who posted the reply
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  requestId: {
    // Reference to the request this reply belongs to
    type: Schema.Types.ObjectId,
    ref: "Request", // Assuming you have a Request model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reply", replySchema);
