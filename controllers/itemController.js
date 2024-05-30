const Item = require("../models/item");
const Seller = require("../models/seller");
const Slot = require("../models/slot");
const ItemInstance = require("../models/iteminstance");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  const allItems = await Item.find({}, "name quality")
    .sort({ quality: 1 })
    .populate("slot")
    .exec();

  res.render("item_list", {
    title: "Item List",
    item_list: allItems,
  });
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const [item, itemInstances] = await Promise.all([
    Item.findById(req.params.id).sort({ name: 1 }).populate("slot").exec(),
    ItemInstance.find({ item: req.params.id }).populate("seller").exec(),
  ]);

  if (item === null) {
    // No results
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: "Item Detail",
    item: item,
    itemInstances: itemInstances,
  });
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  // Get all slots which can be used for adding to our book.
  const allSlots = await Slot.find({}).exec();

  res.render("item_form", {
    title: "Create Item",
    slots: allSlots,
  });
});

// Handle Item create on POST.
exports.item_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("quality", "Quality must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("slot", "Slot must not be empty").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an Item object with the escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      quality: req.body.quality,
      slot: req.body.slot,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all slots for form.
      const allSlots = await Slot.find({}).exec();

      res.render("item_form", {
        title: "Create Item",
        slots: allSlots,
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Save item.
      await item.save();
      res.redirect(item.url);
    }
  }),
];

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
