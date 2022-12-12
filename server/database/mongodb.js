import mongoose from "mongoose";

const connect = () => {
  const username = process.env.MONGO_DB_USERNAME;
  const password = process.env.MONGO_DB_PASSWORD;
  const url = process.env.MONGO_DB_URL;

  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Succesfully Connected to MongoDB");
    })
    .catch((err) => {
      console.error(err);
    });
};

export default connect;
