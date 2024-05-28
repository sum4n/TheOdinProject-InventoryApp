const Item = require("../models/item");
const Seller = require("../models/seller");
const Slot = require("../models/slot");
const ItemInstance = require("../models/iteminstance");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items, sellers, slots and item instances counts (in paraller)
  const [
    numItems,
    numItemInstances,
    numInStockItemInstances,
    numSellers,
    numSlots,
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    ItemInstance.countDocuments({}).exec(),
    ItemInstance.countDocuments({ num_of_stocks: { $gt: 0 } }).exec(),
    Seller.countDocuments({}).exec(),
    Slot.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "WoW Inventory Home",
    item_count: numItems,
    item_instance_count: numItemInstances,
    item_instance_stock_count: numInStockItemInstances,
    seller_count: numSellers,
    slot_count: numSlots,
  });
});

// Display list of all Item.
exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item list");
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create GET");
});

// Handle Item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create POST");
});

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle Item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});
