let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let activeRegistration = new Schema(
  {
    IdHoatDong: {
        type: Schema.Types.ObjectId,
        ref: "DTNHoatDong",  
    },
    MaSinhVien:String,
    TrangThai: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("DTNSinhVienDangKyHD", activeRegistration);