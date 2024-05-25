#! /usr/bin/env node

console.log(
  "This script populates some test items, sellers, slots and iteminstances to the database. Specified database as argument - e.g: node populatedb 'database_url' "
);

// Get arguments passed on command line.
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Seller = require("./models/seller");
const Slot = require("./models/slot");
const ItemInstance = require("./models/iteminstance");

const slots = [];
const sellers = [];
const items = [];
const iteminstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createSellers();
  await createSlots();
  await createItems();
  await createItemInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function sellerCreate(index, first_name, last_name) {
  const seller = new Seller({ first_name: first_name, last_name: last_name });

  await seller.save();
  sellers[index] = seller;
  console.log(`Added seller: ${first_name} ${last_name}`);
}

async function slotCreate(index, name, description) {
  const slotdetail = { name: name, description: description };

  const slot = new Slot(slotdetail);

  await slot.save();
  slots[index] = slot;
  console.log(`Added slot: ${name}`);
}

async function itemCreate(index, name, description, quality, slot) {
  const itemdetail = {
    name: name,
    description: description,
    quality: quality,
    slot: slot,
  };

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item ${name}`);
}

async function iteminstanceCreate(index, item, seller, num_of_stocks, price) {
  const iteminstancedetail = {
    item: item,
    seller: seller,
    num_of_stocks: num_of_stocks,
    price: price,
  };

  const iteminstance = new ItemInstance(iteminstancedetail);
  await iteminstance.save();
  iteminstances[index] = iteminstance;
  console.log(`Added iteminstance: ${item.name} ${num_of_stocks}`);
}

async function createSellers() {
  console.log("Adding sellers");
  await Promise.all([
    sellerCreate(0, "Erbag", "Merrybang"),
    sellerCreate(1, "Groodley", "Altertail"),
    sellerCreate(2, "Axle", "Goldpinch"),
    sellerCreate(3, "Kizz", "Sharpwheedle"),
    sellerCreate(4, "Golganar", "Firehammer"),
    sellerCreate(5, "Gar", "Flamebrew"),
  ]);
}

async function createSlots() {
  console.log("Adding Slots");
  await Promise.all([
    slotCreate(0, "Main Hand", "Main handed weapon"),
    slotCreate(1, "One-Hand", "One handed weapon"),
    slotCreate(2, "Two-Hand", "Two handed weapon"),
  ]);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      "Titansteel Bonecrusher",
      "Main Hand Mace - Item level 200 - Speed 2.50",
      "Epic",
      slots[0]
    ),
    itemCreate(
      1,
      "Skill's Fang",
      "Main Hand Dagger - Item level 187 - Speed 1.70",
      "Rare",
      slots[0]
    ),
    itemCreate(
      2,
      "The Dusk Blade",
      "One-Hand Dagger - Item level 200 - Speed 1.80",
      "Epic",
      slots[1]
    ),
    itemCreate(
      3,
      "Rugged Polearm",
      "Two-Hand Polearm - Item level 158 - Speed 3.50",
      "Uncommon",
      slots[2]
    ),
  ]);
}

async function createItemInstances() {
  console.log("Adding item instances");
  await Promise.all([
    iteminstanceCreate(0, items[0], sellers[0], 3, 1200.0),
    iteminstanceCreate(1, items[1], sellers[1], 8, 2200.0),
    iteminstanceCreate(2, items[0], sellers[2], 1, 1400.0),
    iteminstanceCreate(3, items[2], sellers[3], 22, 1600.0),
    iteminstanceCreate(4, items[3], sellers[4], 5, 2500.0),
  ]);
}
