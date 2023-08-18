import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import SQLModel from '../common/SQLModel.js';

const tableName = 'users'

const User = sequelize.define(tableName, {
    ...SQLModel,
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
})

sequelize.sync().then(() => {
    console.log(`${tableName} table created successfully`)
})

export default User