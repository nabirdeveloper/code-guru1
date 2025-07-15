import mongoose, { Schema, models, model } from 'mongoose';

const AdminLoginLogSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String },
});

const AdminLoginLog = models.AdminLoginLog || model('AdminLoginLog', AdminLoginLogSchema);
export default AdminLoginLog; 