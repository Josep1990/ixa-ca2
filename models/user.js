const mongoose = require("mongoose");
passportLocalMongoose = require("passport-local-mongoose");
//user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {type: String, unique: true, required: true}
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);