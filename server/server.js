import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionRouter from "./routes/transactions.js";
import AuthApi from "./routes/AuthApi.js";
import connect from "./database/mongodb.js";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/transaction", TransactionRouter);
app.use("/auth", AuthApi);

connect();

app.listen(PORT, () => {
  console.log("Connected Successfully to Server");
});
