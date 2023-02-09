import { useQuery } from "@tanstack/react-query";
import fetchLabels from "../api/fetchLabels";

export default function Labels() {
  const query = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels
  });

  if (query.isLoading) {
    return <div>Cargando...</div>;
  }

  if (query.isError) {
    return <div>Error :(</div>;
  }

  return (
    <div className="box">
      <h3>Etiquetas</h3>
      <ul>
        {query.data.map((label) => (
          <li key={label.id}>
            {label.title} ({label.tasksCount})
          </li>
        ))}
      </ul>
    </div>
  );
}
