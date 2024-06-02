const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quality: {
    type: String,
    required: true,
    enum: ["Legendary", "Epic", "Rare", "Uncommon", "Common", "Poor"],
  },
  slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
  imgUrl: { type: String },
});

// Virtual for item's URL.
ItemSchema.virtual("url").get(function () {
  // Need this object, don't use arrow function.
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
