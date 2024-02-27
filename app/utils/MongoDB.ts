import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import express from 'express';

// Define global variables for express
(global as any).app = express();
(global as any).app.use(cors());

// Define global variables for mongoose connection
(global as any).mongoose = {
   conn: null,
   promise: null,
};

export async function dbConnect() {
   if ((global as any).mongoose.conn) {
      console.log("Already connected");
      return (global as any).mongoose.conn;
   }

   const conString = process.env.MONGODB_URI;

   if (!conString) {
      throw new Error("MONGO_URI environment variable is not defined");
   }

   const options: ConnectOptions = {
      autoIndex: true,
   };

   try {
      const promise = mongoose.connect(conString, options);
      (global as any).mongoose = {
         conn: await promise,
         promise,
      };
      console.log("Newly connected");
      return promise;
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
   }
}