const express = require('express')
const router = express.Router()
import {login } from './ModalControler'
import responeHelper from '../../common/responeHelper'
router.post("/login", async (req, res) => {
    const {username,password} = req.body
    const result =  await login(username,password)
    if(result){
        responeHelper(req, res,null,true)
    }else{
        responeHelper(req, res,false,null)
    }
});
export default router