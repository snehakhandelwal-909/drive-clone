const Firebase=require('firebase-admin');

const firebase=Firebase.initializeApp({
  credential: Firebase.credential.cert(require('../drive-8a0b4-firebase-adminsdk-fbsvc-0253a24150.json')),
  storageBucket: "drive-8a0b4.firebasestorage.app"
});
module.exports=Firebase;