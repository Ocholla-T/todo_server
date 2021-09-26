import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './api/todo.js';

dotenv.config({ path: './config/.env' });
const app = express();

// connection to database
mongoose.connect(process.env.DB_CONNECTION_URL, () => console.log('connected to database'));

// global middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// routing for REST functions
routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => `app has started on port ${PORT}`);
