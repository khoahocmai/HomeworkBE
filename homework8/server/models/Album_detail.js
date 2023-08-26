import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import SQLModel from '../common/SQLModel.js';

import Album from './Album.js';
import Song from './Song.js';

const tableName = 'album_details'

const Album_detail = sequelize.define(tableName, {
    ...SQLModel,
    albumID: {
        type: DataTypes.INTEGER,
        references: {
            model: Album,
            id: 'id',
        }
    },
    songID: {
        type: DataTypes.INTEGER,
        references: {
            model: Song,
            id: 'id',
        }
    },
})

Album.hasMany(Album_detail)
Album_detail.belongsTo(Album)

sequelize.sync().then(() => {
    console.log(`${tableName} table created successfully`)
})

export default Album_detail