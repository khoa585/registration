let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let activity = new Schema(
  {
    TenHoatDong: String,
    SoLuongThamGia: String,
    SoDiemTichLuy: String,
    TrangThai: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("DTNHoatDong", activity);