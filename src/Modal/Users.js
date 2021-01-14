let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Users = new Schema(
  {
    MaSinhVien: String,
    HoTen: String,
    Ho: String,
    Ten: String,
    MatKhau: String,
    quyenHan: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("ChiTietThanhVien", Users);