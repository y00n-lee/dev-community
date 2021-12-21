import mongoose from "mongoose";
import { configs } from "./constants";

export const connectDB = () => {
  const mongoUrl = `mongodb+srv://${configs.DB_ID}:${configs.DB_PASSWORD}@simple-board-cluster.aat6r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  mongoose.connect(mongoUrl, () => {
    console.log("MongoDB Connected");
  });
};
