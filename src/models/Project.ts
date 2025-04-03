import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
  readonly projectName: string;
  readonly clientName: string;
  readonly description: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

const projectSchema: Schema<IProject> = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project: Model<IProject> = mongoose.model('Project', projectSchema);

export default Project;
