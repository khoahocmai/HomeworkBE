import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import SQLModel from '../common/SQLModel.js';

import User from './User.js';

const tableName = 'albums';

const Album = sequelize.define(tableName, {
  ...SQLModel,
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      id: 'id',
    },
  },
  name: {
    type: DataTypes.STRING(100),
  },
  isPrivate: {
    type: DataTypes.BOOLEAN,
  },
});

User.hasMany(Album)
Album.belongsTo(User)

sequelize.sync().then(() => {
  console.log(`${tableName} table created successfully`);
});

export default Album;
