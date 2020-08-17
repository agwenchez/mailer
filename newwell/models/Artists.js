const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const ArtistSchema = new Schema({
name:{
    required: true,
    type: String
},
email:{
    required: true,
    type: String
},
phone_number:{
    required: true,
    type: String
},
date:{
    type: Date,
    default:Date.now()
}

});


module.exports = mongoose.model('artists', ArtistSchema );
