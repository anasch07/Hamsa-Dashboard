  // const express = require('express');
import express from 'express';
import dotenv from "dotenv";
import connectDatabase from './config/mongoDB.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import userRouter from './Routes/UserRoutes.js';
import clientRouter from './Routes/clientRoutes.js';
import orderRouter from './Routes/orderRoutes.js';
import categoryRouter from './Routes/categoryRoutes.js';
import { errorHandler, notFound } from './Middleware/Errors.js';
import cors from 'cors';
import path from 'path';


dotenv.config();
connectDatabase();
const app = express()
app.use(express.json());
app.use(cors());



app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/clients", clientRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);



  if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  }

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Running Server at http://localhost:${PORT}`)
})

