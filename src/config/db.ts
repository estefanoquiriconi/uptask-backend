import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

/**
 * Connects to the MongoDB database using the connection string provided in the environment variables.
 *
 * This function attempts to establish a connection to the MongoDB database.
 * If the connection is successful, it logs a success message with the host and port of the database.
 * If the connection fails, it logs an error message and exits the process with a status code of 1.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the connection is established or rejects on failure.
 */
export const connectDB = async (): Promise<void> => {
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
