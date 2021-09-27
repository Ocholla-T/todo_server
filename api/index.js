import { addTodo } from '../services/addTodo.js';
import { findAllTodos } from '../services/findTodos.js';
import { deleteAllTodos } from '../services/deleteAllTodos.js';

export default (app) =>
  app.route('/api/todo').get(findAllTodos).post(addTodo).delete(deleteAllTodos);
