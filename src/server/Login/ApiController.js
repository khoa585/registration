const express = require('express')
const router = express.Router()
let cheerio = require("cheerio");
import { login, getHistory, getGeneralInformation, getLibrary, getNewPost, getInforuser, getDetail } from './ModalControler'
import responeHelper from '../../common/responeHelper'
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    console.log(username, password )
    await login(req, res, username, password)

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

router.post('/getDetail', async (req, res) => {
    const { uri } = req.body
    const result = await getDetail(uri)
    console.log(result)
    if (result) {
        responeHelper(req, res, null, result)
    } else {
        responeHelper(req, res, false, null)
    }
})
export default router