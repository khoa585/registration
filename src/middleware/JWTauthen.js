let { decode } = require('../common/JWThelpers');
var user = require('../Modal/Users');
let JWTauthen = async (req, res, next) => {
    let jwt = req.headers['Authorization'] || req.headers['authorization'];
    if (!jwt) return next();
    let payload = decode(jwt)
    let resultUser = await user.findOne({
        _id: payload.data
    })
    if (resultUser && payload) {
        req.user = {
            _id: resultUser._id,
            MaSinhVien: resultUser.MaSinhVien,
            HoTen: resultUser.HoTen,
        }
    }
    next();
};
module.exports = {
    JWTauthen
}