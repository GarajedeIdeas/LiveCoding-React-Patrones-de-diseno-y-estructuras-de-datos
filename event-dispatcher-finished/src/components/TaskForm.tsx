import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postTask } from "../api/tasks";
import { useEventDispatcher } from "../eventDispatcher";
import { TaskCreatedName } from "../eventDispatcher/types";
import Task from "../interfaces/Task";

export default function TaskForm() {
  const eventDispatcher = useEventDispatcher();
  const [form, setForm] = useState({
    title: "",
    description: "",
    labels: ["1"],
    id: `Random-${Math.random()}`
  });
  const mutation = useMutation({
    mutationFn: (task: Task) => postTask(task),
    onSuccess: function () {
      eventDispatcher.dispatch(TaskCreatedName, {
        type: TaskCreatedName,
        task: form,
        timestamp: new Date()
      });
    }
  });

  function handleChange(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(form);
  }

  return (
    <div className="box">
      <h3>Formulario</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Título</label>
          <input value={form.title} name="title" onChange={handleChange} />
        </p>
        <p>
          <label>Descripción</label>
          <input
            value={form.description}
            name="description"
            onChange={handleChange}
          />
        </p>
        <button type="submit">Enviar</button>
        {mutation.isLoading && <div>Enviando...</div>}
      </form>
    </div>
  );
}
