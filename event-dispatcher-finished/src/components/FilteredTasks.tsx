import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";

type Props = {
  labelId: string;
};

export default function FilteredTasks({ labelId }: Props) {
  const query = useQuery({
    queryKey: ["tasks", { labelId }],
    queryFn: () => fetchTasks(labelId)
  });

  if (query.isLoading) {
    return <div>Cargando...</div>;
  }

  if (query.isError) {
    return <div>Error :(</div>;
  }

  return (
    <div className="box">
      <h3>Tareas de la etiqueta ({labelId})</h3>
      <ul>
        {query.data.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
