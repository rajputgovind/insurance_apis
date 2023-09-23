import express, { Router } from 'express'
import {
  createInsurance,
  getInsurancePrice,
  resumeInsurance,
  updateInsuranceData,
} from '../controllers/InsuranceController.js'
import {
  validateCreateInsurance,
  validateUpdateInsurance,
} from '../middleware/validate.js'
import { body } from 'express-validator'

const router = express.Router()

router.post('/create-insurance', validateCreateInsurance, createInsurance)
router.get('/resume-insurance/:insuranceId', resumeInsurance)
router.put(
  '/update-insurance/:insuranceId',
  validateUpdateInsurance,
  updateInsuranceData
)

router.post(
  '/get-price',
  [
    body('insuranceId')
      .isMongoId()
      .withMessage('insuranceId must be valid mongodb ObjectId'),
  ],
  getInsurancePrice
)

export default router
