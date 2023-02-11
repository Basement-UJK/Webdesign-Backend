const { Model } = require("objection");
const knex = require('../knexfile')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
Model.knex(knex)

class User extends Model {
    static get tableName() {
        return "users";
    }
    
    // TODO use this  function
    async hashPassword(){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    async $beforeInsert(queryContext) {
        await super.$beforeInsert(queryContext);
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    // TODO  check if password is updating if true hash it 
    // async $beforeUpdate(queryContext) {
    //     await super.$beforeInsert(queryContext);
    //     const salt = await bcrypt.genSalt(10)
    //     const hashedPassword = await bcrypt.hash(this.password, salt);
    //     this.password = hashedPassword;

    // }

    createJWT() {
        return jwt.sign(
            { 
                id: this.id,
                first_name: this.first_name,
                last_name: this.last_name
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        )
    }
    async comparePassword(password) {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    }
}

module.exports = User