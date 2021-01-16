let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Users = new Schema(
  {
    MaSinhVien: String,
    HoTen: String,
    MatKhau: String,
    quyenHan: String,
    tokens: [{
      type: String,
      required: false
    }],
    IdUsers: {
      type: Schema.Types.ObjectId,
      ref: "SinhVien",  
  },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ChiTietThanhVien", Users);