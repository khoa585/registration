import activity from '../../Modal/activity'
import Users from '../../Modal/Users'
import activeRegistration from '../../Modal/activeRegistration'

export const createActive = async (TenHoatDong, SoDiemTichLuy, TrangThai) => {
    const result = activity.create({
        TenHoatDong,
        SoDiemTichLuy,
        TrangThai,
        SoLuongThamGia: null
    })
    return result
}
export const createUser = async (MaSinhVien, HoTen, Ho, Ten, MatKhau, quyenHan) => {
    const result = Users.create({
        MaSinhVien,
        HoTen,
        Ho,
        Ten,
        MatKhau,
        quyenHan
    })
    return result
}
export const ActiveRegistration = async (MaSinhVien, IdHoatDong) => {
    const result = activeRegistration.create({
        MaSinhVien,
        IdHoatDong,
        TrangThai: 0
    }, {
        "$push": {
            "DTNHoatDong": IdHoatDong,
            "ChiTietThanhVien": MaSinhVien
        }
    })
    return result
}

export const getactiveRegistration = async (id) => {
    const result = await activity.findById(id)
    return result
}
export const activeAttendance = async (MaSinhVien) => {
    const result = await activeRegistration.findOneAndUpdate(MaSinhVien, {
        TrangThai: 0
    },{useFindAndModify: false})
    return result
}
