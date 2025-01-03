import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin.routes.js';
import issueRoutes from './routes/issues.routes.js';
import reportRoutes from './routes/report.routes.js';
import { auth } from './middleware/auth.middleware.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({ origin: 'http://localhost:8080' }));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/admin', adminRoutes);
app.use('/issues', issueRoutes);
app.use('/report', reportRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

