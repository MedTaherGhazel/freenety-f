const mongoose= require("mongoose");
const uniqueValidator= require("mongoose-unique-validator");

const userSchema= mongoose.Schema({
  // firstName:{type: String, required:true},
  // lastName:{type: String, required:true},
  // userName:{type: String, required:true, unique:true},
  email:{type: String, required:true, unique:true},
  password:{type: String, required:true},
  // phone:{type: String,unique:true},
  // gender:{type: Boolean, required:true},
  // birth:{type:Date,required:true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema)
