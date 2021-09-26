import { addTodo } from '../services/addTodo';

export default (app) => app.route('/api/todo').post(addTodo);
