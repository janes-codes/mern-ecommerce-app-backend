const mongoose = require('mongoose')

const rolesSchema = new mongoose.Schema({
    role: String,
    permissions: [{type: String}]
})

module.exports = mongoose.model('roles', rolesSchema);