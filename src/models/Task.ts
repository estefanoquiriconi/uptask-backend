import mongoose, { Document, Schema } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  ON_HOLD = 'onHold',
  IN_PROGRESS = 'inProgress',
  UNDER_REVIEW = 'underReview',
  COMPLETED = 'completed',
}

export interface ITask extends Document {
  name: string;
  description: string;
  project: Schema.Types.ObjectId;
  status: TaskStatus;
}

const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    status: {
      type: String,
      enum: TaskStatus,
      default: TaskStatus.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
