import mongoose from "mongoose";
import type { Connection } from "mongoose";

let primaryConnection: Connection | null = null;
let isConnecting = false;

export const connectPrimary = async (): Promise<void> => {
  if (primaryConnection || isConnecting) return;

  isConnecting = true;

  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("❌ Missing required env: MONGO_URI");
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    primaryConnection = mongoose.connection;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    throw error; // ⬅ IMPORTANT
  } finally {
    isConnecting = false;
  }
};

export const getDb = async (dbName: string): Promise<Connection> => {
  if (!primaryConnection) {
    await connectPrimary();
  }

  if (!primaryConnection || primaryConnection.readyState !== 1) {
    throw new Error("❌ Database not connected");
  }

  return primaryConnection.useDb(dbName, { useCache: true });
};
