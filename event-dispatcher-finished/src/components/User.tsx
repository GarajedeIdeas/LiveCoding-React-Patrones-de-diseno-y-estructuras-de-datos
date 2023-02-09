import { useQuery } from "@tanstack/react-query";
import fetchUser from "../api/fetchUser";
import { useEventDispatcher } from "../eventDispatcher";
import { UserClickedName } from "../eventDispatcher/types";

export default function User() {
  const eventDispatcher = useEventDispatcher();
  const query = useQuery({
    queryKey: ["user", "1"],
    queryFn: fetchUser
  });

  if (query.isLoading) {
    return <div>Cargando...</div>;
  }

  if (query.isError) {
    return <div>Error :(</div>;
  }

  function handleClick() {
    eventDispatcher.dispatch(UserClickedName, {
      type: UserClickedName,
      timestamp: new Date(),
      user: query.data!
    });
  }

  return (
    <div className="box" onClick={handleClick}>
      <h3>Usuario</h3>
      {query.data?.name} ({query.data?.tasksCount})
    </div>
  );
}
