const mongoose = require('mongoose');

// Define the schema for the Issue
const issueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // name is required
      trim: true,     // remove leading/trailing spaces
    },
    email: {
      type: String,
      required: true,  // email is required
      match: [/.+\@.+\..+/, 'Please enter a valid email address'], // email validation regex
    },
    message: {
      type: String,
      required: true, // message is required
      trim: true,     // remove leading/trailing spaces
    },
    status: {
      type: String,
      enum: ['pending', 'resolved', 'in-progress'], // Valid values for status
      default: 'pending', // Default to 'pending' when a new issue is created
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
