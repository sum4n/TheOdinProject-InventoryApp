const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
});

// Virtual for seller's full name.
SellerSchema.virtual("name").get(function () {
  // To avoid error in case no first_name or last_name.
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`;
  }

  return fullname;
});

// Virtual for seller's URL.
SellerSchema.virtual("url").get(function () {
  // Don't use arrow function as this object is needed.
  return `/catalog/seller/${this._id}`;
});

// Export model
module.exports = mongoose.model("Seller", SellerSchema);
