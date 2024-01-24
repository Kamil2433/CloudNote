const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
 

  title:{
    type:String,
    require:true
  },User:{
    type:Schema.Types.ObjectId,
    ref:'user'
    },
  description:{
    type:String,
    require:true,
  },
  date:{
    type:Date,
  
  }

})

module.exports=mongoose.model('Notes',NotesSchema);


