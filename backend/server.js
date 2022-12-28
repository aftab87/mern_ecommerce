import express from 'express';
import dotenv from "dotenv";
const app = express();
import productRouter from './routes/api/products.js';

dotenv.config();

app.use('/api/products', productRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));