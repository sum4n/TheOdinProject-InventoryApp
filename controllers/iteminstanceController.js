const ItemInstance = require("../models/iteminstance");
const asyncHandler = require("express-async-handler");

// Display list of all ItemInstances.
exports.iteminstance_list = asyncHandler(async (req, res, next) => {
  const allItemInstances = await ItemInstance.find({})
    .populate("item")
    .populate("seller")
    .exec();

  res.render("iteminstance_list", {
    title: "ItemInstance List",
    iteminstance_list: allItemInstances,
  });
});

// Display detail page for a specific ItemInstance.
exports.iteminstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: ItemInstance detail: ${req.params.id}`);
});

// Display ItemInstance create form on GET.
exports.iteminstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance create GET");
});

// Handle ItemInstance create on POST
exports.iteminstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance create POST");
});

// Display ItemInstance delete form on GET.
exports.iteminstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance delete GET");
});

// Hande ItemInstance delete on POST.
exports.iteminstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance delete POST");
});

// Display ItemInstance update form GET.
exports.iteminstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance update GET");
});

// Handle ItemInstance update on POST.
exports.iteminstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: ItemInstance update POST");
});
