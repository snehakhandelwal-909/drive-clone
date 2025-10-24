const express=require('express');
const router=express.Router();
const upload=require('../config/multer.config');
const fileModel=require('../model/file.model');
const authMiddleware=require('../middleware/authe');
const firebase=require('../config/firebase.config')



router.get('/home',authMiddleware,async(req,res)=>{
    const userfiles=await fileModel.find({ user: req.user.userID });
    console.log(userfiles);
    res.render('home', { files: userfiles });
});
router.post('/upload',authMiddleware, upload.single('file'), async (req, res) => {
    const newfile = await fileModel.create({
        path: req.file.path,
        originalName: req.file.originalname,
        user: req.user.userID
    });
    res.json(newfile); 
});
router.get('/download/:path',authMiddleware, async (req, res) => {
    const loggedinuserid=req.user.userID;
    const path=req.params.path;
    const file=await fileModel.findOne({ user: loggedinuserid, path: path });
    if (!file) {
        return res.status(404).json({ error: 'File not found' });
    }
    const signedurl=await firebase.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000 // 15 minutes
    });
    res.redirect(signedurl[0]);
});

module.exports=router;