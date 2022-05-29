const mongoose = require("mongoose");

//movie schema it would be used to save on the database
const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    poster_path:{
        type: String,               
    },
    overview:{
        type:String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    },
})

module.exports = mongoose.model("Movie", movieSchema);