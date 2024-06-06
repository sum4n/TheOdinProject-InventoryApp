const express = require("express");
const router = express.Router();

const multer = require("multer");
// const upload = multer({ dest: "./public/images" });
// Config multer for cloudinary upload.
const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200000 }, // 200 kb
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Not an image! Please upload only images."), false);
  },
});

// Require controller modules.
const item_controller = require("../controllers/itemController");
const seller_controller = require("../controllers/sellerController");
const slot_controller = require("../controllers/slotController");
const item_instance_controller = require("../controllers/iteminstanceController");

// ITEM ROUTES ///

// GET the catalog home page.
router.get("/", item_controller.index);

// GET request for creating an Item. NOTE This must come before routes that display Item (uses id).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating Item.
router.post(
  "/item/create",
  uploadPhoto.single("itemImage"),
  item_controller.item_create_post
);

// GET request to delete Item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete Item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update Item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update Item.
router.post(
  "/item/:id/update",
  uploadPhoto.single("itemImage"),
  item_controller.item_update_post
);

// GET request for one Item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all Items.
router.get("/items", item_controller.item_list);

/// SELLER ROUTES ///

// GET request for creating Seller. NOTE This must come before routes that display Seller (uses id).
router.get("/seller/create", seller_controller.seller_create_get);

// POST request for creating Seller.
router.post("/seller/create", seller_controller.seller_create_post);

// GET request to delete Seller.
router.get("/seller/:id/delete", seller_controller.seller_delete_get);

// POST request to delete Seller.
router.post("/seller/:id/delete", seller_controller.seller_delete_post);

// GET request to update Seller.
router.get("/seller/:id/update", seller_controller.seller_update_get);

// POST request to update Seller.
router.post("/seller/:id/update", seller_controller.seller_update_post);

// GET request for one Seller.
router.get("/seller/:id", seller_controller.seller_detail);

// GET request for list of all Sellers.
router.get("/sellers", seller_controller.seller_list);

/// SLOT ROUTES ///

// GET request for creating Slot. NOTE This must come before routes that display Slot (uses id).
router.get("/slot/create", slot_controller.slot_create_get);

// POST request for creating Slot.
router.post("/slot/create", slot_controller.slot_create_post);

// GET request to delete Slot.
router.get("/slot/:id/delete", slot_controller.slot_delete_get);

// POST request to delete Slot.
router.post("/slot/:id/delete", slot_controller.slot_delete_post);

// GET request to update Slot.
router.get("/slot/:id/update", slot_controller.slot_update_get);

// POST request to update Slot.
router.post("/slot/:id/update", slot_controller.slot_update_post);

// GET request for one Slot.
router.get("/slot/:id", slot_controller.slot_detail);

// GET request for list of all Slots.
router.get("/slots", slot_controller.slot_list);

/// ITEMINSTANCE ROUTES ///

// GET request for creating ItemInstance. NOTE This must come before routes that display ItemInstance (uses id).
router.get(
  "/iteminstance/create",
  item_instance_controller.iteminstance_create_get
);

// POST request for creating ItemInstance.
router.post(
  "/iteminstance/create",
  item_instance_controller.iteminstance_create_post
);

// GET request to delete ItemInstance.
router.get(
  "/iteminstance/:id/delete",
  item_instance_controller.iteminstance_delete_get
);

// POST request to delete ItemInstance.
router.post(
  "/iteminstance/:id/delete",
  item_instance_controller.iteminstance_delete_post
);

// GET request to update ItemInstance.
router.get(
  "/iteminstance/:id/update",
  item_instance_controller.iteminstance_update_get
);

// POST request to update ItemInstance.
router.post(
  "/iteminstance/:id/update",
  item_instance_controller.iteminstance_update_post
);

// GET request for one ItemInstance.
router.get("/iteminstance/:id", item_instance_controller.iteminstance_detail);

// GET request for list of all ItemInstances.
router.get("/iteminstances", item_instance_controller.iteminstance_list);

module.exports = router;
