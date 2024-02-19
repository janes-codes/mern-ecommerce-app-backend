const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    image: { type: String },
    type: String,
    email: String,
    name: String,
    password: String,
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'products'}],
    roles: [{type: String, ref: 'roles'}]
});

module.exports = mongoose.model('users', userSchema);
