const mongoose = require('mongoose');
const moongoose=require('mongoose');

const connectDB=async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, { autoIndex: false })
         console.log('Database Connected'.cyan.underline+conn.connection.host);
    }
    catch(err){
        console.log(err)
        process.exit(1) //if there is a errror we will exit the process with process .exir code1
    }
}

module.exports={connectDB};

//DATABASE CONNECTED SUCCESSFULLY NOW WE MAKE MODELS