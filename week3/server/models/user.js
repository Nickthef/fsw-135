const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    item_type: {
        type: String,
        required: true
    },
    item_amount: {
        type: Number,
        required: true,
    }
})



module.exports = mongoose.model('User', userSchema);