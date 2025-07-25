import express from 'express';
import {
  getArtists,
  getArtist,
  createArtist,
  createDNAProfile
} from '../controllers/dnaController.js';
import { validateArtistInput, validateDNAProfile } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// GET all artists
router.get('/', getArtists);

// GET single artist
router.get('/:id', 
  (req, res, next) => {
    if (!Number.isInteger(parseInt(req.params.id))) {
      return res.status(400).json({ error: 'Invalid artist ID' });
    }
    next();
  },
  getArtist
);

// POST create new artist (traditional)
router.post('/', validateArtistInput, createArtist);

// POST create DNA profile (for Step5Publish)
router.post('/dna-profiles', validateDNAProfile, createDNAProfile);

export default router;