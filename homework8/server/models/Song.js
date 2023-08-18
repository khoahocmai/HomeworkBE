import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import SQLModel from '../common/SQLModel.js';

const tableName = 'songs'

const Song = sequelize.define(tableName, {
    ...SQLModel,
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    musician: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    pathSong: {
        type: DataTypes.STRING
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
    },
    listenCount: {
        type: DataTypes.INTEGER,
    }
})

sequelize.sync().then(() => {
    console.log(`${tableName} table created successfully`)
})

export default Song


