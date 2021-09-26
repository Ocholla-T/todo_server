import Todo from '../models/Todo';

export const addTodo = async (req, res) => {
  const todo = new Todo({
    content: req.body.content,
    meta: {
      active: req.body.isActive,
      completed: req.body.isCompleted,
    },
  });

  await todo
    .save()
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};
