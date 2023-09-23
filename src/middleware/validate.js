import { body, param } from 'express-validator'

export const validateCreateInsurance = [
  body('firstName')
    .isString()
    .withMessage('First Name must be string')
    .notEmpty()
    .withMessage('firstName must not be empty'),
  body('lastName')
    .isString()
    .withMessage('Last Name must be string')
    .notEmpty()
    .withMessage('Last Name must not be empty'),

  body('dateOfBirth')
    .isDate('mm-dd-yyyy')
    .withMessage('Invalid date of birth, please provide in format "mm/dd/yyyy"')
      ,

  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode')
    .isNumeric()
    .withMessage('Zip code must be numeric')
    .isLength({ min: 6, max: 6 })
    .withMessage('Zip code must be at least 5 digits'),

  body('vehicles')
    .isArray({ min: 1, max: 3 })
    .withMessage('You must provide at least 1 vehicle and at most 3 vehicles'),
]

export const validateUpdateInsurance = [
  param('insuranceId')
    .isMongoId()
    .withMessage('insuranceId must be valid mongodb ObjectId'),
  body('firstName')
    .optional()
    .isString()
    .withMessage('First Name must be string')
    .notEmpty()
    .withMessage('firstName must not be empty'),
  body('lastName')
    .optional()
    .isString()
    .withMessage('Last Name must be string')
    .notEmpty()
    .withMessage('Last Name must not be empty'),

  body('dateOfBirth')
    .optional()
    .isDate('mm-dd-yyyy')
    .withMessage('Invalid date of birth, please provide in format "mm/dd/yyyy"')
    ,

  body('address.street')
    .optional()
    .notEmpty()
    .withMessage('Street is required'),
  body('address.city').optional().notEmpty().withMessage('City is required'),
  body('address.state').optional().notEmpty().withMessage('State is required'),
  body('address.zipCode')
    .optional()
    .isNumeric()
    .withMessage('Zip code must be numeric')
    .isLength({ min: 6, max: 6 })
    .withMessage('Zip code must be at least 5 digits'),

  body('vehicles')
    .optional()
    .isArray({ min: 1, max: 3 })
    .withMessage('You must provide at least 1 vehicle and at most 3 vehicles'),
]
