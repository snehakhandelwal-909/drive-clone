const Firebase=require('firebase-admin');

let firebaseConfig;
if(process.env.FIREBASE_CONFIG_JSON){
  firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG_JSON);
} else {
  firebaseConfig = require('../drive-8a0b4-firebase-adminsdk-fbsvc-0253a24150.json');
}

const firebase=Firebase.initializeApp({
  credential: Firebase.credential.cert(firebaseConfig),
  storageBucket: process.env.FIREBASE_BUCKET || "drive-8a0b4.firebasestorage.app"
});

module.exports=Firebase;