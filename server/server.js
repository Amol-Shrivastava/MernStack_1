import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionRouter from "./routes/transactions.js";
import AuthApi from "./routes/AuthApi.js";
import connect from "./database/mongodb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/transaction", TransactionRouter);
app.use("/auth", AuthApi);
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

connect();

app.listen(PORT, () => {
  console.log("Connected Successfully to Server");
});
