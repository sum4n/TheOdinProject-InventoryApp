const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
  // reference to the associated item
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  seller: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
  num_of_stocks: { type: Number, min: 0, required: true },
  price: { type: mongoose.Types.Decimal128, min: 0, required: true },
});

// Virtual for in-stock/out-of-stock
ItemInstanceSchema.virtual("stock").get(function () {
  let stock_status = "Out-of-stock";

  if (this.num_of_stocks > 0) {
    stock_status = "In-stock";
  }

  return stock_status;
});

// Virtual for iteminstance URL.
ItemInstanceSchema.virtual("url").get(function () {
  return `/catalog/iteminstance/${this._id}`;
});

module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);
