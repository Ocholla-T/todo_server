import mongoose from 'mongoose';
const { Schema } = mongoose;

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

export default mongoose.model('Todo', todoSchema);
