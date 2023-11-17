const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const informationSchema = new Schema({
  id: { type: ObjectId },
  title: { type: String, default: "abc" },
  image: { type: String, default: "abc" },
  description: [{ type: String, default: "abc" }],
  specific: [{
    image: { type: String, default: ""},
    description: { type: String, default:""}
  }],
  country: { type: String, default: "abc"},
  createAt: { type: String, default: "" },
});

module.exports = mongoose.models.information || mongoose.model("informations", informationSchema);