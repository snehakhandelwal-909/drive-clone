const mongoose=require('mongoose')
function connectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Database connected');
    })
}

module.exports=connectDB;
