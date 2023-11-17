const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String, default: "abc" },
  password: { type: String, default: "abc" },
  email: { type: String, required: true },
  avatar: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/user-avatar%2Fuser-avatar.png?alt=media&token=ee34d681-f1ed-411c-b2d6-1991fcf7257d" },
  createAt: { type: String, default: Date.now },
});

module.exports = mongoose.models.user || mongoose.model("user", userSchema);