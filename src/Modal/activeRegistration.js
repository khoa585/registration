let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let activeRegistration = new Schema(
  {
    IdHoatDong: {
        type: Schema.Types.String,
        ref: "DTNHoatDong",  
    },
    MaSinhVien: {
        type: Schema.Types.String,
        ref: "ChiTietThanhVien",  
    },
    TrangThai: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("DTNSinhVienDangKyHD", activeRegistration);