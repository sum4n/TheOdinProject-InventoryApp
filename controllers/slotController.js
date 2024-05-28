const Slot = require("../models/slot");
const asyncHandler = require("express-async-handler");

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
  res.send(`NOT IMPLEMENTED: Slot detail: ${req.params.id}`);
});

// Display Slot create form on GET.
exports.slot_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot create GET");
});

// Handle Slot create on POST.
exports.slot_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot create POST");
});

// Display Slot delete form on GET.
exports.slot_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot delete GET");
});

// Handle Slot delete on POST.
exports.slot_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot delete POST");
});

// Display Slot update form on GET.
exports.slot_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot update GET");
});

// Handle Slot update on POST.
exports.slot_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Slot update POST");
});
