import mongoose from "mongoose";
import type { Connection } from "mongoose";

let primaryConnection: Connection | null = null;
let isConnecting = false;

export const connectPrimary = async (): Promise<void> => {
  if (primaryConnection || isConnecting) return;

  isConnecting = true;
  const mongoURI = process.env.MONGOURL!;

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // ⬅ prevents hangs
      connectTimeoutMS: 5000,
    });

    primaryConnection = mongoose.connection;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    // ❌ DO NOT EXIT
  } finally {
    isConnecting = false;
  }
};

export const getDb = async (dbName: string): Promise<Connection> => {
  if (!primaryConnection) {
    await connectPrimary();
  }

  if (!primaryConnection || primaryConnection.readyState !== 1) {
    throw new Error("Database not connected");
  }

  return primaryConnection.useDb(dbName, { useCache: true });
};
