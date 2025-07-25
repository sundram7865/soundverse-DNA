import DNAArtist from '../models/dnaModel.js';

export const getArtists = async (req, res, next) => {
  try {
    const artists = await DNAArtist.findAll();
    res.json(artists);
  } catch (error) {
    next(error);
  }
};

export const getArtist = async (req, res, next) => {
  try {
    const artist = await DNAArtist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    next(error);
  }
};

export const createArtist = async (req, res, next) => {
  try {
    const artist = await DNAArtist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    next(error);
  }
};