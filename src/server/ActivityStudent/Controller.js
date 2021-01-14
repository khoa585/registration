const express = require('express')
const router = express.Router()
import { createActive, createUser, ActiveRegistration, getactiveRegistration, activeAttendance } from './Modal'
import responeHelper from '../../common/responeHelper'

router.post("/createActive", async (req, res) => {
    try {
        const { TenHoatDong, SoDiemTichLuy, TrangThai } = req.body
        const result = await createActive(TenHoatDong, SoDiemTichLuy, TrangThai)
        if (result) return responeHelper(req, res, null, true)
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});

router.post("/createUser", async (req, res) => {
    try {
        const { MaSinhVien, HoTen, Ho, Ten, MatKhau, quyenHan } = req.body
        const result = await createUser(MaSinhVien, HoTen, Ho, Ten, MatKhau, quyenHan)
        if (result) return responeHelper(req, res, null, true)
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});


router.post("/activeRegistration", async (req, res) => {
    try {
        const { MaSinhVien, IdHoatDong } = req.body
        const result = await ActiveRegistration(MaSinhVien, IdHoatDong)
        if (result) return responeHelper(req, res, null, true)
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
        const { MaSinhVien } = req.body
        const result = await activeAttendance(MaSinhVien)
        if (result) return responeHelper(req, res, null, true)
        return responeHelper(req, res, false, null)
    } catch (error) {
        return responeHelper(req, res, error, null)
    }
});

export default router