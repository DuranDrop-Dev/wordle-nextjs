import mongoose, { ConnectOptions } from 'mongoose';

type MongooseCache = {
   conn: typeof mongoose | null;
   promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
   mongooseCache?: MongooseCache;
};

const cached = globalWithMongoose.mongooseCache ?? {
   conn: null,
   promise: null,
};

globalWithMongoose.mongooseCache = cached;

export async function dbConnect() {
   if (cached.conn) {
      return cached.conn;
   }

   const conString = process.env.MONGODB_URI;

   if (!conString) {
      throw new Error("MONGODB_URI environment variable is not defined");
   }

   const options: ConnectOptions = {
      autoIndex: true,
      serverSelectionTimeoutMS: 10000,
   };

   try {
      cached.promise ??= mongoose.connect(conString, options);
      cached.conn = await cached.promise;
      return cached.conn;
   } catch (error) {
      cached.promise = null;
      console.error("Error connecting to MongoDB:", error);
      throw error;
   }
}
