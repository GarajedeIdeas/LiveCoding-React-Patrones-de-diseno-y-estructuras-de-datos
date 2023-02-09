import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import User from "./components/User";
import Tasks from "./components/Tasks";
import Labels from "./components/Labels";
import TaskForm from "./components/TaskForm";
import FilteredTasks from "./components/FilteredTasks";
import { EventDispatcherContextProvider } from "./eventDispatcher";
import "./styles.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventDispatcherContextProvider>
        <h1>Event dispatcher</h1>
        <h2>Live Session - Garaje de ideas</h2>
        <div className="flex">
          <div>
            <User />
            <Tasks />
            <FilteredTasks labelId="1" />
            <Labels />
          </div>
          <div>
            <TaskForm />
          </div>
        </div>
      </EventDispatcherContextProvider>
    </QueryClientProvider>
  );
}
