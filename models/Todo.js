import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  meta: {
    active: Boolean,
    completed: Boolean,
  },
});

export default mongoose.Model('Todo', todoSchema);
