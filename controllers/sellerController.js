const Seller = require("../models/seller");
const ItemInstance = require("../models/iteminstance");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Sellers.
exports.seller_list = asyncHandler(async (req, res, next) => {
  const allSellers = await Seller.find({}).sort({ first_name: 1 }).exec();

  res.render("seller_list", {
    title: "Seller List",
    seller_list: allSellers,
  });
});

// Display detail page of specific Seller.
exports.seller_detail = asyncHandler(async (req, res, next) => {
  const [seller, sellerItemInstances] = await Promise.all([
    Seller.findById(req.params.id).exec(),
    ItemInstance.find({ seller: req.params.id }).populate("item").exec(),
  ]);

  if (seller === null) {
    const err = new Error("Seller not found.");
    err.status = 404;
    return next(err);
  }

  res.render("seller_detail", {
    title: "Seller Detail",
    seller: seller,
    sellerItemInstances: sellerItemInstances,
  });
});

// Display Seller create form on GET.
exports.seller_create_get = (req, res, next) => {
  res.render("seller_form", { title: "Create Seller" });
};

// Handle Seller create on POST.
exports.seller_create_post = [
  // Validate and sanitize fields.
  body("first_name", "First name must contain at least 2 characters.")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  body("last_name", "Last name must contail at least 2 characters.")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Create a seller object with escaped and trimmed data.
    const seller = new Seller({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("seller_form", {
        title: "Create Seller",
        seller: seller,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save seller.
      await seller.save();
      // Redirect to new seller record.
      res.redirect(seller.url);
    }
  }),
];

// Display Seller delete form on GET.
exports.seller_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of seller and all their item instance.
  const [seller, allItemsBySeller] = await Promise.all([
    Seller.findById(req.params.id).exec(),
    ItemInstance.find({ seller: req.params.id }).populate("item").exec(),
  ]);

  if (seller === null) {
    // No result.
    res.redirect("/catalog/sellers");
  }

  res.render("seller_delete", {
    title: "Delete Seller",
    seller: seller,
    seller_items: allItemsBySeller,
  });
});

// Handle Seller delete on POST.
exports.seller_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of seller and all their items (in parallel).
  const [seller, allItemsBySeller] = await Promise.all([
    Seller.findById(req.params.id).exec(),
    ItemInstance.find({ seller: req.params.id }).populate("item").exec(),
  ]);

  if (allItemsBySeller.length > 0 || req.body.security_code != "123") {
    // Seller has items. Render in same way as for GET route.
    res.render("seller_delete", {
      title: "Delete Seller",
      seller: seller,
      seller_items: allItemsBySeller,
      code: req.body.security_code,
      error: "Wrong security code.",
    });
    return;
  } else {
    // Seller has no items. Delete object and redirect to the list of sellers.
    await Seller.findByIdAndDelete(req.body.sellerid);
    res.redirect("/catalog/sellers");
  }
});

// Display Seller update form on GET.
exports.seller_update_get = asyncHandler(async (req, res, next) => {
  // Get seller for form.
  const seller = await Seller.findById(req.params.id).exec();

  if (seller === null) {
    const err = new Error("Seller not found.");
    err.status = 404;
    return next(err);
  }

  res.render("seller_form", {
    title: "Update Seller",
    seller: seller,
    form_type: "update",
  });
});

// Handle Seller update on POST.
exports.seller_update_post = [
  // Validate and sanitize fields.
  body("first_name", "First name must contain at least 2 characters.")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  body("last_name", "Last name must contail at least 2 characters.")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Create a seller object with escaped and trimmed data.
    const seller = new Seller({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      _id: req.params.id,
    });

    if (!errors.isEmpty() || req.body.security_code != "123") {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("seller_form", {
        title: "Update Seller",
        seller: seller,
        errors: errors.array(),
        code: req.body.security_code,
        form_type: "update",
        error: req.body.security_code != "123" ? "Wrong security code." : "",
      });
      return;
    } else {
      // Data from form is valid.

      // Update seller.
      await Seller.findByIdAndUpdate(req.params.id, seller, {});
      // Redirect to new seller record.
      res.redirect(seller.url);
    }
  }),
];
