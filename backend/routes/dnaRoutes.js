import express from 'express';
import { 
  getArtists, 
  getArtist, 
  createArtist 
} from '../controllers/dnaController.js';

const router = express.Router();

router.get('/', getArtists);
router.get('/:id', getArtist);
router.post('/', createArtist);

export default router;