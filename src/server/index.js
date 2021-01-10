const express = require('express')
const router = express.Router()
import authen from './Login/ApiController'
router.use("/", authen);
export default router
 