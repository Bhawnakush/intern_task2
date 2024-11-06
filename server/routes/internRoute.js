const express =require('express');
const router=express.Router();
const {getTickers}=require("../controller/internController.js")
router.get('/get',getTickers);
module.exports=router