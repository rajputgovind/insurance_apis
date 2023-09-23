import { StatusCodes } from 'http-status-codes'
import Insurance from '../models/InsuranceModel.js'
import { validationResult } from 'express-validator'
import validationErrorHandler from '../middleware/validationErrorHandler.js'
import 'dotenv/config'

export async function createInsurance(req, res) {
  const errors = validationResult(req)
  const errMessages = validationErrorHandler(errors)
  if (errMessages && errMessages.length) {
    return res.status(400).json({
      success: false,
      errMessages,
    })
  }
  try {
    const insurance = await Insurance.create(req.body)

    return res.status(StatusCodes.CREATED).json({
      success: true,
      insurance,
      resume: `/resume-insurance/${insurance._id}`,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error, message: 'error in post ', success: false })
  }
}

export async function resumeInsurance(req, res) {
  try {
    const insuranceId = req.params.insuranceId
    const insurance = await Insurance.findById(insuranceId)
    if (!insurance) {
      return res.status(404).json({
        success: false,
        message: `Insurance with insuranceId ${insuranceId} not found`,
      })
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      insurance,
    })
  } catch (error) {
    console.log('error in find data', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error, message: 'error in find user', success: true })
  }
}

export const updateInsuranceData = async (req, res) => {
  const errors = validationResult(req)
  const errMessages = validationErrorHandler(errors)
  if (errMessages && errMessages.length) {
    return res.status(400).json({
      success: false,
      errMessages,
    })
  }
  try {
    const insuranceId = req.params.insuranceId
    const updates = Object.keys(req.body)
    const insurance = await Insurance.findById(insuranceId)

    if (!insurance) {
      return res.status(404).json({
        success: false,
        message: `Insurance with insuranceId ${insuranceId} not found`,
      })
    }

    updates.forEach(update => {
      insurance[update] = req.body[update]
    })

    await insurance.save()

    return res.status(200).json({
      success: true,
      message: 'Insurance updated successfully',
      insurance,
    })
  } catch (error) {
    console.log('Error while updating insurance : ', error)
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getInsurancePrice = async (req, res) => {
  try {
    const insuranceId = req.body.insuranceId
    const insurance = await Insurance.findById(insuranceId)

    if (!insurance) {
      return res.status(404).json({
        success: false,
        message: `Insurance data with insuranceId ${insuranceId} not found`,
      })
    }

    const price = 1000
    return res.status(200).json({
      success: true,
      message: 'Price fetched successfully',
      price,
    })
  } catch (error) {
    console.log('Error while validating insurance application : ', error)
    return res.status(200).json({
      success: false,
      message: error.message,
    })
  }
}
