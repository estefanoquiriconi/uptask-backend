import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(
      colors.green.bold(`✅ MongoDB successfully connected at: ${url}`)
    );
  } catch (error) {
    console.log(
      colors.red.bold(`❌ Error connecting to MongoDB: ${error.message}`)
    );
    exit(1);
  }
};
