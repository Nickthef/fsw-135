const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// comment schema
const commentSchema = new Schema({
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



module.exports = mongoose.model('Comment', commentSchema);