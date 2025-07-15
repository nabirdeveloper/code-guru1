import mongoose, { Schema, models, model } from 'mongoose';

const ActivityLogSchema = new Schema({
  action: { type: String, required: true },
  user: {
    name: String,
    email: String,
    role: String,
  },
  target: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const ActivityLog = models.ActivityLog || model('ActivityLog', ActivityLogSchema);
export default ActivityLog; 