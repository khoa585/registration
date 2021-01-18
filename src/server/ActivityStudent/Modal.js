import activity, { findOne } from '../../Modal/activity'
import Users from '../../Modal/Users'
import activeRegistration from '../../Modal/activeRegistration'
import Member from '../../Modal/Member'
const bcrypt = require('bcrypt')
const saltRounds = 10;


const create = (MaSinhVien,
    HoTen,
    MatKhau,
    quyenHan) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(MatKhau, salt)
    Users.create({
        MaSinhVien,
        HoTen,
        MatKhau: hash,
        quyenHan,
        IdUsers: null,
    })
}

export const createActive = async (TenHoatDong, SoDiemTichLuy, TrangThai, ThoigianTochuc) => {
    const result = activity.create({
        TenHoatDong,
        SoDiemTichLuy,
        TrangThai,
        SoLuongThamGia: null,
        ThoigianTochuc
    })
    return result
}


export const createMember = async (MaSinhVien,
    HoTen,
    SoDienThoai,
    Email,
    LopSinhHoat,
    NgaySinh) => {
    const result = Member.create({
        MaSinhVien,
        HoTen,
        SoDienThoai,
        Email,
        LopSinhHoat,
        NgaySinh,
        anhdaidien: null,
        ChucVu: 1,
    })
    return result
}

export const getInformember = async (MaSinhVien) => {
    const result = await Member.findOne(MaSinhVien)
    return result
}

export const UpdateInforMember = async (MaSinhVien,
    SoDienThoai,
    Email,
    NgaySinh) => {
    const result = await Member.findOneAndUpdate(MaSinhVien, {
        Email,
        SoDienThoai,
        NgaySinh
    }, { useFindAndModify: false })
    return result
}


export const createUser = async (MaSinhVien, HoTen, MatKhau, quyenHan) => {
    let ObjectId = require('mongodb').ObjectId;
    const checkEx = await Users.findOne({ MaSinhVien })
    if (checkEx) {
        return "Mã sinh viên đã tồn tại"
    }
    create(MaSinhVien,
        HoTen,
        MatKhau,
        quyenHan)
    const result = await Member.find({ MaSinhVien })
    return await Users.findOneAndUpdate({ MaSinhVien }, {
        IdUsers: ObjectId(result[0]._id)
    }, { useFindAndModify: false })
}

export const ActiveRegistration = async (MaSinhVien, IdHoatDong) => {
    let ObjectId = require('mongodb').ObjectId;
    const result = activeRegistration.create({
        MaSinhVien,
        IdHoatDong: ObjectId(IdHoatDong),
        TrangThai: 0,
    })
    return result
}

export const getactiveRegistration = async (id) => {
    const result = await activity.findById(id)
    return result
}

export const activeAttendance = async (MaSinhVien, IdHoatDong) => {

    const result = await activeRegistration.findOneAndUpdate({ MaSinhVien, IdHoatDong }, {
        TrangThai: 1
    }, { useFindAndModify: false })

    return result
}

export const getActivityBy = async (MaSinhVien) => {
    const result = await activeRegistration
        .find({ MaSinhVien })
        .populate({
            path: "IdHoatDong",
            select: ["TenHoatDong", "ThoigianTochuc", "SoDiemTichLuy"],
        });
    return result
}

export const getAllActivity = async () => {
    const result = await activeRegistration.find({})
        .populate({
            path: "IdHoatDong",
            select: ["TenHoatDong", "ThoigianTochuc", "SoLuongThamGia"],
        });
    return result
}

export const getListActivi = async() => {
    const result = await activity.find({})
    return result
}