const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true },
  description: { type: String, minLength: 3, maxLength: 200, required: true },
});

// Virtual for slot URL.
SlotSchema.virtual("url").get(function () {
  return `/catalog/slot/${this._id}`;
});

module.exports = mongoose.model("Slot", SlotSchema);
