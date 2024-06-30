const express=require('express');
const router=express.Router();

const Fetch=require('../Controllers/News/fetch.js');
const AllHeadlines=require('../Controllers/News/headlines.js');
const Bookmarks=require('../Controllers/News/bookmark.js');
const DeleteHeadline=require('../Controllers/News/deleteheadline.js');

router.post('/fetch',Fetch);
router.get('/headlines',AllHeadlines);
router.post('/delete',DeleteHeadline);
router.post('/bookmark',Bookmarks);

module.exports=router;