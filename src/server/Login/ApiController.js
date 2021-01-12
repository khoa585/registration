const express = require('express')
const router = express.Router()
import { login, getHistory,getGeneralInformation ,getLibrary,getNewPost,getInforuser} from './ModalControler'
import responeHelper from '../../common/responeHelper'
router.post("/login", async (req, res) => {
    // const {username,password} = req.body
    const result = await login()
    console.log(result)
    if (result) {
        responeHelper(req, res, null, true)
    } else {
        responeHelper(req, res, false, null)
    }
});
router.get('/getHistory', async (req, res) => {
    const result = await getHistory()
    if (result) {
        responeHelper(req, res, null, result)
    } else {
        responeHelper(req, res, false, null)
    }
})
router.get('/getGeneralInformationT', async (req, res) => {
    const url = "http://sinhvien.ute.udn.vn/ChuyenDe/1/Thong-tin-tu-Truong_6.html"
    const result = await getGeneralInformation(url)
    if (result) {
        responeHelper(req, res, null, result)
    } else {
        responeHelper(req, res, false, null)
    }
})
router.get('/getGeneralInformationBQT', async (req, res) => {
    const url = "http://sinhvien.ute.udn.vn/ChuyenDe/1/Thong-tin-tu-BQT_7.html"
    const result = await getGeneralInformation(url)
    if (result) {
        responeHelper(req, res, null, result)
    } else {
        responeHelper(req, res, false, null)
    }
})
router.get('/getLibrary', async (req, res) => {
    const url = "http://sinhvien.ute.udn.vn/ChuyenDe/Thu-vien-tai-lieu_16.html"
    const result = await getLibrary(url)
    if (result) {
        responeHelper(req, res, null, result)
    } else {
        responeHelper(req, res, false, null)
    }
})


router.get('/getNewPost', async (req, res) => {
    const url = "http://sinhvien.ute.udn.vn/default.aspx"
    const result = await getNewPost(url)
    if (result) {
        responeHelper(req, res, null, result)
    } else {
        responeHelper(req, res, false, null)
    }
})


router.get('/getInforuser', async (req, res) => {
    const result = await getInforuser()
    console.log(result)
    if (result) {
        responeHelper(req, res, null, result)
    } else {
        responeHelper(req, res, false, null)
    }
})
export default router