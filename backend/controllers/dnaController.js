import DNAArtist from '../models/dnaModel.js';

export const getArtists = async (req, res) => {
  try {
    const artists = await DNAArtist.findAll({
      order: [['id', 'DESC']],
    });
    res.json({ success: true, data: artists });
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch artists',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await DNAArtist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }
    res.json({ success: true, data: artist });
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch artist',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const createArtist = async (req, res) => {
  try {
    const artist = await DNAArtist.create(req.body);
    res.status(201).json({ success: true, data: artist });
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create artist',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const createDNAProfile = async (req, res) => {
  try {
    const { creatorName, description, tags, imageUrl, audioUrl } = req.body;
    
    const dnaProfile = await DNAArtist.create({
      name: creatorName,
      description,
      tags: Array.isArray(tags) ? tags : [],
      image_url: imageUrl,
      audio_preview_url: audioUrl,
      genres: Array.isArray(tags) ? tags.join(', ') : ''
    });

    res.status(201).json({ 
      success: true, 
      data: dnaProfile,
      message: 'DNA profile created successfully'
    });
  } catch (error) {
    console.error('DNA creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create DNA profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};