import Todo from '../models/Todo.js';

export const deleteAllTodos = async (req, res) => {
  await Todo.deleteMany().catch((err) => console.error(err));

  res.end();
};
