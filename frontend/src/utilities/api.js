export const fetchNewTodo = async () => {
  try {
    const res = await fetch("http://localhost:3001/todos");
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const postNewTodo = async (newTodo) => {
  try {
    await fetch("http://localhost:3001/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeNewTodo = async (id) => {
  try {
    await fetch(`http://localhost:3001/todos/${id}`, { method: "DELETE" });
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (id, editedTodo) => {
  try {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(editedTodo),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};
