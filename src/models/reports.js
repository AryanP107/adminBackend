import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const reportSchema = new Schema({
  reporter: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    }
  },
  reported: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    }
  },
  report_date: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved', 'In Progress'],
    default: 'Pending',
  }
});


const Report = mongoose.model('Report', reportSchema);

export default Report;
