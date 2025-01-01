require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const issueRoutes = require('./routes/issues.routes.js');
const adminRoutes = require('./routes/admin.routes.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

