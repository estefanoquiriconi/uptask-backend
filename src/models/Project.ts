import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: Schema.Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
