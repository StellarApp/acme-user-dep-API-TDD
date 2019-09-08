const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');
const {UUID, UUIDV4, STRING} = Sequelize;
const idDef = {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
}

const nameDef ={
    type: STRING,
    notEmpty: true,
    unique: true,
    allowNull: false
}

const User = conn.define('user', () => {
    id: idDef,
    name:  nameDef

})

const Department = conn.define('department', () => {

})