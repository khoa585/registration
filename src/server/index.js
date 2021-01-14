const express = require('express')
const router = express.Router()
import authen from './Login/ApiController'
import activityStudent from './ActivityStudent/Controller'
router.use("/", authen);
router.use("/", activityStudent);
export default router
 