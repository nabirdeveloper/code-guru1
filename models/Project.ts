import mongoose, { Schema, models, model } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

const Project = models.Project || model('Project', ProjectSchema);
export default Project; 