const multer=require('multer');
const firebasestorage=require('multer-firebase-storage');
const firebase=require('./firebase.config');
const storage=firebasestorage({
  credentials:firebase.credential.cert(require('../drive-8a0b4-firebase-adminsdk-fbsvc-0253a24150.json')),
  bucketName: "drive-8a0b4.firebasestorage.app",
  unique:true
});
const upload =multer({storage:storage});
module.exports=upload;