const {User} = require('../models/user');

module.exports = {
    async create(body) {
        return User.create(body)
    },
    
    async findAll() {
        return User.find()
    },

    async findOne(id) {
        return User.findOne(id)
    },

    async findByIdAndRemove(id){
        return User.findByIdAndRemove(id)
    },

}