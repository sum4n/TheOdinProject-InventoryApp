const Seller = require("../models/seller");
const asyncHandler = require("express-async-handler");

// Display list of all Sellers.
exports.seller_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Seller list");
});

// Display detail page of specific Seller.
exports.seller_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Seller detail: ${req.params.id}`);
});

// Display Seller create form on GET.
exports.seller_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Seller create GET");
});

// Handle Seller create on POST.
exports.seller_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Seller create POST");
});

// Display Seller delete form on GET.
exports.seller_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Seller delete GET");
});

// Handle Seller delete on POST.
exports.seller_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Seller create POST");
});

// Display Seller update form on GET.
exports.seller_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Seller update GET");
});

// Handle Seller update on POST.
exports.seller_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Seller update POST");
});
