const { default: mongoose } = require("mongoose");
let UserSchema = new mongoose.Schema({ 
    name: { type: String },
    age:  { type: Number },
    favoriteFoods: { type: [String] },
}) 


module.exports = mongoose.model('User', UserSchema)
