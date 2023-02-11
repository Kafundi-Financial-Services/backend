const mongoose = require("mongoose");
const io = require("../utils/socket");

const Schema = new mongoose.Schema(
  {
    ownedBy: { type: String },
    id: { type: String },
    mimetype: { type: String },
    name: { type: String },
    remarks: { type: String },
    role: { type: String },
    uuid: { type: String },
    category: { type: String, default: "Banner" },
  },
  {
    timestamps: true,
  }
);

Schema.post("findOneAndDelete", async function (doc) {
  console.log("middleware>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  io.getIO().emit("bannerDeleted", doc);

  console.log(doc, "Item post delete middlewarre. removed....");
});

Schema.post("save", function (doc) {
  console.log("savvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvingg");

  io.getIO().emit("newBanner", doc);
});
module.exports = mongoose.model("Banners", Schema);
