import Todo from "./TodoSchema.js";

export const getTodos = (req, res) => {
  const filter = req.query.completed
    ? { completed: req.query.completed === "true" }
    : {};

  Todo.find(filter)
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
};
export const addTodo = (req, res) => {
  if (!req.body.title) return res.status(404).json("Title is required.");
  const newTodo = new Todo({
    title: req.body.title,
  });

  newTodo
    .save()
    .then(() => res.json(newTodo))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getTodo = (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteTodo = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateTodo = async (req, res) => {
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);
    if (title !== undefined) {
      todo.title = title;
    }
    // Atualize sempre o campo `completed`, mesmo que não esteja presente em `req.body`
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todo.save();
    return res.status(200).json("Todo updated.");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteCompleted = async (req, res) => {
  try {
    await Todo.deleteMany({ completed: true });
    return res.status(200).json("Completed todos deleted.");
  } catch (error) {
    return res.status(500).json(error);
  }
};
