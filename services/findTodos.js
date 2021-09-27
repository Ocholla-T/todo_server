import Todo from '../models/Todo.js';

export const findAllTodos = async (req, res) => {
  await Todo.find({}).then((todos) => res.json(todos));
};
