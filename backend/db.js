const mongoose=require('mongoose')
const mongoURI='mongodb+srv://kamil:<password>@cluster0.u8ecui6.mongodb.net/?retryWrites=true&w=majority'
// mongodb://localhost:27017/
// mongodb://127.0.0.1:27017/?directConnection=true

const connectmongo=async()=>{

const mon=await mongoose.connect(mongoURI)

console.log(`connected successfully ${mon.connection.host}`)

}


module.exports=connectmongo;
