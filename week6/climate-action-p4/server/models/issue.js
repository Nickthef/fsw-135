const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// issue schema
const issueSchema = new Schema({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
})



module.exports = mongoose.model('Issue', issueSchema);