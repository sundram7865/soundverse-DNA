import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const DNAArtist = sequelize.define('DNAArtist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  genres: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  audio_preview_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  }
}, {
  tableName: 'dna_artists',
  timestamps: false
});

export default DNAArtist;