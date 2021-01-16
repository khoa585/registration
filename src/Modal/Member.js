let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Member = new Schema(
  {
    MaSinhVien: String,
    HoTen: String,
    SoDienThoai: String,
    Email: String,
    LopSinhHoat: String,
    NgaySinh: Date,
    anhdaidien:String,
    ChucVu: String,

  },
  { timestamps: true }
);
module.exports = mongoose.model("SinhVien", Member);