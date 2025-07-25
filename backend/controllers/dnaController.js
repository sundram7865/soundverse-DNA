import DNAArtist from '../models/dnaModel.js';

// Get all artists
export const getArtists = async (req, res, next) => {
  try {
    const artists = await DNAArtist.findAll({
      // Use the correct column name based on your model definition
      order: [['id', 'DESC']] // or ['id', 'DESC'] if you don't have timestamps
    });
    res.json({
      success: true,
      data: artists
    });
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch artists',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single artist
export const getArtist = async (req, res, next) => {
  try {
    const artist = await DNAArtist.findByPk(req.params.id);
    
    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }

    res.json({
      success: true,
      data: artist
    });
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch artist',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create traditional artist
export const createArtist = async (req, res, next) => {
  try {
    const artistData = {
      ...req.body,
      // Ensure tags is always an array
      tags: Array.isArray(req.body.tags) ? req.body.tags : []
    };
    
    const artist = await DNAArtist.create(artistData);
    res.status(201).json({
      success: true,
      data: artist
    });
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create artist',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create DNA profile (for Step5Publish)
export const createDNAProfile = async (req, res, next) => {
  try {
    const { creatorName, description, tags, imageUrl, audioUrl } = req.body;
    
    const dnaProfile = await DNAArtist.create({
      name: creatorName,
      description,
      tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
      image_url: imageUrl,
      audio_preview_url: audioUrl,
      genres: Array.isArray(tags) ? tags.join(', ') : tags || ''
    });

    res.status(201).json({
      success: true,
      data: dnaProfile
    });
  } catch (error) {
    console.error('DNA creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create DNA profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};