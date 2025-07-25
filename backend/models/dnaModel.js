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
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Artist name cannot be empty'
      },
      len: {
        args: [1, 100],
        msg: 'Artist name must be between 1 and 100 characters'
      }
    }
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'Image URL must be a valid URL'
      },
      notEmpty: {
        msg: 'Image URL cannot be empty'
      }
    }
  },
  genres: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Genres cannot be empty'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 2000],
        msg: 'Description cannot exceed 2000 characters'
      }
    }
  },
  audio_preview_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Audio preview URL must be a valid URL'
      }
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Tags must be an array');
        }
      }
    }
  }
}, {
  tableName: 'dna_artists',
  timestamps: false, // Explicitly disable timestamps
  underscored: true,
  hooks: {
    beforeValidate: (artist) => {
      if (artist.tags && !Array.isArray(artist.tags)) {
        artist.tags = [];
      }
    }
  },
  indexes: [
    {
      fields: ['name'],
      unique: true
    },
    {
      fields: ['genres']
    }
  ]
});

// Class method to find artists by genre
DNAArtist.findByGenre = async function(genre) {
  return this.findAll({
    where: {
      genres: {
        [sequelize.Op.iLike]: `%${genre}%`
      }
    }
  });
};

// Instance method to add tags
DNAArtist.prototype.addTags = function(newTags) {
  if (!Array.isArray(newTags)) newTags = [newTags];
  this.tags = [...new Set([...this.tags, ...newTags])];
  return this.save();
};

export default DNAArtist;