import mongoose from 'mongoose'

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log(`Connected to DB successfully`)
  } catch (error) {
    console.log('error in database connection : ', error)
    console.log(error)
  }
}
