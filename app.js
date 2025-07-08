import express from "express";
import { dbConnection } from "./Database/dbConnection.js";
import facebookAuthRoute from "./routes/facebookAuth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

// Facebook OAuth route

app.use('/auth/facebook', facebookAuthRoute);
export default app;
