import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";

export default function Tasks() {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks()
  });

  if (query.isLoading) {
    return <div>Cargando...</div>;
  }

  if (query.isError) {
    return <div>Error :(</div>;
  }

  return (
    <div className="box">
      <h3>Tareas</h3>
      <ul>
        {query.data.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
