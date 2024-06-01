const Slot = require("../models/slot");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Slot.
exports.slot_list = asyncHandler(async (req, res, next) => {
  const allSlots = await Slot.find({}).sort({ name: 1 }).exec();

  res.render("slot_list", {
    title: "Slot List",
    slot_list: allSlots,
  });
});

// Display detail page for a specific Slot.
exports.slot_detail = asyncHandler(async (req, res, next) => {
  const [items, slot] = await Promise.all([
    Item.find({ slot: req.params.id }).sort({ name: 1 }).exec(),
    Slot.findById(req.params.id).exec(),
  ]);

  if (slot === null) {
    const err = new Error("Slot not found");
    err.status = 404;
    return next(err);
  }

  res.render("slot_detail", {
    title: "Slot Detail",
    items: items,
    slot: slot,
  });
});

// Display Slot create form on GET.
exports.slot_create_get = (req, res, next) => {
  res.render("slot_form", { title: "Create Slot" });
};

// Handle Slot create on POST.
exports.slot_create_post = [
  // Validate and sanitize the name field.
  body("name", "Slot name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("description", "Description must contain at least 4 characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Create a slot object with escaped and trimmed data.
    const slot = new Slot({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("slot_form", {
        title: "Create Slot",
        slot: slot,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Slot with same name alredy exists.
      const slotExists = await Slot.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (slotExists) {
        // Slot exists, redirect to its detail page.
        res.redirect(slotExists.url);
      } else {
        await slot.save();
        // New slot saved. Redirect to slot detail page.
        res.redirect(slot.url);
      }
    }
  }),
];

// Display Slot delete form on GET.
exports.slot_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of slot and all its items (in parallel)
  const [slot, itemsInSlot] = await Promise.all([
    Slot.findById(req.params.id).exec(),
    Item.find({ slot: req.params.id }).sort({ quality: 1 }).exec(),
  ]);

  if (slot === null) {
    // No result.
    res.redirect("/catalog/slots");
  }

  res.render("slot_delete", {
    title: "Delete Slot",
    slot: slot,
    slot_items: itemsInSlot,
  });
});

// Handle Slot delete on POST.
exports.slot_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of slot and all its items (in parallel)
  const [slot, itemsInSlot] = await Promise.all([
    Slot.findById(req.params.id).exec(),
    Item.find({ slot: req.params.id }).sort({ quality: 1 }).exec(),
  ]);

  if (itemsInSlot.length > 0) {
    // Slot has items. Render in same way as for GET route.
    res.render("slot_delete", {
      title: "Delete Slot",
      slot: slot,
      slot_items: itemsInSlot,
    });
    return;
  } else {
    // Slot has no items. Delete object and redirect to the list of slots.
    await Slot.findByIdAndDelete(req.body.slotid);
    res.redirect("/catalog/slots");
  }
});

// Display Slot update form on GET.
exports.slot_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot update GET");
});

// Handle Slot update on POST.
exports.slot_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot update POST");
});
