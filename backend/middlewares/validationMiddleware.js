import { body, validationResult } from 'express-validator';

// Validation for traditional artist creation
export const validateArtistInput = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('image_url').isURL().withMessage('Invalid image URL'),
  body('genres').notEmpty().withMessage('Genres are required'),
  body('description').optional().isString(),
  body('audio_preview_url').optional().isURL(),
  body('tags').optional().isArray(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation for DNA profile creation (Step5Publish)
export const validateDNAProfile = [
  body('creatorName').trim().notEmpty().withMessage('Creator name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('imageUrl').isURL().withMessage('Invalid image URL'),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];