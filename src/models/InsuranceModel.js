import mongoose from 'mongoose'

const insuranceSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: Number },
    },
    vehicles: [
      {
        vin: { type: String },
        year: { type: Number },
        makeModel: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Insurance = new mongoose.model('Insurance', insuranceSchema)

export default Insurance
