export const fetchNewTodo = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PORT}/todos`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const postNewTodo = async (newTodo) => {
  try {
    await fetch(`${process.env.REACT_APP_PORT}/todos`, {
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
    await fetch(`${process.env.REACT_APP_PORT}/todos/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async ({ id, todo }) => {
  try {
    console.log(todo, "edi");
    await fetch(`${process.env.REACT_APP_PORT}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};
