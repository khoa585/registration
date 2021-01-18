const express = require('express')
const router = express.Router()
import {
    createActive,
    createUser,
    ActiveRegistration,
    getactiveRegistration,
    activeAttendance,
    createMember,
    UpdateInforMember,
    getActivityBy,
    getAllActivity,
    getInformember,
    getListActivi
} from './Modal'
import responeHelper from '../../common/responeHelper'
import { checkLogin } from './user'
import { getToken } from './../../common/JWThelpers'
router.post("/createActive", async (req, res) => {
    try {
        const { TenHoatDong, SoDiemTichLuy, TrangThai, ThoigianTochuc } = req.body
        const result = await createActive(TenHoatDong, SoDiemTichLuy, TrangThai, ThoigianTochuc)
        if (result) return responeHelper(req, res, null, true)
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});

router.post("/createMember", async (req, res) => {
    try {
        const {
            MaSinhVien,
            HoTen,
            SoDienThoai,
            Email,
            LopSinhHoat,
            NgaySinh } = req.body
        const result = await createMember(
            MaSinhVien,
            HoTen,
            SoDienThoai,
            Email,
            LopSinhHoat,
            NgaySinh)
        if (result) return responeHelper(req, res, null, true)
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});

router.post("/UpdateInforMember", async (req, res) => {
    try {
        if (req.user) {
            const {
                SoDienThoai,
                Email,
                NgaySinh } = req.body
            const result = await UpdateInforMember(
                req.user.MaSinhVien,
                SoDienThoai,
                Email,
                NgaySinh)
            if (result) return responeHelper(req, res, null, true)
            return responeHelper(req, res, false, null)
        }
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});


router.post("/createUser", async (req, res) => {
    try {
        const { MaSinhVien, HoTen, MatKhau, quyenHan } = req.body
        const result = await createUser(MaSinhVien, HoTen, MatKhau, quyenHan)
        if (result) return responeHelper(req, res, null, result)
        return responeHelper(req, res, result, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});


router.post("/activeRegistration", async (req, res) => {
    try {
        if (req.user) {
            const { IdHoatDong } = req.body
            const result = await ActiveRegistration(req.user.MaSinhVien, IdHoatDong)
            if (result) return responeHelper(req, res, null, result)
            return responeHelper(req, res, false, null)
        }
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});

router.get("/getactiveRegistration/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await getactiveRegistration(id)
        if (result) return responeHelper(req, res, null, result)
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});

router.post("/activeAttendance", async (req, res) => {
    try {
        if (req.user) {
            const { IdHoatDong } = req.body
            const result = await activeAttendance(req.user.MaSinhVien, IdHoatDong)
            if (result) return responeHelper(req, res, null, true)
            return responeHelper(req, res, false, null)
        }
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});



router.get("/getActivityBy", async (req, res) => {
    try {
        if (req.user) {
            const result = await getActivityBy(req.user.MaSinhVien)
            if (result) return responeHelper(req, res, null, result)
            return responeHelper(req, res, false, null)
        }
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});


router.get("/getAllActivity", async (req, res) => {
    try {
        if (req.user) {
            const result = await getAllActivity()
            if (result) return responeHelper(req, res, null, result)
            return responeHelper(req, res, false, null)
        }
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});


router.post("/getInformember", async (req, res) => {
    try {
        if (req.user) {
            const result = await getInformember(req.user.MaSinhVien)
            if (result) return responeHelper(req, res, null, result)
            return responeHelper(req, res, false, null)
        }
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});

router.post('/login', async (req, res) => {
    const { MaSinhVien } = req.body
    let result = await checkLogin(MaSinhVien);
    if (result) {
        let token = getToken(result._id);
        result['info'] = {
            MaSinhVien: result.MaSinhVien,
            HoTen: result.HoTen,
            token
        }

        return responeHelper(req, res, null, result['info']);
    } else {
        return responeHelper(req, res, "ErrorEC.LOGIN_FAIL", null);
    }
})

router.get('/getListActivi', async (req, res) => {
    let result = await getListActivi();
    if (result) {
        return responeHelper(req, res, null,result);
    } else {
        return responeHelper(req, res, "ErrorEC.LOGIN_FAIL", null);
    }
})

export default router