const ItemInstance = require("../models/iteminstance");
const Item = require("../models/item");
const Seller = require("../models/seller");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  const itemInstance = await ItemInstance.findById(req.params.id)
    .populate("item")
    .populate("seller")
    .exec();

  if (itemInstance === null) {
    // No results
    const err = new Error("No Item instance found.");
    err.status = 404;
    return next(err);
  }

  res.render("iteminstance_detail", {
    title: "ItemInstance Detail",
    itemInstance: itemInstance,
  });
});

// Display ItemInstance create form on GET.
exports.iteminstance_create_get = asyncHandler(async (req, res, next) => {
  const [allItems, allSellers] = await Promise.all([
    Item.find({}, "name").sort({ name: 1 }).exec(),
    Seller.find({}).sort({ first_name: 1 }).exec(),
  ]);

  res.render("iteminstance_form", {
    title: "Create ItemInstance",
    items: allItems,
    sellers: allSellers,
  });
});

// Handle ItemInstance create on POST
exports.iteminstance_create_post = [
  body("item", "Item must be specified").trim().isLength({ min: 1 }).escape(),
  body("seller", "Seller must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("num_of_stocks")
    .trim()
    .isInt()
    .withMessage("Stock must be interger.")
    .isInt({ min: 1, max: 100 })
    .withMessage("Stock number must be between 1 and 100")
    .escape(),
  body("price", "Price must be specified.")
    .trim()
    .isDecimal({ min: 1 })
    .withMessage("Input must be decimal.")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an ItemInstance object with escaped and trimmed data.
    const iteminstance = new ItemInstance({
      item: req.body.item,
      seller: req.body.seller,
      num_of_stocks: req.body.num_of_stocks,
      price: req.body.price.toString(),
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all items and sellers for form.
      const [allItems, allSellers] = await Promise.all([
        Item.find({}, "name").sort({ name: 1 }).exec(),
        Seller.find({}).sort({ first_name: 1 }).exec(),
      ]);

      res.render("iteminstance_form", {
        title: "Create ItemInstance",
        items: allItems,
        selected_item: iteminstance.item._id,
        sellers: allSellers,
        selected_seller: iteminstance.seller._id,
        iteminstance: iteminstance,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Save Iteminstance.
      await iteminstance.save();
      res.redirect(iteminstance.url);
    }
  }),
];

// Display ItemInstance delete form on GET.
exports.iteminstance_delete_get = asyncHandler(async (req, res, next) => {
  // Get details for iteminstance
  const itemInstance = await ItemInstance.findById(req.params.id)
    .populate("item")
    .populate("seller")
    .exec();

  if (itemInstance === null) {
    // No result
    res.redirect("/catalog/iteminstances");
  }

  res.render("iteminstance_delete", {
    title: "Delete ItemInstance",
    iteminstance: itemInstance,
  });
});

// Hande ItemInstance delete on POST.
exports.iteminstance_delete_post = asyncHandler(async (req, res, next) => {
  const itemInstance = await ItemInstance.findById(req.params.id)
    .populate("item")
    .populate("seller")
    .exec();

  if (req.body.security_code != "123") {
    res.render("iteminstance_delete", {
      title: "Delete ItemInstance",
      iteminstance: itemInstance,
      code: req.body.security_code,
      error: "Wrong security code.",
    });
  } else {
    await ItemInstance.findByIdAndDelete(req.body.iteminstanceid);
    res.redirect("/catalog/iteminstances");
  }
});

// Display ItemInstance update form GET.
exports.iteminstance_update_get = asyncHandler(async (req, res, next) => {
  // Get all Items and all Sellers and iteminstance for form.
  const [iteminstance, allItems, allSellers] = await Promise.all([
    ItemInstance.findById(req.params.id).exec(),
    Item.find({}).sort({ quality: 1 }).exec(),
    Seller.find({}).sort({ first_name: 1 }).exec(),
  ]);

  if (iteminstance === null) {
    // No results
    const err = new Error("Item instance not found.");
    err.status = 404;
    return next(err);
  }

  res.render("iteminstance_form", {
    title: "Update ItemInstance",
    iteminstance: iteminstance,
    items: allItems,
    selected_item: iteminstance.item._id,
    sellers: allSellers,
    selected_seller: iteminstance.seller._id,
    form_type: "update",
  });
});

// Handle ItemInstance update on POST.
exports.iteminstance_update_post = [
  body("item", "Item must be specified").trim().isLength({ min: 1 }).escape(),
  body("seller", "Seller must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("num_of_stocks")
    .trim()
    .isInt()
    .withMessage("Stock must be integer.")
    .isInt({ min: 1, max: 100 })
    .withMessage("Stock number must be between 1 and 100")
    .escape(),
  body("price", "Price must be specified.")
    .trim()
    .isDecimal({ min: 1 })
    .withMessage("Input must be decimal.")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Create an ItemInstance object with escaped and trimmed data.
    const iteminstance = new ItemInstance({
      item: req.body.item,
      seller: req.body.seller,
      num_of_stocks: req.body.num_of_stocks,
      price: req.body.price,
      _id: req.params.id,
    });

    if (!errors.isEmpty() || req.body.security_code != "123") {
      // There are errors. Render form again with sanitized values/errors messages.

      // Get all items and sellers for form
      const [allItems, allSellers] = await Promise.all([
        Item.find({}, "name").sort({ name: 1 }).exec(),
        Seller.find({}).sort({ first_name: 1 }).exec(),
      ]);

      res.render("iteminstance_form", {
        title: "Create ItemInstance",
        items: allItems,
        selected_item: iteminstance.item._id,
        sellers: allSellers,
        selected_seller: iteminstance.seller._id,
        iteminstance: iteminstance,
        errors: errors.array(),
        form_type: "update",
        error: req.body.security_code != "123" ? "Wrong security code." : "",
        code: req.body.security_code,
      });
      return;
    } else {
      // Data from form is valid. Update object.
      await ItemInstance.findByIdAndUpdate(req.params.id, iteminstance, {});

      res.redirect(iteminstance.url);
    }
  }),
];
