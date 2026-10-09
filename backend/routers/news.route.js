const express = require("express");
const router=express.Router();
const {getNews} = require("../controllers/news.controller.js");
router.get("/",getNews);

module.exports=router;